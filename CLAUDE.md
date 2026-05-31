# Claude Agent Rules - CarDekho AI Advisor

### 💻 Coding Standards
- **Framework:** Next.js 16 (App Router) with React 19.
- **Styling:** Tailwind CSS v4 using OKLCH colors.
- **Components:** Functional components with TypeScript interfaces. Use modular components (e.g., `CarCard`, `CompareButton`).
- **Icons:** Lucide React exclusively.

### 🎭 Animations & UX
- **Framer Motion:** Use for all transitions. Stagger animations for grids.
- **Feedback:** Use `sonner` for all toast notifications.
- **Precision:** AI recommendations must be strictly filtered by price and body type.

### 📁 File Structure
- `app/api/`: API routes (recommendations, car data).
- `components/`: UI components and shared elements.
- `store/`: Zustand state management.
- `data/`: Static JSON datasets.

@AGENTS.md
