# LUMEI - Product Requirements Document

## Project Overview
LUMEI is a premium e-commerce storefront for amethyst ambient LED lamps. The brand positioning focuses on "identity through light" - customers choose which light represents them, not which product has better specs.

## Brand Identity
- **Brand Name**: LUMEI
- **Tagline**: "La luz que eliges dice quién eres." (The light you choose says who you are.)
- **Positioning**: Premium, minimal, emotional, identity-driven
- **Language**: Spanish (Spain)

## Design System

### Color Palette (Dark Mode First)
- **Background**: Deep black (`0 0% 4%`)
- **Foreground**: Soft white (`0 0% 92%`)
- **Card**: Slightly lighter (`0 0% 6%`)
- **Primary CTA**: Near white (`0 0% 95%`)
- **Accent**: Amethyst purple (`270 50% 55%`)

### Lamp Light Colors (Identity Variants)
- **CALMA** (Purple): `270 60% 60%` - For introspective personalities
- **ENFOQUE** (Blue): `200 80% 55%` - For focused personalities
- **PROFUNDO** (Amber): `35 90% 60%` - For warm personalities

### Typography
- **Display Font**: Cormorant Garamond (serif) - Headings
- **Body Font**: Inter (sans-serif) - Body text

## Site Structure

### Homepage Sections
1. **Hero Section**: Identity-based headline with product image and CTAs
2. **Concept Section**: "No todas las luces se sienten igual." - Emotional explanation
3. **Variants Section**: Interactive variant selector with identity descriptions
4. **Context Section**: Lifestyle images (desk, bedside, shelf)
5. **Testimonials Section**: Carousel with customer quotes
6. **FAQ Section**: Minimal accordion with essential questions
7. **Footer**: Navigation, contact, legal links

### Product Page
- Variant-first approach (variant name as hero)
- Emotional description above the fold
- Color selector with 3 variants
- Add to cart with toast notification
- Collapsible specs/shipping/care sections

## Technical Implementation

### Tech Stack
- React.js with React Router
- Tailwind CSS for styling
- Shadcn/UI components
- Sonner for toast notifications

### Key Components
- `/pages/HomePage.jsx` - Main landing page
- `/pages/ProductPage.jsx` - Product detail page with variant routing
- `/components/layout/Header.jsx` - Navigation header
- `/components/layout/Footer.jsx` - Site footer
- `/components/sections/*` - Homepage sections

### Routes
- `/` - Homepage
- `/producto` - Product page (defaults to CALMA)
- `/producto/:variant` - Variant-specific product page (calma, enfoque, profundo)

## Features

### Implemented ✅
- Dark mode first design
- Responsive layout (mobile-first)
- Interactive variant selector with color-changing glow effects
- Add to cart functionality with toast notifications
- FAQ accordion
- Testimonials carousel
- Smooth scroll navigation
- Animation effects (fade-in, float, pulse glow)

### Mock Data (Frontend Prototype)
- Cart functionality (counter only, no backend)
- Testimonials (static data)
- FAQ content (static data)
- Product variants (static data)

## Compliance
- WCAG AA color contrast ratios
- Semantic HTML structure
- Accessible navigation
- Focus states for interactive elements

## Notes
- This is a **frontend prototype** with mock functionality
- No backend integration - cart and checkout are simulated
- Product images use the user-provided amethyst lamp image
- Context images sourced from Pexels (royalty-free)
