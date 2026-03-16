# NexLed Design System — Implementation Rules

> Drop this file as `CLAUDE.md` in any project that uses the NexLed Design System.
> It gives Claude (or any AI agent) the full context to build compliant pages.

---

## Identity

- Act as a strict NexLed implementation agent.
- Implement only what exists in the current NexLed system.
- Never invent values, classes, variants, sizes, tokens, or components.
- If a component or token doesn't exist — STOP. Report it. Do not invent a fix.

---

## Step 0: Read Sources (MANDATORY)

Before writing ANY code, fetch and read these three files:

1. `https://ggmtecit-prog.github.io/NexLed_UI_System/src/config-cdn.js?v=1.3`
2. `https://ggmtecit-prog.github.io/NexLed_UI_System/src/nexled.css?v=1.3`
3. `https://ggmtecit-prog.github.io/NexLed_UI_System/COMPONENTS.md?v=1.3`

Do not start implementation until all three are read.

---

## Required `<head>` Block (Exact Order)

```html
<!-- 1. Load Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet">

<!-- 2. Tailwind CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 3. NexLed Design System -->
<script src="https://ggmtecit-prog.github.io/NexLed_UI_System/src/config-cdn.js?v=1.3"></script>
<link rel="stylesheet" href="https://ggmtecit-prog.github.io/NexLed_UI_System/src/nexled.css?v=1.3">

<!-- 4. Interactive Components (include if using accordion, dropdown, modal, stepper) -->
<script src="https://ggmtecit-prog.github.io/NexLed_UI_System/src/nexled.js?v=1.3"></script>
```

---

## CSS Rules (Absolute — No Exceptions)

- NEVER use `<style>` blocks
- NEVER use inline `style=""` attributes
- NEVER create or modify local CSS files
- NEVER hardcode values (no hex colors, no px values, no shadows, no radius)
- NEVER use arbitrary Tailwind values like `w-[320px]` or `text-[#03683D]`
- ALL component styling must come from `nexled.css` classes
- ALL values must come from token names defined in `config-cdn.js`
- Tailwind utility classes are ONLY allowed for layout (flex, grid, gap, padding on wrappers)
- If a component style is missing from nexled.css — STOP. Report it.
- If a token name is not in config-cdn.js — STOP. Report it.

---

## Common Mistakes (NEVER DO THESE)

```
WRONG: class="bg-[#03683D]"          → RIGHT: class="bg-green-primary"
WRONG: style="padding: 16px"         → RIGHT: class="p-16"
WRONG: class="text-[35px]"           → RIGHT: class="text-35px" (it's a token)
WRONG: class="rounded-lg"            → RIGHT: class="rounded-lg" (OK — lg is a token)
WRONG: class="shadow-lg"             → RIGHT: class="shadow-btn-default" (use NexLed shadow tokens)
WRONG: <style>.custom { ... }</style> → NEVER. Use nexled.css classes only.
WRONG: class="font-urbanist"         → Already set by nexled.css on body. Redundant.
WRONG: class="text-green-500"        → RIGHT: class="text-green-primary" (use NexLed color names)
```

---

## Component Class Pattern

Every component follows: `[component] [variant] [size]`

```html
<button class="btn btn-primary btn-md">Label</button>
<button class="btn btn-secondary btn-icon btn-sm" aria-label="Action">
    <i class="ri-icon-name" aria-hidden="true"></i>
</button>
<span class="badge badge-success badge-md">New</span>
<input class="input input-md" placeholder="Enter text">
<div class="accordion accordion-md">...</div>
<div class="dropdown dropdown-minimal dropdown-sm">...</div>
```

---

## Component Inventory (Quick Reference)

### Atoms

| Component | Core Class | Variants | Sizes |
|-----------|-----------|----------|-------|
| Button | `btn` | `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-danger` | `btn-xl`, `btn-lg`, `btn-md`, `btn-sm`, `btn-xs` |
| Button Icon | `btn btn-icon` | Same as button | Same as button |
| Button Toggle | `btn btn-toggle` | — | Same as button |
| Badge | `badge` | `badge-primary`, `badge-success`, `badge-danger`, `badge-neutral` | `badge-lg`, `badge-md`, `badge-sm` |
| Badge Dot | `badge badge-dot` | Same as badge | Same as badge |
| Input | `input` | `input-error`, `input-success` | `input-sm`, `input-md`, `input-lg` |
| Checkbox | `checkbox-wrapper` | — | `checkbox-sm`, `checkbox-md`, `checkbox-lg` |
| Radio | `radio-wrapper` | — | `radio-sm`, `radio-md`, `radio-lg` |
| Link | `link` | `link-inline`, `link-subtle`, `link-text-icon`, `link-navigation` | `link-sm`, `link-md`, `link-lg` |
| Divider | `divider` | `divider-bold`, `divider-brand` | — |
| Tooltip | `tooltip` | `tooltip-black`, `tooltip-white`, `tooltip-rich` | `tooltip-xs`, `tooltip-sm`, `tooltip-md` |

### Molecules

| Component | Core Class | Variants | Sizes |
|-----------|-----------|----------|-------|
| Card | `card` | `card-primary` | — |
| Card Product | `card-product` | — | — |
| Accordion | `accordion` | — | `accordion-sm`, `accordion-md`, `accordion-lg` |
| Dropdown | `dropdown` | `dropdown-minimal`, `dropdown-multi`, `dropdown-flyout` | `dropdown-xs`, `dropdown-sm`, `dropdown-md`, `dropdown-lg` |
| Breadcrumb | `breadcrumb` | — | — |
| Announcement Bar | `announcement-bar` | `announcement-bar-standard`, `announcement-bar-floating`, `announcement-bar-light` | — |
| Carousel | `carousel` | `carousel-landscape`, `carousel-square` | — |
| Spinner | `spinner` | `spinner-white` | `spinner-sm`, `spinner-md`, `spinner-lg` |
| Quantity Selector | `quantity-selector` | — | `quantity-selector-sm`, `quantity-selector-md`, `quantity-selector-lg` |
| Uploader | `uploader` | — | — |
| Language Selector | `language-selector` | `language-selector-standard`, `language-selector-icon` | `language-selector-xs`, `language-selector-sm`, `language-selector-md`, `language-selector-lg` |
| Material Selector | `material-selector` | — | `material-selector-sm`, `material-selector-md`, `material-selector-lg` |
| Stepper | `stepper` | — | — |
| List | `list` | `list-spec` | `list-md` |

### Organisms

| Component | Core Class | Variants | Sizes |
|-----------|-----------|----------|-------|
| Modal | `modal` | `modal-destructive` | — |
| Modal Overlay | `modal-overlay` | — | — |
| Footer | `footer` | — | — |
| Sidebar | `sidebar` | — | — |
| Navbar | `nav-bar` | — | — |
| Flyout | `flyout` | — | — |
| Panel | `panel` | — | — |

---

## State Classes & ARIA

| State | Class / Attribute | Used By |
|-------|-------------------|---------|
| Open | `.is-open` | dropdown, accordion, modal |
| Active | `.is-active` | stepper, link |
| Selected | `.is-selected`, `[aria-selected="true"]` | material-selector, dropdown item |
| Disabled | `:disabled`, `[aria-disabled="true"]` | buttons, inputs |
| Pressed | `[aria-pressed="true"]` | toggle buttons |
| Expanded | `[aria-expanded="true"]` | accordion triggers |
| Drag over | `.is-dragover` | uploader |
| Has files | `.has-files` | uploader |
| Has value | `.has-value` | dropdown |

---

## Design Tokens (from config-cdn.js)

### Colors (Tailwind class names)
`green-primary`, `green-secondary`, `green-hover-icons`, `green-hover-text`, `blue-primary`, `blue-secondary`, `black`, `white`, `grey-primary`, `grey-secondary`, `grey-tertiary`, `link-visited`, `red-primary`, `red-secondary`

### Spacing (use as p-*, m-*, gap-*, etc.)
`4`, `8`, `10`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `56`, `64`

### Font Sizes (use as text-*)
`display`, `hero-title`, `hero-subtitle`, `nav-bar-h1`, `h1`, `h2`, `h3`, `body-xl`, `body-lg`, `body`, `body-sm`, `body-xs`, `label`, `overline`, `button`, `link`, `button-lg`, `35px`, `38px`, `45px`, `25px`

### Font Weights (use as font-*)
`light` (300), `regular` (400), `medium` (500), `semibold` (600)

### Border Radius (use as rounded-*)
`none`, `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `btn`, `full`

### Shadows (use as shadow-btn-*)
`shadow-btn-default`, `shadow-btn-hover`, `shadow-btn-active`, `shadow-btn-glow`, `shadow-btn-hover-active`

### Layout Max-Widths (use as max-w-*)
`standard` (1280px), `wide` (1440px), `narrow` (768px), `readable` (65ch)

### Breakpoints
`sm` (480px), `md` (768px), `lg` (1024px), `xl` (1440px)

### Z-Index (use as z-*)
`base` (0), `dropdown` (1000), `sticky` (1100), `overlay` (2000), `modal` (2100), `popover` (2200), `tooltip` (3000)

### Motion
Duration: `duration-default` (400ms), `duration-400` (400ms)
Easing: `ease-premium`, `ease-button-ease`

### Icon Sizes (use as text-icon-*)
`text-icon-xs` (12px), `text-icon-sm` (16px), `text-icon-md` (20px), `text-icon-lg` (24px), `text-icon-xl` (32px), `text-icon-xxl` (48px)

---

## Hard Constraints

- Stack: HTML + Tailwind CDN + `config-cdn.js` + `nexled.css` + Remix Icons — nothing else
- Use component JS (`nexled.js`) only when interaction is required
- Do not migrate to another framework
- Do not substitute CSS framework or token system
- Do not bypass NexLed tokens/classes for visual decisions
- Icons: Use Remix Icons only (`ri-*` classes from remixicon CDN)

---

## Working Method

### 1. Understand
- Read CDN sources and task constraints
- Identify exact components/states needed
- List what nexled.css classes will be used

### 2. Build
- Semantic HTML, accessibility-first
- Apply component classes from nexled.css only
- Apply token utilities from config-cdn.js only
- Full responsive behavior across breakpoints

### 3. Animate (if required)
- Hover, active, focus-visible, disabled states
- Use NexLed motion tokens only (400ms, ease-premium)

### 4. Validate
Run this checklist before delivering:

```
[ ] CDN sources were read first
[ ] Required <head> block is present in exact order
[ ] No <style> tags in the document
[ ] No inline style="" attributes
[ ] No local CSS files
[ ] No arbitrary Tailwind values (no square brackets)
[ ] No hardcoded color hex values in classes
[ ] All component styling uses nexled.css classes only
[ ] All values use config-cdn.js token names only
[ ] States covered: hover, active, focus-visible, disabled, ARIA
[ ] Responsive at all breakpoints (sm, md, lg, xl)
[ ] Semantic HTML and accessible
[ ] Version pinned in CDN URLs (?v=1.3)
```

---

## Output Format

Deliver in this order:
1. Understanding summary — components identified and classes to be used
2. Complete file(s) — HTML only, no embedded CSS
3. What could not be converted — list anything with no nexled.css class
4. Validation checklist result
