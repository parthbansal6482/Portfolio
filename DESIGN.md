---
name: Prisma Portfolio Design System
description: An elegant dark-mode portfolio combining organic motion with technical precision.
colors:
  primary: "#DEDBC8"
  neutral-bg: "#000000"
  surface: "#101010"
  surface-card: "#050505"
  sage-green: "#A3B899"
typography:
  display:
    fontFamily: '"Plus Jakarta Sans", sans-serif'
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  serif:
    fontFamily: '"Instrument Serif", serif'
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: '"Plus Jakarta Sans", sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: '"DM Mono", monospace'
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "12px"
  lg: "16px"
  xl: "32px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "9999px"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "9999px"
    padding: "8px 16px"
---

# Design System: Prisma Portfolio

## 1. Visual Theme & Atmosphere
A highly restrained, gallery-airy interface designed for EMs and technical recruiters. Built upon a canvas of pure Obsidian Black depth, the design matches brutalist-grade technical engineering grids with organic interactive animations. Negative space is used confidently to allow content to breathe, utilizing singular warm cream accents and sage green details. The vibe feels clinical yet natural.

- **Atmosphere Vibe Keys**:
  - **Density**: 4/10 (Gallery Airy — generous margin spacing and clean separation)
  - **Variance**: 7/10 (Offset Asymmetric headers and layouts)
  - **Motion**: 8/10 (Cinematic scroll-linked expansions and cursor spring trails)

## 2. Color Palette & Roles
- **Obsidian Black** (`#000000`) — Primary canvas background base depth.
- **Core Container Slate** (`#101010`) — Background surface for card containers (e.g. About, Footer).
- **Silicon Core Charcoal** (`#050505`) — Horizontal project card bodies.
- **Seed Shell Cream** (`#DEDBC8`) — Primary typographic focus and accent color. Used for headings, highlights, and primary CTA buttons.
- **Sage Green** (`#A3B899`) — Accent color reserved specifically for the sprouting organic leaf elements in the custom interactive cursor.
- **Zinc Ink** (`#E1E0CC`) — High-contrast primary text color.
- **Muted Steel** (`#A3A3A3` / `text-neutral-400`) — Secondary text and descriptions.
- **Structural Border** (`#171717` / `border-neutral-900`) — Component boundaries and subtle separating rules.

## 3. Typography Rules
- **Display**: **Plus Jakarta Sans** (weights: 300 to 800) — Track-tight, geometric-humanist headlines. Never scaled past 6rem.
- **Body**: **Plus Jakarta Sans** (weights: 400 to 500) — Relaxed leading, constrained to 65–75ch maximum line lengths for legibility.
- **Editorial Serif**: **Instrument Serif** (italic) — Used exclusively as inline highlights inside display headers and titles to provide organic warmth.
- **Technical Mono**: **DM Mono** — Used for technical indexes ("01", "02"), categories, tech stack skill pills, and developer links.

## 4. Component Stylings
- **Buttons**:
  - Primary button: Solid Seed Shell Cream fill with black text, fully rounded (pill). Active state triggers weight spring scale.
  - Secondary/Link button: Dark neutral background with standard border-neutral-800, transitioning to solid primary cream on hover.
- **Project Cards**:
  - Horizontal items with rounded edges (`rounded-[2rem]`).
  - No shadows. Instead, elevation and spatial depth are achieved via mouse-tracking 3D tilt transformations (`perspective-1000`) and a sweeping mouse-spotlight background glow.
- **Interactive Sprout Cursor**:
  - Custom floating SVG cursor that hides the native browser pointer.
  - Features a central Seed Shell Cream core with Sage Green leaves that dynamically sprout outward using high-spring dampening configurations whenever hovering over clickable cards, buttons, or nav links.

## 5. Layout Principles
- No absolute overlapping element stacks. Every element occupies a distinct spatial zone.
- Asymmetric layout balance: display headings utilize left-aligned and word-wrapped offsets instead of boring center layouts.
- Grid-based layouts for 2D card displays, with strict collapse to a single column below 768px for responsive, mobile-first compatibility.
- Section boundaries separated by scroll-revealed, gradient lines expanding from the center.

## 6. Motion & Interaction
- **Spring Physics**: Default spring config (`stiffness: 100, damping: 20` or `stiffness: 60, damping: 18`) for weighty transitions.
- **Waterfalls**: List items utilize staggered delays to animate into view in sequence.
- **Spotlight Sweeps**: Mouse move coordinates map to radial spotlight overlays inside cards via hardware-accelerated transforms (CSS variables mapped to transforms), eliminating reflows.

## 7. Anti-Patterns (Banned)
- No emojis anywhere.
- No `Inter` font.
- No generic serif fonts (`Times New Roman`, `Georgia`, etc.).
- No neon/outer glow drop shadows.
- No oversaturated primary accents (saturation kept below 80%).
- No fake round numbers or fabricated data statistics.
- No default un-styled system cursors.
- No repeating-linear-gradient stripes.
- No marketing copy slop ("next-gen", "streamline", "leverage", "unleash").
