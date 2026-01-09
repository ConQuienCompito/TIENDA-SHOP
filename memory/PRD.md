# LUMEI - Product Requirements Document

## Overview
LUMEI es una tienda Shopify premium para lámparas LED de cristal de amatista. Tema dark-mode, minimalista y emocional.

**Entregable**: Tema Shopify OS 2.0 completamente funcional.

---

## ✅ Implementación Completada (Enero 2025)

### Estructura del Tema

**Layout:**
- `theme.liquid` - Layout principal con Google Fonts (Cormorant Garamond + Inter)

**Templates JSON:**
- `index.json` - Homepage
- `product.json` - Página de producto **FUNCIONAL con carrito AJAX**
- `collection.json` - Colección **FUNCIONAL con grid de productos**
- `cart.json` - Carrito
- `page.json`, `page.faq.json`, `page.concepto.json`, etc.
- `404.json`
- `customers/*` - Login, registro, cuenta, pedidos

**Secciones Principales:**
- `main-product.liquid` - Página de producto completa con:
  - Galería de imágenes con thumbnails
  - Selector de variantes con cambio AJAX
  - Botón "Añadir al carrito" con AJAX
  - Iconos de pago nativos de Shopify
  - Beneficios y garantías
  - Reviews placeholder
  
- `main-collection.liquid` - Colección con:
  - Grid de productos responsive
  - Cards con hover effects y glow
  - Precios y badges de descuento
  - Paginación

- `cart-drawer.liquid` - Carrito lateral con:
  - Barra de progreso envío gratis
  - Cambio de cantidad AJAX
  - Eliminación de productos AJAX
  - Botón checkout

- `header.liquid` - Header con:
  - Logo y navegación
  - Contador de carrito
  - Botón para abrir cart-drawer
  - Menú móvil

### Características Clave

✅ **Carrito AJAX funcional** - Sin recargas de página
✅ **Métodos de pago nativos** - `{{ shop.enabled_payment_types }}`
✅ **Productos dinámicos** - `{{ product }}`, `{{ collection }}`
✅ **100% editable** desde Theme Editor
✅ **Dark mode premium** con efectos glow
✅ **Responsive** - Móvil, tablet, escritorio

---

## 📥 Descarga

**URL**: https://lightvibe.preview.emergentagent.com/lumei-theme.zip

**Contenido:**
- 53 archivos
- ~400KB comprimido
- Imágenes incluidas en `/assets`

---

## 📋 Post-Instalación

1. **Subir tema** a Shopify Admin → Temas → Cargar ZIP
2. **Crear productos** con variantes (CALMA, ENFOQUE, PROFUNDO)
3. **Crear páginas** (FAQ, Concepto, Políticas)
4. **Configurar menú** de navegación
5. **Personalizar** desde Theme Editor

---

## 🔮 Pendiente / Backlog

- [ ] Sistema de reviews real (integración con app)
- [ ] Galería con zoom
- [ ] Multi-idioma
- [ ] Newsletter integration

---

© 2025 LUMEI - Shopify OS 2.0
