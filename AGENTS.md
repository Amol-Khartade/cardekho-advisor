<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CarDekho AI Advisor - Project Context

### 🏗️ Architecture & State
- **Data:** Primary car data is stored in `data/cars.json`.
- **State Management:** Use Zustand in `store/useCarStore.ts`. 
- **AI Integration:** Uses `@ai-sdk/google` with `gemini-2.0-flash`.

### 🛡️ Critical Logic
- **Zero-500 Policy:** The API route at `app/api/recommend/route.ts` MUST implement `getLocalFallback`. 
- **Comparison Limit:** Comparison is strictly limited to 3 cars. UI must reflect this (buttons disabled/feedback shown).

### 🎨 Design Language
- **Colors:** Use OKLCH color space in Tailwind. Primary is CarDekho Orange.
- **Visuals:** High-contrast text, glassmorphism (`backdrop-blur-xl`), and smooth Framer Motion transitions.
