---
name: frontend-design
description: |
  Guidance for creating highly premium, distinctive frontend interfaces that avoid generic "AI-slop" aesthetics.
  Enforces custom typography, fluid layouts, cohesive HSL/OKLCH color themes, motion design, and mobile/PWA constraints.

  Trigger immediately for:
  - Designing visual themes, layouts, grids, or visual design tokens.
  - Creating key user interface elements (buttons, navs, cards, forms, modals).
  - Styling PWAs or Hybrid mobile apps requiring device safe areas and touch target sizes.
---

# Frontend Design

A guide to creating state-of-the-art, custom frontend layouts that avoid cookie-cutter AI styles (generic grid-cards, boring Inter font stacks, standard purple/blue gradients).

## Stage 1: Assessment & Proposal

Before writing frontend code, establish a design direction:
1.  **Aesthetic Tone**: Commit to a specific theme (e.g., Editorial Minimalist, Dark Brutalism, Sleek Glassmorphism).
2.  **Typography**: Pair a distinct header font (e.g., Outfit, Syne, Playfair) with a clean reading font (e.g., Plus Jakarta Sans, Satoshi). Avoid default system stacks.
3.  **Visual Differentiator**: Choose one defining visual element (e.g., mesh gradients, asymmetric card borders, interactive floating tab bar).

---

## Stage 2: Color System (HSL/OKLCH)

Avoid flat hex values. Use CSS custom properties for dynamic transparency and dark mode support:

```css
:root {
  /* Color Palette (HSL-based for easy transparency) */
  --primary-h: 220;
  --primary-s: 92%;
  --primary-l: 54%;
  
  --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
  --primary-10: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
  --primary-20: hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.2);

  /* Light Theme Defaults */
  --bg-main: hsl(210, 20%, 98%);
  --bg-card: hsl(0, 0%, 100%);
  --text-main: hsl(222, 47%, 12%);
  --text-muted: hsl(215, 16%, 45%);
  --border-color: hsl(214, 32%, 91%);
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-main: hsl(222, 47%, 4%);
    --bg-card: hsl(222, 47%, 8%);
    --text-main: hsl(210, 40%, 98%);
    --text-muted: hsl(215, 20%, 65%);
    --border-color: hsl(217, 32%, 15%);
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  }
}
```

---

## Stage 3: Spatial Rhythm & Fluidity

Use `clamp()` for fluid font scaling and consistent padding across viewports:

```css
:root {
  /* Fluid Typographic Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.82rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem);
  
  /* Layout Padding */
  --fluid-pad: clamp(1rem, 0.8rem + 1vw, 2.5rem);
}
```

---

## Stage 4: Mobile & PWA Optimization

Ensure the design behaves naturally in native wrappers or home screen shortcuts:

1.  **Notch/Safe Areas**: Apply safe-area margins so native hardware cutouts don't obscure content:
    ```css
    body {
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      padding-left: env(safe-area-inset-left, 0px);
      padding-right: env(safe-area-inset-right, 0px);
    }
    ```
2.  **Touch Interaction**:
    - Minimum interactive target: `48px` x `48px`.
    - Prevent selection overlays on actions: `user-select: none;`.
    - Remove grey tapping highlights: `-webkit-tap-highlight-color: transparent;`.

---

## Stage 5: Micro-Animations

Use custom easing curves for transition animations:

```css
.premium-interactive {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), 
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.premium-interactive:hover {
  transform: translateY(-2px) scale(1.01);
  border-color: var(--primary-20);
}
```