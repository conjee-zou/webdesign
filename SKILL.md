---
name: webdesign-design
description: Use this skill to generate well-branded interfaces and assets for the Webdesign System — a general-purpose, token-driven responsive web UI kit. Use for production mockups, throwaway prototypes, slides, or any artifact that should feel cohesive with this system.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files — `colors_and_type.css` (all tokens), `ICONOGRAPHY.md`, `ui_kits/web/` (JSX components + interactive `index.html`), and `preview/` (small specimen cards).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy `colors_and_type.css` and `ui_kits/web/styles.css` into your artifact and reference the `.wd-*` component classes (or lift the JSX components directly). For single-file artifacts, inline the token block at the top of `<style>`.

If working on production code, treat this folder as a style guide: lift tokens into your existing CSS / theme file, and adapt the JSX components to your component framework of choice. The component contracts are intentionally small and prop-minimal.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few clarifying questions (audience, surface type, required components, tone), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need. Default to the system's quietly-confident aesthetic: warm-neutral canvas, crisp Inter type with Instrument Serif display accents, a single indigo accent, soft layered shadows, no gradients as decoration.
