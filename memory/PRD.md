# LUMEI - Product Requirements Document

## Overview
LUMEI es una tienda Shopify premium para lámparas LED de amatista. El tema está diseñado con filosofía "dark-mode first", enfocado en identidad emocional: "La luz que eliges dice quién eres".

**Entregable Final**: Tema Shopify OS 2.0 en archivo `.zip` listo para importar.

---

## ✅ Implementado (Enero 2025)

### Estructura del Tema Shopify

**Layout:**
- `theme.liquid` - Layout principal con Google Fonts, CSS y metadatos

**Templates (JSON):**
| Template | Descripción |
|----------|-------------|
| `index.json` | Homepage |
| `product.json` | Página de producto |
| `collection.json` | Página de colección |
| `cart.json` | Carrito |
| `page.json` | Página por defecto |
| `page.faq.json` | FAQ (con bloques editables) |
| `page.concepto.json` | Concepto de marca |
| `page.politica-privacidad.json` | Política de privacidad |
| `page.politica-devoluciones.json` | Política de devoluciones |
| `page.terminos-condiciones.json` | Términos y condiciones |
| `404.json` | Error 404 |
| `customers/login.json` | Login |
| `customers/register.json` | Registro |
| `customers/account.json` | Cuenta |
| `customers/order.json` | Detalles de pedido |

**Secciones (Liquid):**
- Hero, Concepto, Variantes, Contexto, Testimonios, FAQ, Reassurance
- Header, Footer con grupos JSON
- Producto principal con carrito nativo
- Colección con grid de productos
- Páginas de cuenta completas

### Características Clave

✅ **100% Editable desde Theme Editor**
- Todos los textos son editables
- Secciones reordenables/ocultables
- Bloques dinámicos para FAQ, testimonios, contexto

✅ **Carrito y Checkout Nativos de Shopify**
- Formulario POST a `/cart/add`
- Input hidden con `variant.id`
- Sin checkout personalizado

✅ **Métodos de Pago Nativos**
- Usa `{{ shop.enabled_payment_types }}`
- Iconos generados con `payment_type_svg_tag`
- Sin SVGs personalizados

✅ **Productos Dinámicos**
- Usa objetos `{{ product }}`, `{{ variant }}`, `{{ collection }}`
- Sin datos hardcodeados de productos
- Funciona con cualquier producto de Shopify

✅ **Imágenes Incluidas en Assets**
- `lumei-product.png` - Imagen de producto placeholder
- `context-bedroom.jpg`, `context-desk.jpg`, `context-living.jpg` - Contextos

---

## 📥 Descarga

**URL**: https://lightvibe.preview.emergentagent.com/lumei-theme.zip

**Contenido del ZIP:**
- 54 archivos
- ~399 KB comprimido
- Incluye imágenes en `/assets`

---

## 📋 Post-Instalación en Shopify

### Paso 1: Importar Tema
1. Admin Shopify → Tienda online → Temas
2. "Añadir tema" → "Cargar archivo zip"
3. Seleccionar `lumei-theme.zip`

### Paso 2: Crear Productos
1. Ir a Productos → Añadir producto
2. Crear producto con variantes (ej: CALMA, ENFOQUE, PROFUNDO)
3. Opcional: Añadir metafield `custom.color` a cada variante para el color del glow

### Paso 3: Crear Páginas
Crear páginas con estos handles exactos:
- `faq` (plantilla: page.faq)
- `concepto` (plantilla: page.concepto)
- `politica-privacidad` (plantilla: page.politica-privacidad)
- `politica-devoluciones` (plantilla: page.politica-devoluciones)
- `terminos-condiciones` (plantilla: page.terminos-condiciones)

O alternativamente, usar las políticas nativas de Shopify en Configuración → Políticas.

### Paso 4: Configurar Navegación
- Editar menú principal con enlaces a páginas creadas
- El tema auto-detecta páginas y políticas de Shopify

### Paso 5: Personalizar
- Todo editable desde "Personalizar tema"
- Colores, tipografías, textos, imágenes

---

## 🔮 Mejoras Futuras (Backlog)

- [ ] Galería de producto con múltiples imágenes y zoom
- [ ] Integración con reviews nativos de Shopify
- [ ] Soporte multi-idioma
- [ ] Instagram feed section
- [ ] Newsletter con integración Klaviyo/Mailchimp

---

© 2025 LUMEI - Tema Shopify OS 2.0
