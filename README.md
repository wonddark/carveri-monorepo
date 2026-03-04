# CarCheck Portal

CarCheck Portal is a modern web application designed for car inspection and management. This project provides a robust, scalable interface built with the latest technologies in the React ecosystem.

## 🚀 Tech Stack

The project leverages a high-performance stack for a seamless developer experience and optimized production builds:

- **React 19**: Utilizing the latest features including the React Compiler.
- **Vite 7**: A fast frontend build tool and development server.
- **TypeScript**: Ensuring type safety across the entire codebase.
- **Tailwind CSS 4**: Next-generation utility-first CSS framework integrated with Vite.
- **Shadcn/UI**: High-quality, accessible UI components.
- **Radix UI**: Low-level UI primitives for accessibility.
- **Tabler Icons**: Versatile icon set for React.
- **ESLint & Prettier**: Enforcing code quality and consistent formatting.

## 📁 Project Structure

```text
carcheck-portal/
├── public/              # Static assets (favicons, etc.)
├── src/
│   ├── assets/          # Images, fonts, and global assets
│   ├── components/      # Reusable UI components
│   │   └── ui/          # Base Shadcn/UI components
│   ├── lib/             # Utility functions and shared logic
│   ├── App.tsx          # Main Application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind directives
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint rules and configuration
└── package.json         # Project dependencies and scripts
```

## 🛠️ Scripts

The following scripts are available for development and production:

- `pnpm dev`: Starts the development server with Vite.
- `pnpm build`: Runs TypeScript check and builds the application for production.
- `pnpm lint`: Lints the codebase using ESLint.
- `pnpm preview`: Locally previews the production build.

## 🔧 Getting Started

To get the project running locally, follow these steps:

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Run the development server**:

   ```bash
   pnpm dev
   ```

3. **Build for production**:
   ```bash
   pnpm build
   ```

## 📜 Development Guidelines

- **Component Organization**: New reusable components should be placed in `src/components/`. Base UI components go into `src/components/ui/`.
- **Styling**: Use Tailwind CSS utility classes. Custom styles should be kept to a minimum and defined in `src/index.css` if necessary.
- **Code Quality**: Ensure all code passes linting (`pnpm lint`) and follows Prettier formatting rules.
- **Type Safety**: Strictly use TypeScript interfaces and types for all props and data structures.

## 🛡️ License

This project is private and intended for internal use.
