# Design System — eu.patagonia.com (current state)

> Descriptive snapshot extracted 2026-05-22 via stardust:extract.
> Source: `_brand-extraction.json`.

## Colors

| Role             | Hex       | Usage                                          |
|------------------|-----------|------------------------------------------------|
| text             | `#000000` | Primary text (2653 elements, dominant)         |
| background       | `#FFFFFF` | Page and card backgrounds                      |
| surface-muted    | `#F5F5F5` | Light grey sections, secondary surfaces        |
| brand-teal       | `#27455C` | Navigation accents, dark UI elements           |
| surface-dark     | `#333333` | Dark section backgrounds                       |
| brand-green      | `#466254` | Activism/environmental elements                |
| brand-terracotta | `#B46E58` | Accent, earthy warmth                          |
| surface-warm     | `#F5F0E0` | Warm cream sections, newsletter area           |
| muted-text       | `#555555` | Secondary text, captions                       |

**Palette character:** High-contrast black-on-white foundation with earthy accent colors pulled from natural landscapes (teal, green, terracotta). No bright primaries — brand avoids neon or saturated consumer retail palette.

## Typography

### Families
- **Ridgeway Sans** — proprietary brand typeface used for all headings AND body text. A clean, slightly condensed sans-serif with strong outdoor brand identity.
- **Copernicus (Galaxie Copernicus Book)** — serif used for editorial/story body text. Adds warmth to long-form narrative content.
- **patagonia-icons** — embedded icon font for UI icons.

### Type Scale
| Level  | Size   | Weight | Line-height | Letter-spacing |
|--------|--------|--------|-------------|----------------|
| H2     | 48px   | 500    | 52.8px      | -0.96px        |
| H3     | 40px   | 500    | 44px        | -0.8px         |
| H4/UI  | 14px   | 500    | 21px        | normal         |
| Body   | 16px   | 400    | 1.5         | normal         |
| Small  | 12px   | 300    | auto        | normal         |

**Scale audit:** `ad-hoc` — H2→H3 is ~1.2x ratio, not a strict modular scale. H1 sizes vary by hero context (large display treatment).

### Type character
Headings use tight negative letter-spacing (−0.02em) giving a confident, condensed feel. Single weight (500/medium) for headings — no heavy bold treatment. Body text is light-to-regular weight.

## Spacing & Layout

- **Section padding:** ~60–80px vertical, 24–48px horizontal
- **Grid:** Standard responsive grid, product cards in 3–4 column layouts
- **Max-width:** ~1440px for full-width hero images

## Border Radius & Shape

| Context       | Radius | Notes                                |
|---------------|--------|--------------------------------------|
| Default/Cards | 0px    | Signature square corners — utilitarian outdoor aesthetic |
| Pill buttons  | 30px   | Used for activist/campaign CTAs ("Add Your Voice") |
| Cards         | 8px    | Product card images                  |
| Badges        | 17px   | Tag/badge elements                   |
| Avatars       | 50%    | Circle elements                      |

**Signature motif:** Square/sharp corners (0px) dominate, reflecting utilitarian, no-frills outdoor gear ethos.

## Shadows

None detected — site uses flat design, relies on color contrast rather than elevation shadows.

## Components (as-found)

- **Hero banner:** Full-width image with headline overlay, "Explore the Collection" / "Shop" CTA
- **Product card:** Image + name + price, hover state, no visible card border
- **Activist banner:** Dark/colored background section with campaign headline and action CTA
- **Navigation drawer:** Expandable mega-menus for Activism/Stories/More (secondary nav)
- **Promo strip:** Top-of-page banner for shipping/returns info
- **Newsletter signup:** Email capture with consent text, footer placement
- **Worn Wear tiles:** Icon + label navigation tiles (Start a Repair, DIY Guides, etc.)
- **Ironclad Guarantee callout:** Standalone brand promise section
- **Stories grid:** Editorial article cards with image + headline layout

## System Components (cross-page)

- Site header with logo, primary and secondary navigation, search/wishlist/cart icons
- Site footer with newsletter signup, help links, legal, social
- Top promo banner ("Free Delivery On Orders Over £90")
- Activism secondary navigation with expandable drawers
