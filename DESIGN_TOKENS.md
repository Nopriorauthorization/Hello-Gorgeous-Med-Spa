# Hello Gorgeous Med Spa — Design Tokens

## Color Palette

- **Primary (brand):** `brand` — #E63E7A (hot pink / rose family)
  - 50: #FFEAF3
  - 100: #FFD5E8
  - 200: #FF8FBB
  - 300: #FF6F9F
  - 400: #E63E7A (DEFAULT)
  - 500: #C01E64
  - 600: #9A154F
  - 700: #73103A
  - 800: #4C0A25

- **Neutrals:** `neutral`
  - 50: #F9FAFB
  - 100: #F3F4F6
  - 200: #E5E7EB
  - 300: #D1D5DB
  - 400: #9CA3AF
  - 500: #6B7280
  - 600: #4B5563
  - 700: #374151
  - 800: #1F2937
  - 900: #111827

- **Accents:**
  - Teal: #0EA5A4
  - Gold: #D4AF37

## Typography

- **Heading (display):** Playfair Display — serif, elegant, modern
  - Use for H1–H3, key headlines
  - We include weights: 400, 600, 700

- **Body / UI:** Inter — variable sans-serif
  - Use for body copy, UI elements, forms
  - Use weights: 300, 400, 600, 700

Tailwind config maps `font-heading` -> Playfair Display, `font-body` -> Inter.

## Spacing & Layout

- Container max width: 1200px
- Base vertical rhythm for sections: `py-16` (Section component)

## Components (initial)

- `Header` — sticky, backdrop blur, contains brand and CTA
- `Footer` — compact, neutral
- `Button` — `primary` (brand) and `ghost`
- `Card` — shadowed content container
- `Section` — consistent section spacing and container
- `ContactForm` — reusable lead form

## Usage notes

- Use `brand` for primary CTAs and highlights.
- Use `neutral-900` for text, `neutral-50/100` for backgrounds.
- Motion: use `framer-motion` for transitions and micro-interactions.
