# Repository instructions

This is a Next.js App Router project using React, TypeScript, Tailwind CSS, and pnpm. Use `pnpm` for dependency management and project scripts. Keep route composition in `src/app`, reusable presentation components in `src/components`, and shared utilities or configuration in `src/lib`.

## Branch workflow

- Treat `main` as a protected integration branch.
- Before implementing a new feature, create `feat/<short-kebab-case-description>` from `main` and work there.
- Use `fix/`, `refactor/`, `docs/`, or `chore/` prefixes when they better describe the branch.
- Keep branches focused on one logical change.
- Never commit or push feature work directly to `main`.
- Open a pull request from the working branch into `main` and merge only after validation and review pass.

## Commit messages

When GitHub Copilot generates a commit message, inspect the staged changes and follow these rules:

- Use Conventional Commits: `<type>(<scope>): <summary>`.
- Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `build`, `ci`, `perf`, `style`, and `revert`.
- Use a concise, lowercase, imperative summary with no trailing period.
- Add a scope only when it identifies a meaningful affected area.
- Describe only the staged changes. Do not claim work that is not present in the diff.
- Keep commits focused on one logical change.
- Mark breaking changes with `!` and a `BREAKING CHANGE:` footer.
- Use a body only to explain motivation or non-obvious tradeoffs.

Example: `feat(home): implement editorial hero section`
