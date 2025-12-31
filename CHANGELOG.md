# Changelog

## Unreleased

- **UI**: Simplified the site design for better readability and minimalism (global styles, header, cards, buttons, inputs, badges).
- **Fix**: Resolved nested anchor/hydration issues and adjusted external link buttons to avoid nested <a> inside <Link>.
- **Fix**: Updated types and data (categories, statuses, experience levels) to fix build type errors.
- **Fix**: Resolved prerender error by ensuring client event handlers aren't passed to server components during build.
- **Tests**: Verified dev server and production build locally (no build errors).

---

Detailed changes are available on the branch: `chore/minimal-ui-fixes`.