<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commit conventions

- Only create a commit when the user explicitly asks for one.
- Use Conventional Commits: `<type>(<scope>): <summary>`.
- Allowed types are `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `build`, `ci`, `perf`, `style`, and `revert`.
- Use a short, lowercase, imperative summary without a trailing period, for example: `feat(home): add case study carousel`.
- Add a scope when it makes the affected area clearer; omit it when the change is repository-wide.
- Keep each commit focused on one logical change. Do not include unrelated or pre-existing user changes.
- Use `!` and a `BREAKING CHANGE:` footer for breaking changes.
- Before committing, run the relevant lint, type-check, test, and build commands for the affected code. If a check cannot run, state that clearly in the handoff.
- Use the commit body to explain motivation or non-obvious tradeoffs; do not merely repeat the diff.

## Branch and pull request workflow

- Treat `main` as a protected integration branch. Do not implement features or create feature commits directly on `main`.
- Before changing files for a new feature, create and switch to a branch from `main` named `feat/<short-kebab-case-description>`.
- Use `fix/`, `refactor/`, `docs/`, or `chore/` prefixes for non-feature work when appropriate.
- Keep one logical change per branch and keep the branch narrowly scoped.
- If the working tree contains uncommitted changes, do not switch branches until their ownership and destination are clear.
- Run the relevant validation commands, commit on the working branch, push it, and open a pull request targeting `main`.
- Merge into `main` only through the pull request after required checks and review are complete. Do not push commits directly to `main`.
