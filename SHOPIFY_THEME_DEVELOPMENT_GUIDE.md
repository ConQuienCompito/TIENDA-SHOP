# 📚 Guía Completa: Desarrollo de Temas Shopify OS 2.0

> Documentación exhaustiva para crear temas Shopify premium, funcionales y 100% editables desde el Theme Editor.

---

## 📑 Índice

1. [Introducción a Shopify OS 2.0](#1-introducción-a-shopify-os-20)
2. [Estructura de Archivos Obligatoria](#2-estructura-de-archivos-obligatoria)
3. [El Archivo Layout: theme.liquid](#3-el-archivo-layout-themeliquid)
4. [Sistema de Templates JSON](#4-sistema-de-templates-json)
5. [Desarrollo de Secciones (Sections)](#5-desarrollo-de-secciones-sections)
6. [Schemas: La Clave de la Editabilidad](#6-schemas-la-clave-de-la-editabilidad)
7. [Liquid: El Lenguaje de Plantillas](#7-liquid-el-lenguaje-de-plantillas)
8. [Sistema de Diseño CSS](#8-sistema-de-diseño-css)
9. [JavaScript en Temas Shopify](#9-javascript-en-temas-shopify)
10. [Configuración Global (config/)](#10-configuración-global-config)
11. [Locales e Internacionalización](#11-locales-e-internacionalización)
12. [Assets: Imágenes, CSS y JS](#12-assets-imágenes-css-y-js)
13. [Snippets: Código Reutilizable](#13-snippets-código-reutilizable)
14. [Páginas Esenciales del Tema](#14-páginas-esenciales-del-tema)
15. [Objetos Liquid de Shopify](#15-objetos-liquid-de-shopify)
16. [Filtros Liquid Esenciales](#16-filtros-liquid-esenciales)
17. [Rutas y URLs en Shopify](#17-rutas-y-urls-en-shopify)
18. [Manejo del Carrito](#18-manejo-del-carrito)
19. [Productos y Variantes](#19-productos-y-variantes)
20. [Colecciones](#20-colecciones)
21. [Checkout y Pagos](#21-checkout-y-pagos)
22. [SEO y Metadatos](#22-seo-y-metadatos)
23. [Responsive Design](#23-responsive-design)
24. [Accesibilidad (a11y)](#24-accesibilidad-a11y)
25. [Performance y Optimización](#25-performance-y-optimización)
26. [Errores Comunes y Soluciones](#26-errores-comunes-y-soluciones)
27. [Checklist de Compatibilidad](#27-checklist-de-compatibilidad)
28. [Proceso de Desarrollo Paso a Paso](#28-proceso-de-desarrollo-paso-a-paso)
29. [Debugging y Testing](#29-debugging-y-testing)
30. [Deployment y Publicación](#30-deployment-y-publicación)

---

## 1. Introducción a Shopify OS 2.0

### ¿Qué es Shopify OS 2.0?
Shopify Online Store 2.0 es la arquitectura moderna de temas que permite:
- **Secciones en todas las páginas** (no solo homepage)
- **Templates JSON** en lugar de Liquid
- **App Blocks** para integrar apps en secciones
- **Metafields** accesibles desde el tema

### Diferencias con OS 1.0
| Característica | OS 1.0 | OS 2.0 |
|---------------|--------|--------|
| Secciones en homepage | ✅ | ✅ |
| Secciones en otras páginas | ❌ | ✅ |
| Templates | `.liquid` | `.json` |
| App Blocks | ❌ | ✅ |
| Metafields en tema | Limitado | ✅ Completo |

### Requisitos Mínimos
- Conocimiento de HTML/CSS
- Comprensión básica de Liquid
- Familiaridad con JSON
- Editor de código (VS Code recomendado)

---

## 2. Estructura de Archivos Obligatoria

```
tu-tema/
├── assets/                    # CSS, JS, imágenes, fuentes
│   ├── base.css              # Estilos principales
│   ├── base.js               # JavaScript principal
│   └── *.png, *.svg, etc.    # Imágenes del tema
│
├── config/                    # Configuración global
│   ├── settings_schema.json  # Define ajustes del tema
│   └── settings_data.json    # Valores de los ajustes
│
├── layout/                    # Layouts (plantillas base)
│   ├── theme.liquid          # Layout principal (OBLIGATORIO)
│   └── password.liquid       # Layout para página de contraseña
│
├── locales/                   # Traducciones
│   ├── en.default.json       # Inglés (o tu idioma por defecto)
│   └── es.json               # Español
│
├── sections/                  # Secciones (bloques de contenido)
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── main-product.liquid
│   └── ...
│
├── snippets/                  # Fragmentos reutilizables
│   ├── icon-cart.liquid
│   ├── product-card.liquid
│   └── ...
│
└── templates/                 # Templates de páginas
    ├── index.json            # Homepage
    ├── product.json          # Página de producto
    ├── collection.json       # Página de colección
    ├── cart.json             # Carrito
    ├── page.json             # Páginas estáticas
    ├── blog.json             # Blog
    ├── article.json          # Artículo de blog
    ├── 404.json              # Página no encontrada
    ├── search.json           # Resultados de búsqueda
    ├── list-collections.json # Lista de colecciones
    ├── gift_card.liquid      # Tarjeta regalo (debe ser .liquid)
    └── customers/            # Páginas de cuenta
        ├── account.json
        ├── login.json
        ├── register.json
        ├── addresses.json
        ├── order.json
        ├── activate_account.json
        └── reset_password.json
```

### Archivos Absolutamente Obligatorios
1. `layout/theme.liquid` - Sin esto, el tema no funciona
2. `config/settings_schema.json` - Puede estar vacío `[]` pero debe existir
3. `config/settings_data.json` - Define la estructura inicial
4. `templates/index.json` - Homepage
5. `templates/product.json` - Página de producto

---

## 3. El Archivo Layout: theme.liquid

Este es el esqueleto de tu tema. TODAS las páginas lo usan.

### Estructura Mínima Obligatoria

```liquid
<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, height=device-height, minimum-scale=1.0">
  
  <title>
    {{ page_title }}
    {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
    {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
  </title>

  {%- if page_description -%}
    <meta name="description" content="{{ page_description | escape }}">
  {%- endif -%}

  <link rel="canonical" href="{{ canonical_url }}">

  {%- if settings.favicon != blank -%}
    <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
  {%- endif -%}

  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>

  {%- unless settings.type_header_font.system? and settings.type_body_font.system? -%}
    <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
  {%- endunless -%}

  <!-- CSS -->
  {{ 'base.css' | asset_url | stylesheet_tag }}

  <!-- Liquid head content -->
  {{ content_for_header }}
</head>

<body class="template-{{ template.name }}">
  <a class="skip-link" href="#main-content">
    {{ 'general.accessibility.skip_to_content' | t }}
  </a>

  {%- sections 'header-group' -%}
  
  <main id="main-content" class="main-content" role="main">
    {{ content_for_layout }}
  </main>

  {%- sections 'footer-group' -%}

  <!-- JavaScript -->
  {{ 'base.js' | asset_url | script_tag }}
</body>
</html>
```

### Elementos Críticos Explicados

| Elemento | Propósito | ¿Obligatorio? |
|----------|-----------|---------------|
| `{{ content_for_header }}` | Inyecta scripts de Shopify, apps, analytics | ✅ SÍ |
| `{{ content_for_layout }}` | Renderiza el contenido de la página | ✅ SÍ |
| `{{ page_title }}` | Título de la página actual | ✅ SÍ |
| `lang="{{ request.locale.iso_code }}"` | Idioma para SEO y accesibilidad | ✅ SÍ |
| `<meta name="viewport">` | Responsive design | ✅ SÍ |
| `{%- sections 'header-group' -%}` | Grupo de secciones para header | Recomendado |

---

## 4. Sistema de Templates JSON

### ¿Por qué JSON en lugar de Liquid?

Los templates `.json` permiten:
- Reordenar secciones desde el editor
- Añadir/quitar secciones sin código
- Guardar configuraciones por template

### Estructura de un Template JSON

```json
{
  "sections": {
    "identificador-unico": {
      "type": "nombre-de-la-seccion",
      "settings": {
        "setting_id": "valor"
      },
      "blocks": {
        "bloque-1": {
          "type": "tipo-de-bloque",
          "settings": {
            "block_setting_id": "valor"
          }
        }
      },
      "block_order": ["bloque-1"]
    }
  },
  "order": ["identificador-unico"]
}
```

### Ejemplo Real: index.json (Homepage)

```json
{
  "sections": {
    "hero": {
      "type": "hero",
      "settings": {
        "title": "Bienvenido a nuestra tienda",
        "button_text": "Comprar ahora",
        "button_link": "shopify://collections/all"
      }
    },
    "featured-collection": {
      "type": "featured-collection",
      "settings": {
        "collection": "nuevos-productos",
        "products_to_show": 4
      }
    },
    "testimonials": {
      "type": "testimonials",
      "blocks": {
        "testimonial-1": {
          "type": "testimonial",
          "settings": {
            "quote": "Excelente producto",
            "author": "Juan García"
          }
        }
      },
      "block_order": ["testimonial-1"]
    }
  },
  "order": ["hero", "featured-collection", "testimonials"]
}
```

### Ejemplo: product.json

```json
{
  "sections": {
    "main": {
      "type": "main-product",
      "settings": {}
    },
    "related": {
      "type": "related-products",
      "settings": {
        "heading": "También te puede interesar"
      }
    }
  },
  "order": ["main", "related"]
}
```

### Reglas Importantes

1. **Los IDs deben ser únicos** dentro del template
2. **El `type` debe coincidir** con el nombre del archivo `.liquid` en `/sections/`
3. **`block_order`** define el orden de los bloques
4. **`order`** define el orden de las secciones
5. **Los enlaces internos** usan formato `shopify://collections/nombre` o `shopify://products/handle`

---

## 5. Desarrollo de Secciones (Sections)

Las secciones son los bloques de construcción del tema.

### Anatomía de una Sección

```liquid
<!-- 1. CONTENIDO HTML -->
<section class="mi-seccion" data-section-id="{{ section.id }}">
  <div class="contenedor">
    <h2>{{ section.settings.titulo }}</h2>
    <p>{{ section.settings.descripcion }}</p>
    
    {%- for block in section.blocks -%}
      <div class="bloque" {{ block.shopify_attributes }}>
        {{ block.settings.contenido }}
      </div>
    {%- endfor -%}
  </div>
</section>

<!-- 2. ESTILOS CSS (opcional, puede ir en assets/base.css) -->
<style>
.mi-seccion {
  padding: 60px 0;
}
</style>

<!-- 3. JAVASCRIPT (opcional) -->
<script>
// Código JS específico de esta sección
</script>

<!-- 4. SCHEMA (OBLIGATORIO) -->
{% schema %}
{
  "name": "Nombre en el Editor",
  "settings": [...],
  "blocks": [...],
  "presets": [...]
}
{% endschema %}
```

### El atributo `{{ block.shopify_attributes }}`

**SIEMPRE** añádelo a los elementos de bloque. Permite:
- Seleccionar el bloque en el editor
- Animaciones de hover en el editor
- Funcionalidad de drag & drop

```liquid
{%- for block in section.blocks -%}
  <div {{ block.shopify_attributes }}>
    <!-- contenido del bloque -->
  </div>
{%- endfor -%}
```

---

## 6. Schemas: La Clave de la Editabilidad

El schema define qué puede editar el usuario en el Theme Editor.

### Estructura Completa del Schema

```json
{% schema %}
{
  "name": "Nombre visible en editor",
  "tag": "section",
  "class": "clase-css-opcional",
  "limit": 1,
  "settings": [
    // Ajustes de la sección
  ],
  "blocks": [
    // Tipos de bloques permitidos
  ],
  "max_blocks": 10,
  "presets": [
    // Configuraciones predefinidas
  ],
  "default": {
    // Valores por defecto
  },
  "locales": {
    // Traducciones del schema
  },
  "enabled_on": {
    // Dónde puede usarse
  },
  "disabled_on": {
    // Dónde NO puede usarse
  }
}
{% endschema %}
```

### Tipos de Settings Disponibles

#### Texto Simple
```json
{
  "type": "text",
  "id": "titulo",
  "label": "Título",
  "default": "Texto por defecto",
  "placeholder": "Escribe aquí..."
}
```

#### Texto Multilínea
```json
{
  "type": "textarea",
  "id": "descripcion",
  "label": "Descripción",
  "default": "Descripción por defecto"
}
```

#### Editor de Texto Enriquecido (HTML)
```json
{
  "type": "richtext",
  "id": "contenido",
  "label": "Contenido",
  "default": "<p>Texto con <strong>formato</strong></p>"
}
```

#### Selector de Imagen
```json
{
  "type": "image_picker",
  "id": "imagen",
  "label": "Imagen"
}
```

#### Selector de URL/Enlace
```json
{
  "type": "url",
  "id": "enlace",
  "label": "Enlace"
}
```

#### Selector de Color
```json
{
  "type": "color",
  "id": "color_fondo",
  "label": "Color de fondo",
  "default": "#ffffff"
}
```

#### Selector de Colección
```json
{
  "type": "collection",
  "id": "coleccion",
  "label": "Colección"
}
```

#### Selector de Producto
```json
{
  "type": "product",
  "id": "producto",
  "label": "Producto"
}
```

#### Checkbox
```json
{
  "type": "checkbox",
  "id": "mostrar_precio",
  "label": "Mostrar precio",
  "default": true
}
```

#### Número
```json
{
  "type": "number",
  "id": "cantidad",
  "label": "Cantidad",
  "default": 4
}
```

#### Rango (Slider)
```json
{
  "type": "range",
  "id": "opacidad",
  "label": "Opacidad",
  "min": 0,
  "max": 100,
  "step": 5,
  "unit": "%",
  "default": 100
}
```

#### Select (Dropdown)
```json
{
  "type": "select",
  "id": "alineacion",
  "label": "Alineación",
  "options": [
    { "value": "left", "label": "Izquierda" },
    { "value": "center", "label": "Centro" },
    { "value": "right", "label": "Derecha" }
  ],
  "default": "center"
}
```

#### Radio Buttons
```json
{
  "type": "radio",
  "id": "tamaño",
  "label": "Tamaño",
  "options": [
    { "value": "small", "label": "Pequeño" },
    { "value": "medium", "label": "Mediano" },
    { "value": "large", "label": "Grande" }
  ],
  "default": "medium"
}
```

#### Selector de Video
```json
{
  "type": "video_url",
  "id": "video",
  "label": "Video de YouTube o Vimeo",
  "accept": ["youtube", "vimeo"]
}
```

#### Selector de Fuente
```json
{
  "type": "font_picker",
  "id": "fuente_titulos",
  "label": "Fuente de títulos",
  "default": "helvetica_n4"
}
```

#### HTML Personalizado
```json
{
  "type": "html",
  "id": "codigo_personalizado",
  "label": "HTML personalizado"
}
```

#### Liquid Personalizado
```json
{
  "type": "liquid",
  "id": "codigo_liquid",
  "label": "Código Liquid"
}
```

#### Encabezado (Organizador)
```json
{
  "type": "header",
  "content": "Configuración de diseño"
}
```

#### Párrafo Informativo
```json
{
  "type": "paragraph",
  "content": "Este texto aparece como información en el editor."
}
```

### Definición de Bloques

```json
{
  "blocks": [
    {
      "type": "testimonio",
      "name": "Testimonio",
      "limit": 5,
      "settings": [
        {
          "type": "textarea",
          "id": "cita",
          "label": "Cita"
        },
        {
          "type": "text",
          "id": "autor",
          "label": "Autor"
        },
        {
          "type": "image_picker",
          "id": "foto",
          "label": "Foto del autor"
        }
      ]
    },
    {
      "type": "estadistica",
      "name": "Estadística",
      "settings": [
        {
          "type": "text",
          "id": "numero",
          "label": "Número"
        },
        {
          "type": "text",
          "id": "etiqueta",
          "label": "Etiqueta"
        }
      ]
    }
  ]
}
```

### Presets: Secciones Añadibles

Para que una sección aparezca en "Añadir sección":

```json
{
  "presets": [
    {
      "name": "Testimonios",
      "blocks": [
        {
          "type": "testimonio",
          "settings": {
            "cita": "Excelente producto",
            "autor": "Cliente satisfecho"
          }
        }
      ]
    }
  ]
}
```

**IMPORTANTE:** Las secciones sin `presets` no aparecen en "Añadir sección". Úsalas para:
- `main-product.liquid` (solo en product.json)
- `main-collection.liquid` (solo en collection.json)
- `header.liquid` (en section groups)

### Restringir Dónde Puede Usarse

```json
{
  "enabled_on": {
    "templates": ["product", "collection"],
    "groups": ["header", "footer"]
  }
}
```

O excluir:

```json
{
  "disabled_on": {
    "templates": ["password"],
    "groups": ["header"]
  }
}
```

---

## 7. Liquid: El Lenguaje de Plantillas

### Sintaxis Básica

```liquid
<!-- Output (imprime valor) -->
{{ variable }}

<!-- Tags (lógica) -->
{% if condicion %}
  contenido
{% endif %}

<!-- Filtros (transforman valores) -->
{{ "texto" | upcase }}
```

### Control de Espacios en Blanco

```liquid
{%- sin_espacios_antes -%}
{{- sin_espacios_alrededor -}}
```

Usa `{%-` y `-%}` para eliminar saltos de línea innecesarios en el HTML.

### Estructuras de Control

#### If / Elsif / Else
```liquid
{% if product.available %}
  <span>En stock</span>
{% elsif product.inventory_quantity > 0 %}
  <span>Últimas unidades</span>
{% else %}
  <span>Agotado</span>
{% endif %}
```

#### Unless (negación)
```liquid
{% unless product.available %}
  <span>No disponible</span>
{% endunless %}
```

#### Case / When
```liquid
{% case product.type %}
  {% when 'Camiseta' %}
    <span>Ropa</span>
  {% when 'Taza' %}
    <span>Accesorios</span>
  {% else %}
    <span>Otros</span>
{% endcase %}
```

#### For Loop
```liquid
{% for product in collection.products limit: 4 %}
  <div class="producto">
    {{ product.title }}
  </div>
{% endfor %}
```

#### For Loop con Variables Especiales
```liquid
{% for item in array %}
  {% if forloop.first %}Primera iteración{% endif %}
  {% if forloop.last %}Última iteración{% endif %}
  {{ forloop.index }}    <!-- 1, 2, 3... -->
  {{ forloop.index0 }}   <!-- 0, 1, 2... -->
  {{ forloop.length }}   <!-- Total de items -->
{% endfor %}
```

#### For con Else (array vacío)
```liquid
{% for product in collection.products %}
  {{ product.title }}
{% else %}
  No hay productos
{% endfor %}
```

#### Paginate
```liquid
{% paginate collection.products by 12 %}
  {% for product in collection.products %}
    {{ product.title }}
  {% endfor %}
  
  {{ paginate | default_pagination }}
{% endpaginate %}
```

### Asignación de Variables

```liquid
{% assign mi_variable = "valor" %}
{% assign precio_con_descuento = product.price | times: 0.9 %}

{% capture mi_html %}
  <div>Contenido complejo</div>
{% endcapture %}

{{ mi_html }}
```

### Incluir Snippets

```liquid
{% render 'nombre-snippet' %}

<!-- Con variables -->
{% render 'product-card', product: product, show_price: true %}
```

### Incluir Secciones (solo en layout)

```liquid
{% section 'header' %}
{% sections 'header-group' %}
```

---

## 8. Sistema de Diseño CSS

### Variables CSS (Custom Properties)

```css
:root {
  /* Colores */
  --color-primary: #9370DB;
  --color-secondary: #33AAFF;
  --color-background: #0a0a0a;
  --color-foreground: #ebebeb;
  --color-muted: #808080;
  --color-border: rgba(255, 255, 255, 0.1);
  
  /* Tipografía */
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  
  /* Espaciado */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* Transiciones */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Z-index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 300;
  --z-tooltip: 400;
}
```

### Reset CSS Mínimo

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: var(--font-size-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  line-height: var(--line-height-base);
  color: var(--color-foreground);
  background: var(--color-background);
}

img, video {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
}

ul, ol {
  list-style: none;
}

input, textarea, select {
  font: inherit;
}
```

### Clases de Utilidad

```css
/* Layout */
.page-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Botones */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md) var(--space-xl);
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.btn--primary {
  background: var(--color-foreground);
  color: var(--color-background);
}

.btn--secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
}

/* Visibilidad responsive */
@media (max-width: 767px) {
  .hide-mobile { display: none !important; }
}

@media (min-width: 768px) {
  .hide-desktop { display: none !important; }
}
```

---

## 9. JavaScript en Temas Shopify

### Estructura Recomendada

```javascript
// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initCartDrawer();
  initProductGallery();
});

// Funciones modulares
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', function() {
    menu.classList.toggle('is-open');
  });
}
```

### APIs de Shopify en JavaScript

#### Cart API (Añadir al carrito)

```javascript
// Añadir producto
async function addToCart(variantId, quantity = 1) {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantity
    })
  });
  
  return response.json();
}

// Obtener carrito
async function getCart() {
  const response = await fetch('/cart.js');
  return response.json();
}

// Actualizar cantidad
async function updateCart(updates) {
  const response = await fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates })
  });
  
  return response.json();
}

// Eliminar item
async function removeFromCart(key) {
  return updateCart({ [key]: 0 });
}
```

#### Cambiar variante de producto

```javascript
const productForm = document.querySelector('[data-product-form]');
const variantSelects = productForm.querySelectorAll('select');

variantSelects.forEach(select => {
  select.addEventListener('change', function() {
    const selectedOptions = [];
    variantSelects.forEach(s => selectedOptions.push(s.value));
    
    // Encontrar variante que coincida
    const variant = productVariants.find(v => {
      return v.options.every((opt, i) => opt === selectedOptions[i]);
    });
    
    if (variant) {
      updatePrice(variant);
      updateAddToCartButton(variant);
    }
  });
});
```

---

## 10. Configuración Global (config/)

### settings_schema.json

Define los ajustes globales del tema (Logo, colores, fuentes, etc.)

```json
[
  {
    "name": "theme_info",
    "theme_name": "Mi Tema",
    "theme_version": "1.0.0",
    "theme_author": "Tu Nombre",
    "theme_documentation_url": "https://tu-documentacion.com",
    "theme_support_url": "https://tu-soporte.com"
  },
  {
    "name": "Logo",
    "settings": [
      {
        "type": "image_picker",
        "id": "logo",
        "label": "Logo"
      },
      {
        "type": "range",
        "id": "logo_width",
        "label": "Ancho del logo",
        "min": 50,
        "max": 300,
        "step": 10,
        "default": 150,
        "unit": "px"
      }
    ]
  },
  {
    "name": "Colores",
    "settings": [
      {
        "type": "color",
        "id": "color_primary",
        "label": "Color primario",
        "default": "#000000"
      },
      {
        "type": "color",
        "id": "color_secondary",
        "label": "Color secundario",
        "default": "#ffffff"
      }
    ]
  },
  {
    "name": "Tipografía",
    "settings": [
      {
        "type": "font_picker",
        "id": "type_header_font",
        "label": "Fuente de encabezados",
        "default": "helvetica_n4"
      },
      {
        "type": "font_picker",
        "id": "type_body_font",
        "label": "Fuente de cuerpo",
        "default": "helvetica_n4"
      }
    ]
  },
  {
    "name": "Social media",
    "settings": [
      {
        "type": "text",
        "id": "social_instagram_link",
        "label": "Instagram"
      },
      {
        "type": "text",
        "id": "social_facebook_link",
        "label": "Facebook"
      }
    ]
  }
]
```

**Nota:** Para temas simples, puedes dejar `settings_schema.json` vacío (`[]`) y manejar todo con CSS.

### settings_data.json

Guarda los valores de configuración:

```json
{
  "current": {
    "color_primary": "#9370DB",
    "logo_width": 150,
    "sections": {
      "header": {
        "type": "header",
        "settings": {}
      },
      "footer": {
        "type": "footer",
        "settings": {}
      }
    },
    "content_for_index": []
  }
}
```

---

## 11. Locales e Internacionalización

### Estructura de archivos de locale

```
locales/
├── en.default.json      # Idioma por defecto (obligatorio)
├── es.json              # Español
├── fr.json              # Francés
└── en.default.schema.json  # Traducciones del schema
```

### Contenido de un archivo locale

```json
{
  "general": {
    "accessibility": {
      "skip_to_content": "Saltar al contenido",
      "close": "Cerrar"
    },
    "pagination": {
      "previous": "Anterior",
      "next": "Siguiente"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "Añadir al carrito",
      "sold_out": "Agotado",
      "unavailable": "No disponible",
      "quantity": "Cantidad"
    }
  },
  "cart": {
    "general": {
      "title": "Carrito",
      "empty": "Tu carrito está vacío",
      "subtotal": "Subtotal",
      "checkout": "Finalizar compra"
    }
  },
  "customer": {
    "login": {
      "title": "Iniciar sesión",
      "email": "Email",
      "password": "Contraseña",
      "submit": "Entrar"
    }
  }
}
```

### Usar traducciones en Liquid

```liquid
{{ 'products.product.add_to_cart' | t }}

<!-- Con variables -->
{{ 'cart.general.items_count' | t: count: cart.item_count }}
```

En el locale:
```json
{
  "cart": {
    "general": {
      "items_count": {
        "one": "{{ count }} artículo",
        "other": "{{ count }} artículos"
      }
    }
  }
}
```

---

## 12. Assets: Imágenes, CSS y JS

### Referenciar Assets

```liquid
<!-- CSS -->
{{ 'base.css' | asset_url | stylesheet_tag }}

<!-- JavaScript -->
{{ 'base.js' | asset_url | script_tag }}

<!-- Imagen -->
<img src="{{ 'logo.png' | asset_url }}" alt="Logo">

<!-- Con lazy loading -->
<img src="{{ 'producto.png' | asset_url }}" alt="Producto" loading="lazy">
```

### Imágenes Responsivas

```liquid
<img
  src="{{ image | image_url: width: 800 }}"
  srcset="
    {{ image | image_url: width: 400 }} 400w,
    {{ image | image_url: width: 800 }} 800w,
    {{ image | image_url: width: 1200 }} 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="{{ image.alt | escape }}"
  loading="lazy"
>
```

### Picture Element para Art Direction

```liquid
<picture>
  <source
    media="(min-width: 768px)"
    srcset="{{ image | image_url: width: 1200 }}"
  >
  <img
    src="{{ image | image_url: width: 600 }}"
    alt="{{ image.alt | escape }}"
  >
</picture>
```

---

## 13. Snippets: Código Reutilizable

### Crear un Snippet

`snippets/product-card.liquid`:
```liquid
{%- comment -%}
  Renderiza una tarjeta de producto
  
  Parámetros:
  - product: Objeto producto (obligatorio)
  - show_price: Boolean (default: true)
  - show_vendor: Boolean (default: false)
{%- endcomment -%}

{%- assign show_price = show_price | default: true -%}
{%- assign show_vendor = show_vendor | default: false -%}

<div class="product-card">
  <a href="{{ product.url }}">
    {%- if product.featured_image -%}
      <img 
        src="{{ product.featured_image | image_url: width: 400 }}" 
        alt="{{ product.title | escape }}"
        loading="lazy"
      >
    {%- else -%}
      {{ 'product-1' | placeholder_svg_tag: 'placeholder' }}
    {%- endif -%}
  </a>
  
  <div class="product-card__info">
    {%- if show_vendor -%}
      <p class="product-card__vendor">{{ product.vendor }}</p>
    {%- endif -%}
    
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    
    {%- if show_price -%}
      <p class="product-card__price">
        {{ product.price | money }}
      </p>
    {%- endif -%}
  </div>
</div>
```

### Usar el Snippet

```liquid
{% render 'product-card', product: product %}

{% render 'product-card', product: product, show_vendor: true, show_price: false %}
```

### Snippets Comunes

- `icon-*.liquid` - Iconos SVG
- `product-card.liquid` - Tarjeta de producto
- `price.liquid` - Formateo de precio
- `pagination.liquid` - Paginación
- `social-icons.liquid` - Iconos de redes sociales

---

## 14. Páginas Esenciales del Tema

### Homepage (index.json)
- Hero/Banner principal
- Colección destacada
- Características/beneficios
- Testimonios
- Newsletter

### Producto (product.json)
- Galería de imágenes
- Información del producto
- Selector de variantes
- Botón añadir al carrito
- Descripción
- Productos relacionados

### Colección (collection.json)
- Título y descripción
- Filtros
- Grid de productos
- Paginación

### Carrito (cart.json)
- Lista de productos
- Actualizar cantidades
- Subtotal
- Botón checkout

### Páginas de Cliente
- Login
- Registro
- Mi cuenta
- Mis pedidos
- Mis direcciones

---

## 15. Objetos Liquid de Shopify

### Objetos Globales (disponibles en todas partes)

```liquid
{{ shop.name }}              <!-- Nombre de la tienda -->
{{ shop.email }}             <!-- Email de la tienda -->
{{ shop.currency }}          <!-- Moneda -->
{{ shop.money_format }}      <!-- Formato de moneda -->

{{ cart.item_count }}        <!-- Número de items en carrito -->
{{ cart.total_price }}       <!-- Precio total del carrito -->

{{ customer.first_name }}    <!-- Nombre del cliente (si logueado) -->
{{ customer.email }}         <!-- Email del cliente -->

{{ request.locale }}         <!-- Idioma actual -->
{{ request.page_type }}      <!-- Tipo de página -->

{{ routes.root_url }}        <!-- URL raíz -->
{{ routes.cart_url }}        <!-- URL del carrito -->
{{ routes.account_url }}     <!-- URL de cuenta -->

{{ settings.logo }}          <!-- Ajuste global del tema -->
{{ section.settings.titulo }}<!-- Ajuste de la sección -->
```

### Objeto Product

```liquid
{{ product.title }}
{{ product.handle }}
{{ product.description }}
{{ product.price }}
{{ product.compare_at_price }}
{{ product.available }}
{{ product.type }}
{{ product.vendor }}
{{ product.tags }}
{{ product.featured_image }}
{{ product.images }}
{{ product.variants }}
{{ product.options }}
{{ product.options_with_values }}
{{ product.selected_or_first_available_variant }}
{{ product.url }}
{{ product.metafields.namespace.key }}
```

### Objeto Collection

```liquid
{{ collection.title }}
{{ collection.handle }}
{{ collection.description }}
{{ collection.products }}
{{ collection.products_count }}
{{ collection.all_products_count }}
{{ collection.image }}
{{ collection.url }}
```

### Objeto Cart Item

```liquid
{% for item in cart.items %}
  {{ item.product.title }}
  {{ item.variant.title }}
  {{ item.quantity }}
  {{ item.price }}
  {{ item.line_price }}
  {{ item.url }}
  {{ item.image }}
  {{ item.key }}
{% endfor %}
```

---

## 16. Filtros Liquid Esenciales

### Formateo de Dinero

```liquid
{{ product.price | money }}
<!-- Resultado: €99,00 -->

{{ product.price | money_with_currency }}
<!-- Resultado: €99,00 EUR -->

{{ product.price | money_without_currency }}
<!-- Resultado: 99,00 -->

{{ product.price | money_without_trailing_zeros }}
<!-- Resultado: €99 -->
```

### Imágenes

```liquid
{{ product.featured_image | image_url: width: 400 }}
{{ product.featured_image | image_url: width: 400, height: 400, crop: 'center' }}
{{ image | image_url: width: 800 }}
```

### Texto

```liquid
{{ 'texto' | upcase }}        <!-- TEXTO -->
{{ 'TEXTO' | downcase }}      <!-- texto -->
{{ 'texto' | capitalize }}    <!-- Texto -->
{{ 'texto' | escape }}        <!-- Escapa HTML -->
{{ 'texto' | strip_html }}    <!-- Quita HTML -->
{{ 'texto' | truncate: 50 }}  <!-- Corta a 50 caracteres -->
{{ 'texto' | truncatewords: 10 }} <!-- Corta a 10 palabras -->
{{ 'texto' | replace: 'a', 'b' }} <!-- Reemplaza -->
{{ 'texto' | split: ',' }}    <!-- Divide en array -->
{{ array | join: ', ' }}      <!-- Une array -->
{{ 'texto' | prepend: 'pre-' }}
{{ 'texto' | append: '-post' }}
{{ 'texto' | remove: 'x' }}
```

### Fechas

```liquid
{{ article.published_at | date: '%d/%m/%Y' }}
{{ 'now' | date: '%Y' }}
```

### Arrays

```liquid
{{ array | first }}
{{ array | last }}
{{ array | size }}
{{ array | sort }}
{{ array | reverse }}
{{ array | uniq }}
{{ array | where: 'available', true }}
{{ array | map: 'title' }}
```

### URLs

```liquid
{{ 'base.css' | asset_url }}
{{ product | url_for_type }}
{{ product.url | within: collection }}
{{ 'cart' | shopify_asset_url }}  <!-- Assets del sistema -->
```

### Matemáticas

```liquid
{{ 10 | plus: 5 }}       <!-- 15 -->
{{ 10 | minus: 5 }}      <!-- 5 -->
{{ 10 | times: 5 }}      <!-- 50 -->
{{ 10 | divided_by: 2 }} <!-- 5 -->
{{ 10 | modulo: 3 }}     <!-- 1 -->
{{ 10.5 | floor }}       <!-- 10 -->
{{ 10.5 | ceil }}        <!-- 11 -->
{{ 10.5 | round }}       <!-- 11 -->
```

### Defaulting

```liquid
{{ variable | default: 'valor por defecto' }}
```

---

## 17. Rutas y URLs en Shopify

### Objeto `routes`

```liquid
{{ routes.root_url }}                    <!-- / -->
{{ routes.cart_url }}                    <!-- /cart -->
{{ routes.cart_add_url }}                <!-- /cart/add -->
{{ routes.cart_change_url }}             <!-- /cart/change -->
{{ routes.cart_clear_url }}              <!-- /cart/clear -->
{{ routes.cart_update_url }}             <!-- /cart/update -->
{{ routes.account_url }}                 <!-- /account -->
{{ routes.account_login_url }}           <!-- /account/login -->
{{ routes.account_logout_url }}          <!-- /account/logout -->
{{ routes.account_register_url }}        <!-- /account/register -->
{{ routes.account_addresses_url }}       <!-- /account/addresses -->
{{ routes.collections_url }}             <!-- /collections -->
{{ routes.all_products_collection_url }} <!-- /collections/all -->
{{ routes.search_url }}                  <!-- /search -->
```

### Enlaces en Settings

En los schemas, usa formato `shopify://`:

```json
{
  "type": "url",
  "id": "link",
  "label": "Enlace"
}
```

El usuario puede seleccionar:
- Páginas internas
- Colecciones
- Productos
- Blogs
- URLs externas

Formatos internos:
- `shopify://collections/all`
- `shopify://collections/nombre`
- `shopify://products/handle`
- `shopify://pages/about`

---

## 18. Manejo del Carrito

### Formulario para Añadir al Carrito

```liquid
{%- form 'product', product, id: 'product-form' -%}
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  
  <div class="quantity">
    <label for="quantity">Cantidad</label>
    <input type="number" id="quantity" name="quantity" value="1" min="1">
  </div>
  
  <button type="submit" name="add" {% unless product.available %}disabled{% endunless %}>
    {% if product.available %}
      Añadir al carrito
    {% else %}
      Agotado
    {% endif %}
  </button>
{%- endform -%}
```

### Cart Drawer/Sidebar

```liquid
<div class="cart-drawer" id="cart-drawer">
  <div class="cart-drawer__header">
    <h2>Tu carrito</h2>
    <button type="button" id="cart-drawer-close">Cerrar</button>
  </div>
  
  <div class="cart-drawer__content">
    {%- if cart.item_count > 0 -%}
      {%- for item in cart.items -%}
        <div class="cart-item">
          <img src="{{ item.image | image_url: width: 100 }}" alt="{{ item.title | escape }}">
          <div class="cart-item__info">
            <a href="{{ item.url }}">{{ item.product.title }}</a>
            {%- unless item.product.has_only_default_variant -%}
              <p>{{ item.variant.title }}</p>
            {%- endunless -%}
            <p>{{ item.quantity }} × {{ item.price | money }}</p>
          </div>
          <a href="{{ routes.cart_change_url }}?id={{ item.key }}&quantity=0">Eliminar</a>
        </div>
      {%- endfor -%}
      
      <div class="cart-drawer__footer">
        <p><strong>Subtotal:</strong> {{ cart.total_price | money }}</p>
        <a href="{{ routes.cart_url }}" class="btn">Ver carrito</a>
        <a href="/checkout" class="btn btn--primary">Checkout</a>
      </div>
    {%- else -%}
      <p>Tu carrito está vacío</p>
    {%- endif -%}
  </div>
</div>
```

---

## 19. Productos y Variantes

### Mostrar Opciones de Producto

```liquid
{%- unless product.has_only_default_variant -%}
  {%- for option in product.options_with_values -%}
    <div class="product-option">
      <label>{{ option.name }}</label>
      
      <select name="options[{{ option.name }}]">
        {%- for value in option.values -%}
          <option 
            value="{{ value }}" 
            {% if option.selected_value == value %}selected{% endif %}
          >
            {{ value }}
          </option>
        {%- endfor -%}
      </select>
    </div>
  {%- endfor -%}
{%- endunless -%}
```

### Botones de Variante (en lugar de Select)

```liquid
{%- for option in product.options_with_values -%}
  <div class="variant-buttons">
    <p>{{ option.name }}</p>
    {%- for value in option.values -%}
      <label class="variant-btn{% if option.selected_value == value %} active{% endif %}">
        <input 
          type="radio" 
          name="options[{{ option.name }}]" 
          value="{{ value }}"
          {% if option.selected_value == value %}checked{% endif %}
        >
        <span>{{ value }}</span>
      </label>
    {%- endfor -%}
  </div>
{%- endfor -%}
```

### JSON de Variantes para JavaScript

```liquid
<script>
  const productVariants = {{ product.variants | json }};
  const currentVariant = {{ product.selected_or_first_available_variant | json }};
</script>
```

---

## 20. Colecciones

### Grid de Productos

```liquid
<div class="collection-grid">
  {%- paginate collection.products by 12 -%}
    {%- for product in collection.products -%}
      {% render 'product-card', product: product %}
    {%- else -%}
      <p>No hay productos en esta colección.</p>
    {%- endfor -%}
    
    {%- if paginate.pages > 1 -%}
      <nav class="pagination">
        {{ paginate | default_pagination }}
      </nav>
    {%- endif -%}
  {%- endpaginate -%}
</div>
```

### Filtros de Colección

```liquid
{%- for filter in collection.filters -%}
  <div class="filter">
    <h4>{{ filter.label }}</h4>
    
    {%- case filter.type -%}
      {%- when 'list' -%}
        <ul>
          {%- for value in filter.values -%}
            <li>
              <label>
                <input 
                  type="checkbox" 
                  name="{{ value.param_name }}" 
                  value="{{ value.value }}"
                  {% if value.active %}checked{% endif %}
                >
                {{ value.label }} ({{ value.count }})
              </label>
            </li>
          {%- endfor -%}
        </ul>
        
      {%- when 'price_range' -%}
        <input type="range" min="{{ filter.min_value.value }}" max="{{ filter.max_value.value }}">
    {%- endcase -%}
  </div>
{%- endfor -%}
```

---

## 21. Checkout y Pagos

### Iconos de Pago

```liquid
<div class="payment-icons">
  {%- for type in shop.enabled_payment_types -%}
    {{ type | payment_type_svg_tag: class: 'payment-icon' }}
  {%- endfor -%}
</div>
```

### Políticas de la Tienda

```liquid
{%- if shop.privacy_policy -%}
  <a href="{{ shop.privacy_policy.url }}">{{ shop.privacy_policy.title }}</a>
{%- endif -%}

{%- if shop.refund_policy -%}
  <a href="{{ shop.refund_policy.url }}">{{ shop.refund_policy.title }}</a>
{%- endif -%}

{%- if shop.shipping_policy -%}
  <a href="{{ shop.shipping_policy.url }}">{{ shop.shipping_policy.title }}</a>
{%- endif -%}

{%- if shop.terms_of_service -%}
  <a href="{{ shop.terms_of_service.url }}">{{ shop.terms_of_service.title }}</a>
{%- endif -%}
```

---

## 22. SEO y Metadatos

### Meta Tags en theme.liquid

```liquid
<head>
  <title>
    {{ page_title }}
    {%- if current_tags %} – {{ current_tags | join: ', ' }}{% endif -%}
    {%- if current_page != 1 %} – Página {{ current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} – {{ shop.name }}{% endunless -%}
  </title>
  
  {%- if page_description -%}
    <meta name="description" content="{{ page_description | escape }}">
  {%- endif -%}
  
  <link rel="canonical" href="{{ canonical_url }}">
  
  <!-- Open Graph -->
  <meta property="og:site_name" content="{{ shop.name }}">
  <meta property="og:url" content="{{ canonical_url }}">
  <meta property="og:title" content="{{ page_title }}">
  <meta property="og:type" content="website">
  {%- if page_description -%}
    <meta property="og:description" content="{{ page_description | escape }}">
  {%- endif -%}
  {%- if page_image -%}
    <meta property="og:image" content="https:{{ page_image | image_url: width: 1200 }}">
  {%- endif -%}
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{ page_title }}">
  {%- if page_description -%}
    <meta name="twitter:description" content="{{ page_description | escape }}">
  {%- endif -%}
</head>
```

### Schema.org JSON-LD

```liquid
{%- if template.name == 'product' -%}
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": {{ product.title | json }},
      "description": {{ product.description | strip_html | json }},
      "image": {{ product.featured_image | image_url: width: 800 | prepend: 'https:' | json }},
      "url": {{ canonical_url | json }},
      "brand": {
        "@type": "Brand",
        "name": {{ product.vendor | json }}
      },
      "offers": {
        "@type": "Offer",
        "price": {{ product.price | divided_by: 100.0 | json }},
        "priceCurrency": {{ shop.currency | json }},
        "availability": "{% if product.available %}https://schema.org/InStock{% else %}https://schema.org/OutOfStock{% endif %}"
      }
    }
  </script>
{%- endif -%}
```

---

## 23. Responsive Design

### Breakpoints Recomendados

```css
/* Mobile first */
/* Base: 0 - 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1280px) { }
```

### Grid Responsive

```css
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Imágenes Responsivas

```liquid
<img
  src="{{ image | image_url: width: 800 }}"
  srcset="
    {{ image | image_url: width: 400 }} 400w,
    {{ image | image_url: width: 600 }} 600w,
    {{ image | image_url: width: 800 }} 800w,
    {{ image | image_url: width: 1000 }} 1000w,
    {{ image | image_url: width: 1200 }} 1200w
  "
  sizes="
    (max-width: 767px) calc(100vw - 32px),
    (max-width: 1023px) calc(50vw - 48px),
    calc(33vw - 64px)
  "
  alt="{{ image.alt | escape }}"
  loading="lazy"
>
```

---

## 24. Accesibilidad (a11y)

### Skip Link

```liquid
<body>
  <a class="skip-link" href="#main-content">
    Saltar al contenido
  </a>
  
  <!-- header -->
  
  <main id="main-content" role="main">
    {{ content_for_layout }}
  </main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 1rem;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

### Atributos ARIA

```liquid
<!-- Navegación -->
<nav aria-label="Navegación principal">
  ...
</nav>

<!-- Botón de menú -->
<button 
  type="button" 
  aria-expanded="false" 
  aria-controls="mobile-menu"
  aria-label="Abrir menú"
>
  <span class="sr-only">Menú</span>
  ...
</button>

<!-- Modal -->
<div 
  role="dialog" 
  aria-modal="true" 
  aria-labelledby="modal-title"
>
  <h2 id="modal-title">Título del modal</h2>
</div>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  {{ mensaje_dinamico }}
</div>
```

### Texto Solo para Screen Readers

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Focus Visible

```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 25. Performance y Optimización

### Lazy Loading

```liquid
<img 
  src="{{ image | image_url: width: 800 }}" 
  alt="{{ image.alt | escape }}"
  loading="lazy"
  decoding="async"
>
```

### Preload de Recursos Críticos

```liquid
<head>
  <!-- Preconnect -->
  <link rel="preconnect" href="https://cdn.shopify.com" crossorigin>
  <link rel="preconnect" href="https://fonts.shopifycdn.com" crossorigin>
  
  <!-- Preload LCP image -->
  {%- if template.name == 'index' -%}
    <link 
      rel="preload" 
      as="image" 
      href="{{ section.settings.hero_image | image_url: width: 1200 }}"
    >
  {%- endif -%}
</head>
```

### CSS Crítico Inline

```liquid
<head>
  <style>
    /* CSS crítico para above-the-fold */
    body { margin: 0; font-family: sans-serif; }
    .header { position: fixed; top: 0; width: 100%; }
  </style>
  
  <!-- CSS completo con baja prioridad -->
  <link 
    rel="stylesheet" 
    href="{{ 'base.css' | asset_url }}" 
    media="print" 
    onload="this.media='all'"
  >
  <noscript>
    <link rel="stylesheet" href="{{ 'base.css' | asset_url }}">
  </noscript>
</head>
```

### Defer JavaScript

```liquid
{{ 'base.js' | asset_url | script_tag: defer: true }}

<!-- O manualmente -->
<script src="{{ 'base.js' | asset_url }}" defer></script>
```

---

## 26. Errores Comunes y Soluciones

### Error: "Section not found"

**Causa:** El `type` en el JSON no coincide con el nombre del archivo `.liquid`.

**Solución:**
```
templates/index.json: "type": "hero"
sections/hero.liquid  ✅ Correcto

templates/index.json: "type": "hero-banner"
sections/hero.liquid  ❌ No coincide
```

### Error: "Unexpected token" en JSON

**Causa:** JSON mal formado (comas extra, comillas incorrectas).

**Solución:** Valida tu JSON en [jsonlint.com](https://jsonlint.com).

Errores comunes:
```json
// ❌ Coma extra al final
{
  "settings": {
    "title": "Hola",  // <- coma extra
  }
}

// ✅ Correcto
{
  "settings": {
    "title": "Hola"
  }
}
```

### Error: Imágenes no cargan

**Causa:** Usar `/` en lugar de `| asset_url`.

**Solución:**
```liquid
<!-- ❌ Incorrecto -->
<img src="/assets/logo.png">

<!-- ✅ Correcto -->
<img src="{{ 'logo.png' | asset_url }}">
```

### Error: Enlaces rotos

**Causa:** URLs hardcodeadas en lugar de usar `routes`.

**Solución:**
```liquid
<!-- ❌ Incorrecto -->
<a href="/cart">Carrito</a>
<a href="/collections/all">Colección</a>

<!-- ✅ Correcto -->
<a href="{{ routes.cart_url }}">Carrito</a>
<a href="{{ routes.all_products_collection_url }}">Colección</a>
```

### Error: Sección no aparece en "Añadir sección"

**Causa:** Falta el `presets` en el schema.

**Solución:**
```json
{% schema %}
{
  "name": "Mi Sección",
  "settings": [...],
  "presets": [
    {
      "name": "Mi Sección"
    }
  ]
}
{% endschema %}
```

### Error: Variables no editables

**Causa:** Usar texto hardcodeado en lugar de `section.settings`.

**Solución:**
```liquid
<!-- ❌ Incorrecto -->
<h1>Bienvenido a nuestra tienda</h1>

<!-- ✅ Correcto -->
<h1>{{ section.settings.titulo }}</h1>

{% schema %}
{
  "settings": [
    {
      "type": "text",
      "id": "titulo",
      "label": "Título",
      "default": "Bienvenido a nuestra tienda"
    }
  ]
}
{% endschema %}
```

### Error: CSS no aplica

**Causa:** Especificidad CSS o cache.

**Solución:**
1. Verifica que el CSS está cargando (DevTools > Network)
2. Usa selectores más específicos
3. Evita `!important` excepto para utilities
4. Limpia cache de Shopify (añade `?v=2` a la URL del CSS)

---

## 27. Checklist de Compatibilidad

### Antes de Subir el Tema

- [ ] **Estructura de archivos completa**
  - [ ] `layout/theme.liquid` existe
  - [ ] `config/settings_schema.json` existe (puede estar vacío)
  - [ ] `config/settings_data.json` existe
  - [ ] `templates/index.json` existe
  - [ ] `templates/product.json` existe
  - [ ] `templates/collection.json` existe
  - [ ] `templates/cart.json` existe
  - [ ] `templates/404.json` existe
  - [ ] `templates/customers/*.json` existen

- [ ] **theme.liquid contiene**
  - [ ] `{{ content_for_header }}`
  - [ ] `{{ content_for_layout }}`
  - [ ] Meta viewport
  - [ ] `{{ page_title }}`

- [ ] **Secciones**
  - [ ] Cada sección tiene `{% schema %}` válido
  - [ ] Los `type` en JSONs coinciden con nombres de archivos
  - [ ] Bloques tienen `{{ block.shopify_attributes }}`

- [ ] **URLs y Enlaces**
  - [ ] Usan `{{ routes.* }}` para enlaces internos
  - [ ] Usan `| asset_url` para assets
  - [ ] No hay URLs hardcodeadas

- [ ] **Imágenes**
  - [ ] Usan `| image_url` para redimensionar
  - [ ] Tienen atributo `alt`
  - [ ] Tienen `loading="lazy"` (excepto hero)

- [ ] **Accesibilidad**
  - [ ] Skip link presente
  - [ ] Formularios tienen labels
  - [ ] Botones tienen texto o aria-label
  - [ ] Contraste de colores adecuado

- [ ] **Responsive**
  - [ ] Funciona en móvil (320px+)
  - [ ] Funciona en tablet (768px+)
  - [ ] Funciona en desktop (1024px+)

- [ ] **JSON válido**
  - [ ] Todos los archivos JSON pasan validación
  - [ ] No hay comas extra
  - [ ] Comillas dobles (no simples)

---

## 28. Proceso de Desarrollo Paso a Paso

### 1. Configuración Inicial

```bash
# Crear estructura
mkdir mi-tema
cd mi-tema
mkdir assets config layout locales sections snippets templates
mkdir templates/customers

# Crear archivos base
touch layout/theme.liquid
touch config/settings_schema.json
touch config/settings_data.json
touch assets/base.css
touch assets/base.js
touch locales/es.default.json
```

### 2. Crear theme.liquid

```liquid
<!doctype html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ page_title }} – {{ shop.name }}</title>
  {{ 'base.css' | asset_url | stylesheet_tag }}
  {{ content_for_header }}
</head>
<body>
  {% section 'header' %}
  
  <main id="main">
    {{ content_for_layout }}
  </main>
  
  {% section 'footer' %}
  
  {{ 'base.js' | asset_url | script_tag }}
</body>
</html>
```

### 3. Crear Secciones Base

Header, Footer, Hero, etc. siguiendo la estructura explicada.

### 4. Crear Templates JSON

Definir qué secciones van en cada página.

### 5. Añadir Estilos CSS

Sistema de diseño completo en `base.css`.

### 6. Añadir JavaScript

Interactividad en `base.js`.

### 7. Crear ZIP

```bash
cd mi-tema
zip -r ../mi-tema.zip . -x ".*" -x "__MACOSX/*"
```

### 8. Subir a Shopify

1. Admin > Tienda online > Temas
2. Añadir tema > Subir archivo zip
3. Personalizar para probar
4. Publicar cuando esté listo

---

## 29. Debugging y Testing

### Herramientas de Desarrollo

1. **Shopify Theme Inspector** (Chrome Extension)
   - Muestra tiempos de renderizado Liquid
   - Identifica cuellos de botella

2. **Shopify CLI** (para desarrollo local)
   ```bash
   npm install -g @shopify/cli
   shopify theme dev --store=tu-tienda.myshopify.com
   ```

3. **DevTools del navegador**
   - Network: verificar carga de assets
   - Console: errores JavaScript
   - Elements: inspeccionar HTML

### Ver Errores de Liquid

Añade temporalmente a theme.liquid:
```liquid
{% if request.design_mode %}
  <script>
    console.log('Liquid errors:', {{ content_for_header | json }});
  </script>
{% endif %}
```

### Preview de Templates Específicos

```
tu-tienda.myshopify.com/?preview_theme_id=123456789
tu-tienda.myshopify.com/products/nombre?preview_theme_id=123456789
tu-tienda.myshopify.com/collections/nombre?preview_theme_id=123456789
```

---

## 30. Deployment y Publicación

### Crear el ZIP Final

```bash
# En Mac/Linux
cd carpeta-del-tema
zip -r ../nombre-tema.zip . -x ".*" -x "__MACOSX/*" -x "*.md"

# Verificar contenido
unzip -l ../nombre-tema.zip
```

### Subir a Shopify

1. Ve a **Admin de Shopify > Tienda online > Temas**
2. Click en **"Añadir tema"**
3. Selecciona **"Subir archivo zip"**
4. Selecciona tu archivo `.zip`
5. Espera a que se procese

### Verificar Funcionamiento

1. Click en **"Personalizar"** en el tema subido
2. Verifica que todas las secciones carguen
3. Prueba la edición de textos e imágenes
4. Navega por las diferentes páginas
5. Prueba en móvil (responsive)
6. Prueba añadir al carrito
7. Verifica el checkout

### Publicar el Tema

Solo cuando todo funcione correctamente:
1. Click en **"Acciones" > "Publicar"**
2. Confirma la publicación
3. Tu tema estará en producción

---

## 📌 Resumen de Reglas de Oro

1. **Siempre incluye `{{ content_for_header }}` y `{{ content_for_layout }}`** en theme.liquid

2. **Los `type` en JSON deben coincidir exactamente** con los nombres de archivos `.liquid`

3. **Usa `{{ section.settings.* }}` para contenido editable**, nunca texto hardcodeado

4. **Añade `{{ block.shopify_attributes }}`** a todos los elementos de bloque

5. **Usa `| asset_url` para assets** y `routes.*` para URLs internas

6. **Valida tu JSON** antes de subir

7. **Incluye `presets`** en las secciones que quieras añadibles

8. **Prueba en móvil** antes de publicar

9. **Usa lazy loading** para imágenes (excepto hero)

10. **Mantén los schemas organizados** con `header` para agrupar settings

---

## 📚 Recursos Adicionales

- [Documentación oficial de Shopify](https://shopify.dev/themes)
- [Liquid Reference](https://shopify.dev/api/liquid)
- [Theme Check](https://github.com/Shopify/theme-check) - Linter para temas
- [Dawn Theme](https://github.com/Shopify/dawn) - Tema de referencia oficial

---

*Documento generado para el proyecto LUMEI - Enero 2026*
