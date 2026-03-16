# NexLed UI System — Consumer Projects

Projects using the NexLed Design System via CDN.

## Registry

| Project | Version | Last Audit | Status | Notes |
|---------|---------|------------|--------|-------|
| UI System (this repo) | v1.3.0 | 2026-03-16 | Compliant | Reference implementation |

## How to Register

When a new project adopts NexLed, add a row to the table above with:
- **Project**: Name and brief description
- **Version**: Which NexLed version the project pins to (from CDN `?v=` parameter)
- **Last Audit**: Date of last compliance check (using `scripts/audit-compliance.js`)
- **Status**: `Compliant`, `N issues`, or `Needs audit`
- **Notes**: Any relevant context

## Updating Projects

When NexLed releases a new version:
1. Check `CHANGELOG.md` for breaking changes
2. Update the `?v=` parameter in the project's `<head>` block
3. Run `scripts/audit-compliance.js` against the project's HTML files
4. Update the registry table above

## Requesting New Components

If your project needs a component that doesn't exist in NexLed:
1. Check `COMPONENTS.md` to confirm it's truly missing
2. Open an issue in the `NexLed_UI_System` repository with:
   - Component name
   - Use case / description
   - Visual reference (screenshot or Figma link)
   - Proposed class names following existing patterns
3. The design system maintainer will review and either:
   - Approve and implement in `nexled.css` / `nexled.js`
   - Suggest composition from existing components
   - Reject with rationale
4. New component ships in the next MINOR version
