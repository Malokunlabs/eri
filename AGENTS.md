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
