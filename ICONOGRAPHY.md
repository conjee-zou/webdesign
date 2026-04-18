# Iconography

This system uses **[Lucide](https://lucide.dev)** as the canonical icon set. This is a substitution flagged to the user — the original `conjee-zou/webdesign` repo was inaccessible, so no bespoke icon set was imported. If the repo ships its own icons, swap this out and note the change here.

## Rules

- **Family:** Lucide (open source, MIT). Clean 1.5px stroke, rounded joints, 24×24 viewBox.
- **Default size:** 20px in-line with body text; 24px for nav items; 16px in dense UI (table row actions, badges); 32–48px for empty-state or feature illustrations.
- **Color:** Always `stroke: currentColor`. Icons inherit text color so they automatically theme-switch.
- **Weight:** 1.5px stroke — never reweight. If a heavier accent is needed, use a filled variant from Lucide (`-fill` suffix).
- **Pairing:** Every navigation item, button, and menu row should have matching text. Icon-only is reserved for dense actions (table kebabs, close buttons) and requires `aria-label` + `title`.
- **Alignment:** Icons align to the text baseline using `display: inline-flex; align-items: center; vertical-align: -0.125em`.
- **Spacing:** `gap: var(--space-2)` (8px) between icon and label. Tight pairings (inline in prose) can drop to 4px.

## Loading

**Prototypes / artifacts (preferred):**

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
```

**Production:** install `lucide-react` (or equivalent) and import named icons so only what's used is bundled.

## What NOT to do

- ❌ Emoji as icons. (Only allowed in user-generated content.)
- ❌ Unicode chars as icons (✓ ✗ ★). Use Lucide equivalents (`check`, `x`, `star`).
- ❌ Mixing multiple icon sets on one page.
- ❌ Filling stroke icons with a color to convey state — change `color` (stroke) instead, or swap to a status badge.
- ❌ Hand-drawn SVGs that don't match the Lucide 1.5px stroke aesthetic.

## Fonts

The brand sans is **Roboto** (variable, weights 100–900, widths 75–125%), installed at `fonts/Roboto-VariableFont_wdth_wght.ttf` and its italic pair. Other families (Instrument Serif for display, JetBrains Mono for code) remain Google-Fonts-hosted — flag if you'd like those replaced.

## Logos & brand marks

The `assets/` folder contains a placeholder word-mark (`logo.svg`) and icon-mark (`mark.svg`). Replace with the real brand marks when provided.
