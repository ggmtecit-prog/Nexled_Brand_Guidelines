# NexLed UI System — Changelog

All notable changes to this project will be documented in this file.
Format follows [Semantic Versioning](https://semver.org/).

---

## [1.3.0] — 2026-03-16

### Fixed
- CSS typo: `var(--color-grery-re)` corrected to `var(--color-grey-primary)` in dropdown value color
- Removed hardcoded `text-35px` and redundant `font-urbanist` span in product card (molecules.html)
- Standardized font loading across all pages to `Urbanist:wght@300;400;500;600;700` (was inconsistent)
- Fixed empty Figma link in tokens.html navigation
- Fixed UTF-8 encoding corruption in organisms.html comments

### Added
- `starter.html` — canonical boilerplate for new projects consuming NexLed via CDN
- `CLAUDE-PORTABLE.md` — drop-in AI implementation rules for external projects
- `version.json` — machine-readable version metadata
- `CHANGELOG.md` — version history (this file)
- `CONSUMERS.md` — registry of projects using NexLed
- `scripts/audit-compliance.js` — HTML linting tool for NexLed compliance
- `scripts/build-components-md.js` — auto-generates COMPONENTS.md from source files
- Rebuilt `COMPONENTS.md` with complete component reference and HTML snippets

---

## [1.2.0] — Prior

- Initial NexLed Design System release
- 30+ component families (atoms, molecules, organisms)
- Complete design token system (colors, spacing, typography, shadows, motion, breakpoints)
- Tailwind CDN integration via config-cdn.js
- Interactive component logic via nexled.js (accordion, dropdown, modal, stepper)
- CLAUDE.md implementation rules for AI-assisted development
- Skills system for Claude Code, Cursor, Windsurf, Continue, Qwen
