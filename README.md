# CarDekho AI Advisor: Zero-Click Car Discovery MVP

### 🚀 Executive Summary
This project is a high-performance, natural language MVP designed to instantly solve buyer confusion in the Indian car market. It transforms vague user intent ("safe SUV for my family under 15L") into precise, data-backed recommendations within seconds.

---

### 1. What did you build and why?
I built a **zero-click natural language car advisor MVP**. Traditional car search is broken—users are forced through endless filters, dropdowns, and comparison checkboxes that lead to decision paralysis. This app solves buyer confusion by allowing users to speak naturally to a domain-expert AI that understands budget, safety ratings, and body types natively.

### 2. What did you deliberately cut?
I deliberately cut **heavy databases (PostgreSQL/MongoDB)** and **complex state management (Redux/Turborepo)**. 
*   **Why?** In an early-stage MVP, the core value is the AI's reasoning, not data persistence overhead. 
*   **Decision:** I opted for a local **JSON dataset** and **Zustand**. This prioritized shipping speed and allowed me to focus 100% of my energy on the recommendation engine and the high-end UX.

### 3. What’s your tech stack and why?
*   **Next.js (App Router):** For server-side rendering of SEO-critical car data and fast API routes.
*   **Vercel AI SDK:** To leverage `generateObject` for structured, type-safe AI responses.
*   **Zod:** To enforce a strict schema between the AI's output and our UI, preventing "hallucinated" data fields.
*   **Tailwind CSS (OKLCH):** High-contrast, perceptual color space for a premium, accessible UI that works perfectly in light and dark modes.
*   **Zustand:** For a lightweight, reactive store to manage the comparison hub without the boilerplate of Redux.

### 4. What did you delegate to AI tools vs. do manually?
*   **Delegated to AI:**
    *   **Data Generation:** Synthesizing the 50-car realistic Indian market dataset.
    *   **Creative UI Styling:** Generating complex OKLCH color palettes and glassmorphism CSS.
    *   **Content Logic:** Writing the specific "AI Reasoning" for each car match.
*   **Manual Oversight (Surgical Implementation):**
    *   **Architectural Fallback:** I manually designed the `getLocalFallback` scoring algorithm to ensure the app never returns a 500 error if the Gemini quota is exceeded.
    *   **State Sync:** Coordinating the comparison hub's auto-expansion and 3-car limit logic.
    *   **Error Handling:** Debugging React hydration issues and Tailwind build errors to ensure production-ready code.

### 5. If you had another 4 hours, what would you add?
*   **pgvector DB:** I would implement a vector database to perform **semantic search** over a dataset of thousands of cars, rather than just 50.
*   **Real-world Validation:** Integrating **real user reviews** and YouTube expert verdict summaries for every car to provide unbiased social proof.
*   **Dynamic Finance API:** Real-time EMI calculators based on current bank interest rates to turn "Recommendations" into "Buying Decisions."

---
**Senior/Lead AI Software Engineer Submission**
*Focused on shipping value, architecting for resilience, and obsessing over UX.*
