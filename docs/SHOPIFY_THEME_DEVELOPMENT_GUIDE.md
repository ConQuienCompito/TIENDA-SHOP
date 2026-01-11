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

---

> **Nota:** Este es un resumen de la guía completa. El documento original tiene más de 2500 líneas.
> Para la guía completa, consulta la carpeta `mds/SHOPIFY_THEME_DEVELOPMENT_GUIDE.md`

---

## Referencia Rápida

### Estructura Obligatoria

```
tu-tema/
├── assets/          # CSS, JS, imágenes
├── config/          # settings_schema.json, settings_data.json
├── layout/          # theme.liquid (OBLIGATORIO)
├── locales/         # Traducciones
├── sections/        # Secciones del tema
├── snippets/        # Fragmentos reutilizables
└── templates/       # Templates JSON
```

### Archivos Críticos

- `layout/theme.liquid` - OBLIGATORIO
- `config/settings_schema.json` - OBLIGATORIO (puede estar vacío `[]`)
- `config/settings_data.json` - OBLIGATORIO
- `templates/index.json` - Homepage
- `templates/product.json` - Página de producto

### Elementos Obligatorios en theme.liquid

```liquid
{{ content_for_header }}  <!-- Scripts de Shopify -->
{{ content_for_layout }}  <!-- Contenido de la página -->
{{ page_title }}          <!-- Título de la página -->
```

### Crear ZIP Correctamente

```bash
cd mi-tema
zip -r ../mi-tema.zip . -x ".*" -x "__MACOSX/*"
```

---

*Documento para el proyecto LUMEI - Enero 2026*
