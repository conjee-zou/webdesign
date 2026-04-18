# Webdesign — Design System

Tokens, type, and components. Live preview: **https://conjee-zou.github.io/webdesign/**

## Contents

```
index.html              Gallery — links every preview card + UI kit
colors_and_type.css     All design tokens (colors, type, spacing, radii, shadows)
fonts/                  Roboto variable fonts (upright + italic)
assets/                 Logo + mark
preview/                One HTML file per token/component card
ui_kits/web/            Full Web UI kit demo (index.html + JSX components)
```

## Publish to GitHub Pages

1. Commit everything in this folder to the `main` branch of `conjee-zou/webdesign`.
2. On GitHub: **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `(root)`
3. Save. After ~1 min, the site lives at `https://conjee-zou.github.io/webdesign/`.

`.nojekyll` is included so Pages serves files starting with `_` and folders like `ui_kits/` verbatim, without running Jekyll.

## Local preview

Any static file server works, e.g.:

```
npx serve .
# or
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.
