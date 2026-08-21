---
name: ZoFranca CR Institutional Interface
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  table-data:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin: 40px
  max-width: 1440px
---

## Brand & Style

The design system is engineered for the high-stakes environment of Costa Rican Free Trade Zone management. It prioritizes **Corporate Modernism**—a style that balances institutional authority with the efficiency of a high-performance SaaS platform. 

The visual narrative is built on three pillars:
1.  **Trust:** Utilizing a structured grid and deep blues to convey stability and legal compliance.
2.  **Clarity:** Reducing cognitive load through generous whitespace and a strict information hierarchy, essential for processing complex trade data.
3.  **Precision:** Data-driven elements use crisp edges and subtle depth to differentiate between static information and interactive controls.

The aesthetic avoids unnecessary ornamentation, focusing instead on "functional elegance" where the quality of typography and the rhythm of the grid define the user experience.

## Colors

This design system utilizes a hierarchical palette designed for professional environments:

*   **Primary (Deep Navy):** Reserved for core navigation, primary actions (Buttons), and institutional branding. It signifies the "Authority" of the platform.
*   **Secondary (Cyan):** Used for interactive elements like links, active states, and secondary buttons to provide a clear but less dominant visual cue.
*   **Semantic Palette:**
    *   **Success (Emerald):** Used for "Aprobada" and "En regla" states.
    *   **Warning (Amber):** Used for "Pendiente" and "Revisar" states.
    *   **Danger (Red):** Used for "Rechazada" and "Incumplimiento" states.
*   **Neutrals:** A scale of cool grays derived from the navy base ensures that text and borders feel integrated rather than stark black.

All color combinations must pass WCAG AA contrast ratios for accessibility, particularly on data tables and status badges.

## Typography

The typography system relies exclusively on **Inter**, a typeface designed for screens and high-density data. 

*   **Headlines:** Use tighter letter-spacing and heavier weights to create a strong visual anchor for page titles and section headers.
*   **Form Labels:** Utilize the `label-bold` style with slight tracking (letter-spacing) and uppercase treatment to ensure labels are distinguishable from user input.
*   **Data Density:** For large tables, `table-data` provides a compact yet legible size. 
*   **Language Support:** Ensure all Spanish diacritics (á, é, í, ó, ú, ñ) are rendered with the same optical weight as standard characters.

## Layout & Spacing

The design system employs a **Fixed-Fluid Hybrid Grid**. Content is centered within a maximum width of 1440px for desktop clarity.

*   **The 8px Square:** All spacing, margins, and paddings must be multiples of 8px (or 4px for fine-tuning). 
*   **Layout Structure:** A 12-column grid is used for the main content area. Sidebars should be fixed at 280px to maintain consistent navigation regardless of screen width.
*   **Data Density:** In data-heavy views (Management Tables), vertical padding is reduced to `sm` (8px) to maximize the amount of information visible "above the fold." In informational or dashboard views, use `md` (16px) or `lg` (24px) to increase breathability.

## Elevation & Depth

To maintain a professional, institutional look, the design system uses **Tonal Layering** and **Soft Ambient Shadows**.

*   **Level 0 (Background):** #f8fafc. All main page backgrounds.
*   **Level 1 (Surface):** White (#ffffff). Cards, table containers, and sidebar. Used with a subtle 1px border (#e2e8f0).
*   **Level 2 (Hover/Overlay):** Used for dropdowns and active cards. Shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`.
*   **Level 3 (Modals):** High-contrast shadows to focus user attention, paired with a 40% opacity navy backdrop.

Avoid heavy skeuomorphism. Depth should feel like layers of physical paper stacked neatly.

## Shapes

The design system utilizes **Soft** geometry to appear modern without losing its corporate edge.

*   **Standard Elements:** Buttons, Input fields, and Badges use `rounded` (0.25rem / 4px).
*   **Containers:** Data cards and Modals use `rounded-lg` (0.5rem / 8px).
*   **Status Badges:** Use a "Capsule" shape (full rounding) to differentiate them from interactive buttons.

Consistent corner radii across the platform reinforce the "systematic" nature of the management tool.

## Components

### Buttons
*   **Primary:** Solid Deep Navy (#1e3a8a) with white text.
*   **Secondary:** Outline with Cyan (#0284c7) border and text.
*   **Tertiary:** Ghost style, text-only with a subtle background hover state.

### Status Badges (Etiquetas de Estado)
*   **Layout:** Horizontal auto-layout, 8px horizontal padding, 2px vertical.
*   **Aprobada / En regla:** Background #d1fae5 (Emerald 100), Text #065f46 (Emerald 800).
*   **Rechazada / Incumplimiento:** Background #fee2e2 (Red 100), Text #991b1b (Red 800).
*   **Pendiente / Revisar:** Background #fef3c7 (Amber 100), Text #92400e (Amber 800).
*   **Recomendada:** Background #e0f2fe (Cyan 100), Text #075985 (Cyan 800).

### Data Tables
*   **Header:** Light gray background (#f1f5f9), bold labels, 1px bottom border.
*   **Rows:** White background, subtle hover effect (#f8fafc). High contrast between text and background.
*   **Pagination:** Simple, numeric with "Anterior" and "Siguiente" labels.

### KPI Cards
*   **Structure:** Large numerical value in Primary Navy, followed by a `label-bold` descriptor and a small trend indicator (Success or Danger).

### Form Inputs
*   **State:** 1px border (#cbd5e1). On focus: 2px Primary Navy border with a soft glow. Labels must always be visible above the input field.