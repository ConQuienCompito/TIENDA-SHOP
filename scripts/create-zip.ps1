# Script para crear ZIP del tema Shopify
$source = "shopify-theme"
$dest = "lumei-shopify-theme.zip"

# Eliminar ZIP anterior
if (Test-Path $dest) {
    Remove-Item $dest -Force
}

# Cambiar al directorio del tema
Push-Location $source

try {
    # Crear ZIP con todos los archivos manteniendo estructura
    Get-ChildItem -Recurse -File | Compress-Archive -DestinationPath "..\$dest" -CompressionLevel Optimal -Force
    Write-Host "ZIP creado: $dest"
} finally {
    Pop-Location
}
