# VERIFICACIÓN Y RESOLUCIÓN - TEMA SHOPIFY LUMEI

## (A) DIAGNÓSTICO: QUÉ ESTABA MAL Y POR QUÉ LA HOME PODÍA NO APARECER

### Problema Principal Identificado: Estructura del ZIP al Comprimir

**Causa raíz:**
Cuando se comprime la carpeta `shopify-theme/` usando PowerShell `Compress-Archive -Path shopify-theme`, el ZIP resultante contiene:
```
shopify-theme/
  ├── layout/
  │   └── theme.liquid
  ├── templates/
  │   └── index.json
  └── ...
```

Shopify espera que el contenido esté directamente en la raíz del ZIP:
```
layout/
  └── theme.liquid
templates/
  └── index.json
...
```

**Por qué esto rompe la importación:**
- Shopify busca `layout/theme.liquid` directamente en la raíz del ZIP
- Al tener `shopify-theme/layout/theme.liquid`, Shopify no encuentra el archivo
- Error resultante: "zip does not contain a valid theme: missing template layout/theme.liquid"

### Estado del Código del Tema (DENTRO de shopify-theme/):

✅ **ESTRUCTURA CORRECTA:**
- `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `templates/` están directamente en `shopify-theme/`
- NO hay nivel extra anidado dentro de la carpeta

✅ **LAYOUT CORRECTO:**
- `layout/theme.liquid` existe
- Contiene `{{ content_for_layout }}` correctamente
- Usa `{% section 'header' %}` y `{% section 'footer' %}` (estándar OS 2.0)
- Solo usa `settings.favicon` (permitido en layout)

✅ **TEMPLATES JSON CORRECTOS:**
- `templates/index.json` existe con `sections` (hero, features) y `order` correcto
- Todos los templates JSON existen y tienen estructura correcta
- Todas las secciones referenciadas existen

✅ **SECCIONES CORRECTAS:**
- Todas las secciones tienen `{% schema %}` completo
- hero.liquid tiene `presets` (aparece en "Añadir sección")
- main-*.liquid NO tienen presets (correcto, son secciones de página)

---

## (B) LISTA EXACTA DE ARCHIVOS MODIFICADOS

### Archivos que NO necesitaban cambios (código correcto):
- `layout/theme.liquid` ✅
- `templates/index.json` ✅
- `sections/hero.liquid` ✅
- `config/settings_schema.json` ✅
- Todas las demás secciones y templates ✅

### Archivo NUEVO creado:
- `create-zip.ps1` - Script PowerShell para crear el ZIP correctamente

---

## (C) INSTRUCCIONES PASO A PASO

### Opción 1: Usar el Script PowerShell (Recomendado)

1. Abrir PowerShell en la carpeta raíz del proyecto (donde está `shopify-theme/`)
2. Ejecutar: `.\create-zip.ps1`
3. Se creará `lumei-shopify-theme.zip` con la estructura correcta

### Opción 2: Crear ZIP Manualmente

```powershell
# En PowerShell, desde la carpeta raíz del proyecto:
cd shopify-theme
Compress-Archive -Path * -DestinationPath ..\lumei-theme-manual.zip -Force
cd ..
```

### Opción 3: Desde Explorador de Windows

1. Abrir la carpeta `shopify-theme/`
2. Seleccionar TODOS los archivos y carpetas DENTRO (assets, config, layout, etc.)
3. Click derecho → "Comprimir en archivo ZIP"
4. Renombrar el ZIP según necesites

---

## (D) VERIFICACIÓN DEL ZIP

Para verificar que el ZIP tiene la estructura correcta:

```powershell
# Ver contenido del ZIP sin extraer
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead("lumei-shopify-theme.zip")
$zip.Entries | Select-Object FullName | Sort-Object FullName
$zip.Dispose()
```

**Estructura esperada (CORRECTA):**
```
assets/
config/
layout/
layout/theme.liquid  ← Debe estar directamente aquí
locales/
sections/
templates/
```

**Estructura INCORRECTA:**
```
shopify-theme/assets/
shopify-theme/config/
shopify-theme/layout/theme.liquid  ← MAL: nivel extra
```

---

## (E) IMPORTACIÓN EN SHOPIFY

1. Ir a tu tienda Shopify → Tienda online → Temas
2. Click en "Añadir tema" → "Subir archivo ZIP"
3. Seleccionar el ZIP creado
4. Esperar la importación
5. Previsualizar el tema antes de publicar

---

## RESUMEN

| Componente | Estado | Nota |
|------------|--------|------|
| Código del tema | ✅ Correcto | No necesita cambios |
| Estructura interna | ✅ Correcta | Carpetas en lugar correcto |
| theme.liquid | ✅ Correcto | Tiene content_for_layout |
| Templates JSON | ✅ Correctos | Estructura OS 2.0 válida |
| Secciones | ✅ Correctas | Schemas completos |
| Problema | ZIP | Carpeta contenedora extra |
| Solución | Script | create-zip.ps1 |
