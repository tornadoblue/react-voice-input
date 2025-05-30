# AI Development Guidelines for Brynjolfson Notes Journal

This document outlines the core technologies used in this project and provides rules for when to use specific libraries and approaches. Adhering to these guidelines will help maintain code consistency, quality, and ease of development.

## Tech Stack Overview

The application is built using the following technologies:

*   **Framework/Library:** React (bootstrapped with Vite)
*   **Language:** TypeScript
*   **UI Components:** shadcn/ui (built on Radix UI primitives)
*   **Styling:** Tailwind CSS
*   **Routing:** React Router DOM
*   **Asynchronous State Management & Caching:** TanStack Query (React Query)
*   **Forms & Validation:** React Hook Form with Zod
*   **Icons:** Lucide React
*   **Notifications/Toasts:** Sonner
*   **Audio Processing:** Native Web APIs (Web Audio API, Speech Recognition API) via custom wrappers (`EnhancedSpeechRecorder.ts`, `audioUtils.ts`).

## Library Usage Guidelines

### 1. UI Components & Layout

*   **Primary UI Library:** Always prefer components from **shadcn/ui** (`@/components/ui/`) for building the user interface. These components are pre-styled with Tailwind CSS and follow accessibility best practices.
*   **Custom Components:** If a required component is not available in shadcn/ui:
    *   First, consider if it can be composed from existing shadcn/ui primitives.
    *   If not, create a new component in `src/components/`. Ensure it is styled with Tailwind CSS and is responsive.
*   **Layout:** Use Tailwind CSS utility classes for all layout and spacing. Leverage Flexbox and Grid utilities.
*   **Responsiveness:** All components and layouts MUST be responsive and tested on various screen sizes. Use Tailwind's responsive prefixes (e.g., `sm:`, `md:`, `lg:`).

### 2. Styling

*   **Exclusive Styling Solution:** **Tailwind CSS** is the sole library for styling.
*   **Utility Classes:** Prioritize using utility classes directly in your JSX.
*   **Custom CSS:** Avoid writing custom CSS files (`.css`) as much as possible. If absolutely necessary for complex scenarios not covered by Tailwind, ensure it's well-justified and scoped.
*   **Class Merging:** Use the `cn` utility function (from `src/lib/utils.ts`, which uses `clsx` and `tailwind-merge`) for conditionally applying or merging Tailwind classes.

### 3. State Management

*   **Local Component State:** Use React's built-in hooks (`useState`, `useReducer`) for state confined to a single component or a small, closely-related group of components.
*   **Server State & Asynchronous Data:** Use **TanStack Query (React Query)** for managing data fetched from APIs, including caching, refetching, and optimistic updates.
*   **Global UI State (Minimal):** For simple global UI state (e.g., theme, mobile navigation toggle) that doesn't involve server data, React Context API can be used. Avoid overusing Context for complex state. No dedicated global state library (like Zustand or Redux) is currently in use; introduce one only if complexity demonstrably warrants it.

### 4. Routing

*   **Client-Side Routing:** Use **React Router DOM** for all navigation and route definitions.
*   **Route Configuration:** Define routes primarily within `src/App.tsx`.
*   **Page Components:** Create page-level components in the `src/pages/` directory.

### 5. Forms

*   **Form Handling:** Use **React Hook Form** for managing form state, submission, and validation.
*   **Schema Validation:** Use **Zod** to define validation schemas for forms, integrated with React Hook Form via `@hookform/resolvers`.

### 6. Icons

*   **Icon Library:** Use **Lucide React** for all icons. Import icons directly from `lucide-react`.

### 7. Notifications & Toasts

*   **Primary Toast Library:** Use **Sonner** for displaying toast notifications (success, error, info, loading).
*   **Utility Functions:** Utilize the helper functions in `src/utils/toast.ts` (`showSuccess`, `showError`, etc.) for consistency.
*   The `useToast` hook from `src/components/ui/use-toast.ts` (shadcn/ui) is available but Sonner is preferred for imperative notifications.

### 8. Audio Processing

*   **Speech Recognition:** Use the custom `EnhancedSpeechRecorder` class (`src/services/EnhancedSpeechRecorder.ts`) which wraps the browser's Speech Recognition API.
*   **Audio Manipulation:** Use the utility functions in `src/utils/audioUtils.ts` for tasks like decoding audio blobs, trimming audio, and converting `AudioBuffer` to WAV format. These utilities use the Web Audio API.

### 9. Utility Functions

*   **General Utilities:** Place general helper functions in `src/lib/utils.ts` (like `cn`) or create new files under `src/utils/` for domain-specific utilities.

### 10. Date and Time

*   **Date/Time Operations:** Use the **date-fns** library for any date or time formatting, manipulation, or calculations.

### 11. Code Quality & Conventions

*   **TypeScript:** Write all new code in TypeScript. Leverage strong typing and interfaces/types.
*   **ESLint & Prettier:** Adhere to the project's ESLint rules for code style and quality (configuration likely in `eslint.config.js` or `package.json`). Formatting should be handled automatically if Prettier is set up.
*   **File Structure:**
    *   Pages: `src/pages/`
    *   Reusable UI Components: `src/components/` (with shadcn/ui components in `src/components/ui/`)
    *   Hooks: `src/hooks/`
    *   Services/API Logic: `src/services/` (if applicable, or integrate with TanStack Query hooks)
    *   Utilities: `src/utils/` and `src/lib/`
    *   Types: Define types close to their usage or in a dedicated `src/types/` directory if they are globally shared.

By following these rules, we can ensure the application remains maintainable, scalable, and consistent.