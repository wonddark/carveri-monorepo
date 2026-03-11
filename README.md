# CarCheck Portal

CarCheck Portal is a modern web application designed for car inspection and management. This project provides a robust, scalable interface built with the latest technologies in the React ecosystem.

## 🚀 Tech Stack

The project leverages a high-performance stack for a seamless developer experience and optimized production builds:

- **React 19**: Utilizing the latest features including the React Compiler.
- **Vite 7**: A fast frontend build tool and development server.
- **TypeScript**: Ensuring type safety across the entire codebase.
- **React Router 7**: Modern routing solution for React applications.
- **Tailwind CSS 4**: Next-generation utility-first CSS framework integrated with Vite.
- **Shadcn/UI & Radix UI**: High-quality, accessible UI components and primitives.
- **React Hook Form & Yup**: Robust form management and schema validation.
- **Sonner**: Elegant toast notifications.
- **Yet Another React Lightbox**: High-performance lightbox component.
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
│   ├── data/            # Data configurations and router definitions
│   ├── layout/          # Application layouts (Root, etc.)
│   ├── lib/             # Utility functions and shared logic
│   ├── pages/           # Page components and feature playgrounds
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

## 🧪 Playground Pages

The project includes several playground pages to test and demonstrate the integration of new libraries:

- `/test-router`: Demonstrates basic routing and navigation.
- `/test-form`: Showcases form handling with `react-hook-form` and `yup` validation.
- `/test-lightbox`: Features the `yet-another-react-lightbox` component for image galleries.

These pages can be accessed during development to ensure dependencies are correctly configured.

## 📜 Development Guidelines

- **Component Organization**: New reusable components should be placed in `src/components/`. Base UI components go into `src/components/ui/`.
- **Styling**: Use Tailwind CSS utility classes. Custom styles should be kept to a minimum and defined in `src/index.css` if necessary.
- **Code Quality**: Ensure all code passes linting (`pnpm lint`) and follows Prettier formatting rules.
- **Type Safety**: Strictly use TypeScript interfaces and types for all props and data structures.

## 🛡️ License

This project is private and intended for internal use.
