import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { getCars } from '@/lib/data';

// Schema for a car with AI reason
const CarSchema = z.object({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  price_lakhs: z.number(),
  mileage_kmpl: z.number(),
  safety_rating: z.number(),
  body_type: z.string(),
  features: z.array(z.string()),
  ai_reason: z.string(),
});

const RecommendationSchema = z.object({
  recommendations: z.array(CarSchema).max(6),
});

type Car = z.infer<typeof CarSchema>;

// Initialize Google AI
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

async function getLocalFallback(query: string): Promise<Car[]> {
  try {
    const allCars = await getCars();
    const queryLower = query.toLowerCase();
    
    // Extract price limit if exists (e.g., "under 15", "below 20", "max 15")
    const priceMatch = queryLower.match(/(?:under|below|less than|within|max|budget of)\s*(\d+)/);
    const priceLimit = priceMatch ? parseInt(priceMatch[1]) : null;

    // Detect body type requirement
    const bodyTypes = ['suv', 'sedan', 'hatchback', 'mpv', 'pickup'];
    const requiredBodyType = bodyTypes.find(type => queryLower.includes(type));

    // Scoring and Filtering
    const scoredCars = allCars.map(car => {
      let score = 0;
      let isEliminated = false;

      // Strict Filter: Price
      if (priceLimit && car.price_lakhs > priceLimit) {
        isEliminated = true;
      }

      // Strict Filter: Body Type
      if (requiredBodyType && car.body_type.toLowerCase() !== requiredBodyType) {
        isEliminated = true;
      }

      if (isEliminated) return { ...car, score: -1, isEliminated: true };

      // Scoring for valid cars
      if (queryLower.includes(car.body_type.toLowerCase())) score += 10;
      if (priceLimit && car.price_lakhs <= priceLimit) score += 5;
      
      if (queryLower.includes('safe') || queryLower.includes('safety')) {
        if (car.safety_rating >= 4) score += 8;
      }

      if (queryLower.includes('mileage') || queryLower.includes('fuel efficient')) {
        if (car.mileage_kmpl > 20) score += 5;
      }

      if (queryLower.includes('ev') || queryLower.includes('electric')) {
        if (car.model.toLowerCase().includes('ev') || car.make.toLowerCase().includes('byd')) score += 15;
      }

      if (queryLower.includes(car.make.toLowerCase())) score += 5;
      if (queryLower.includes(car.model.toLowerCase())) score += 10;

      return { ...car, score, isEliminated: false };
    });

    // Filter out eliminated cars if there are any non-eliminated ones
    let filteredCars = scoredCars.filter(car => !car.isEliminated);
    
    // If everything was eliminated (too strict), fallback to all but with low scores
    if (filteredCars.length === 0) {
      filteredCars = scoredCars;
    }

    return filteredCars
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(car => ({
        ...car,
        ai_reason: car.score > 0 
          ? `Selected as a precise match for your criteria: ${car.body_type} ${priceLimit ? 'under ₹' + priceLimit + 'L' : ''} (Local Fallback)`
          : "Recommended as the closest available option to your request (Local Fallback)"
      }));
  } catch (error) {
    console.error("Fallback failed:", error);
    return [];
  }
}

export async function POST(req: Request) {
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const allCars = await getCars();
    
    // Token Optimization: Pre-filter cars if a specific price is mentioned 
    // to reduce context window size and costs.
    const priceMatch = query.toLowerCase().match(/(?:under|below|less than|within|max|budget of)\s*(\d+)/);
    const priceLimit = priceMatch ? parseInt(priceMatch[1]) : null;
    
    const candidates = priceLimit 
      ? allCars.filter(c => c.price_lakhs <= priceLimit + 5) // 5L headroom for alternatives
      : allCars;

    // Attempt Gemini Recommendation
    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
      schema: RecommendationSchema,
      prompt: `
        You are an expert Indian car consultant. 
        User Query: "${query}"
        
        Available Cars (Pre-filtered for relevance):
        ${JSON.stringify(candidates)}
        
        CRITICAL INSTRUCTIONS:
        1. STRICT FILTERING: If the user mentions a price limit (e.g., "under 15 lakhs", "below 10L"), you MUST NOT recommend any car that exceeds that price.
        2. BODY TYPE: If the user specifies a body type (e.g., "SUV", "Sedan"), prioritize those strictly. Only suggest others if you explicitly explain they are the closest alternatives.
        3. QUANTITY: Recommend up to 6 cars. If fewer than 6 cars meet the strict criteria, only return those that do.
        4. REASONING: In "ai_reason", explain EXACTLY how the car fits the price, body type, and other needs mentioned.
        
        Be precise. The user values accuracy over generic recommendations.
      `,
    });

    return NextResponse.json(object);

  } catch (error: any) {
    console.warn("Gemini API error, falling back to local search:", error.message);
    
    // Fallback logic
    const recommendations = await getLocalFallback(query);
    
    return NextResponse.json({ recommendations, fallback: true });
  }
}
