# Eri

A production-ready foundation for a website built with Next.js, TypeScript, Tailwind CSS, and the App Router.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
pnpm dev        # Start the local development server
pnpm lint       # Run ESLint
pnpm build      # Create a production build
pnpm start      # Run the production build
```

## Project structure

```text
src/
├── app/                 # Routes, layouts, metadata, and global styles
├── components/
│   ├── layout/          # Site-wide header, footer, and navigation
│   └── ui/              # Small reusable presentation components
└── lib/                 # Configuration, utilities, and shared server-safe logic
public/                  # Static assets served from the site root
```

As the website grows, add domain-specific code under `src/features/<feature-name>`. Keep route files focused on composition, and colocate route-only components inside their route folder.

## Conventions

- Prefer React Server Components; add `"use client"` only for browser APIs or interactivity.
- Import internal modules through the `@/*` alias.
- Put reusable design primitives in `components/ui` and site-wide chrome in `components/layout`.
- Store secrets in `.env.local`; never commit environment files.
- Run `pnpm lint` and `pnpm build` before opening a pull request.
