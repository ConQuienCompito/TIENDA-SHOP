# LUMEI - Product Requirements Document

## Project Overview
LUMEI is a premium e-commerce storefront for amethyst ambient LED lamps. The brand positioning focuses on "identity through light" - customers choose which light represents them, not which product has better specs.

**Deliverable**: Shopify Theme (OS 2.0 compatible)

## Brand Identity
- **Brand Name**: LUMEI
- **Tagline**: "La luz que eliges dice quién eres." (The light you choose says who you are.)
- **Positioning**: Premium, minimal, emotional, identity-driven
- **Language**: Spanish (Spain)

## Design System

### Color Palette (Dark Mode First)
- **Background**: Deep black (`#0a0a0a`)
- **Card**: Slightly lighter (`#0f0f0f`)
- **Foreground**: Soft white (`#ebebeb`)
- **Muted**: Gray (`#808080`)
- **Accent**: Amethyst purple (`#9966cc`)

### Lamp Light Colors (Identity Variants)
- **CALMA** (Purple): `#9966cc` - For introspective personalities
- **ENFOQUE** (Blue): `#33aaff` - For focused personalities
- **PROFUNDO** (Amber): `#f5a623` - For warm personalities

### Typography
- **Display Font**: Cormorant Garamond (serif) - Headings
- **Body Font**: Inter (sans-serif) - Body text

---

## ✅ Completed Implementation (January 2025)

### Shopify Theme Structure

#### Templates Created:
- `index.json` - Homepage
- `product.json` - Product page
- `collection.json` - Collection page
- `cart.json` - Cart page
- `page.json` - Default page
- `page.faq.json` - FAQ page
- `page.concepto.json` - Concept page
- `page.politica-privacidad.json` - Privacy policy
- `page.politica-devoluciones.json` - Returns policy
- `page.terminos-condiciones.json` - Terms & conditions
- `404.json` - 404 error page
- `customers/login.json` - Login page
- `customers/register.json` - Register page
- `customers/account.json` - Account page
- `customers/order.json` - Order details page

#### Sections Created:
- `hero-section.liquid` - Identity-based hero with product image
- `concept-section.liquid` - Emotional concept explanation
- `variants-section.liquid` - Interactive variant selector
- `context-section.liquid` - Lifestyle context images
- `testimonials-section.liquid` - Customer testimonials carousel
- `faq-section.liquid` - Accordion FAQ
- `reassurance-section.liquid` - Trust indicators (shipping, returns, security, warranty)
- `main-product.liquid` - Product page with variant picker and trust elements
- `main-collection.liquid` - Product grid
- `main-cart.liquid` - Shopping cart
- `main-page.liquid` - Default page content
- `page-faq.liquid` - Full FAQ page with categories
- `page-concepto.liquid` - Brand concept page
- `page-politica.liquid` - Policy pages (privacy, terms, refunds)
- `main-login.liquid` - Customer login
- `main-register.liquid` - Customer registration
- `main-account.liquid` - Customer account dashboard
- `main-order.liquid` - Order details view
- `main-404.liquid` - 404 error page
- `header.liquid` - Navigation header
- `footer.liquid` - Site footer with trust bar

#### Snippets Created:
- `payment-icons.liquid` - All payment method icons (Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, Shop Pay, Klarna, Bizum, UnionPay)
- `product-card.liquid` - Product card component
- `meta-tags.liquid` - SEO meta tags
- `icon.liquid` - Icon SVGs

#### Assets:
- `lumei-base.css` - Base styles and CSS variables
- `lumei-components.css` - Button and component styles
- `lumei-scripts.js` - Interactive functionality (cart, toasts)
- `lumei-product.png` - Product image placeholder

#### Configuration:
- `settings_schema.json` - Theme settings (colors, typography, social)
- `settings_data.json` - Default settings values
- `es.default.json` - Spanish translations

### Trust & Reassurance Elements ✅
- Hero Section trust indicators (free shipping, 30-day returns, secure payment)
- Reassurance Section with 4 trust icons between sections
- Product page trust grid (shipping, returns, warranty)
- Payment method icons on product page and footer
- Guarantee messages
- "Included in your order" checklist

### Payment Methods ✅
All icons implemented: Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, Shop Pay, Klarna, Bizum, UnionPay

### Shopify OS 2.0 Features ✅
- All sections have `{% schema %}` with editable settings
- JSON templates for all page types
- Blocks support for dynamic content
- Full theme customizer compatibility
- No hardcoded content - everything editable

---

## 📋 User Instructions (Post-Upload)

After uploading the theme to Shopify:

1. **Create Products**: Add LUMEI products with variants (CALMA, ENFOQUE, PROFUNDO)
2. **Create Pages**: Create pages with handles: `faq`, `concepto`, `politica-privacidad`, `terminos-condiciones`, `politica-devoluciones`
3. **Configure Navigation**: Set up main menu links
4. **Upload Images**: Replace placeholder with actual product photos
5. **Configure Payments**: Set up Shopify Payments with desired methods

---

## 📥 Theme Download

**URL**: `https://lightvibe.preview.emergentagent.com/lumei-theme.zip`

**Contents**:
- 51 files
- ~280 KB compressed
- Ready for Shopify upload

---

## 🔮 Future Enhancements (Backlog)

- [ ] Advanced product gallery with multiple angles/zoom
- [ ] Color picker integration with product variants
- [ ] Animated scroll effects
- [ ] Newsletter signup integration
- [ ] Instagram feed section
- [ ] Reviews/ratings integration
- [ ] Multi-language support

---

© 2025 LUMEI - Theme developed for Shopify OS 2.0
