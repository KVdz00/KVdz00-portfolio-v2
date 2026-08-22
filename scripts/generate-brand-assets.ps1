$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path $PSScriptRoot -Parent
$publicDir = Join-Path $projectRoot "public"

function New-TextBrush([string]$color) {
  return [System.Drawing.SolidBrush]::new(
    [System.Drawing.ColorTranslator]::FromHtml($color)
  )
}

$og = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($og)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$background = New-TextBrush "#010409"
$panel = New-TextBrush "#0d1f33"
$borderPen = [System.Drawing.Pen]::new(
  [System.Drawing.ColorTranslator]::FromHtml("#30363d"),
  2
)
$displayFont = [System.Drawing.Font]::new(
  "Segoe UI",
  58,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)
$bodyFont = [System.Drawing.Font]::new(
  "Segoe UI",
  25,
  [System.Drawing.FontStyle]::Regular,
  [System.Drawing.GraphicsUnit]::Pixel
)
$monoFont = [System.Drawing.Font]::new(
  "Consolas",
  18,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)
$textBrush = New-TextBrush "#f0f6fc"
$mutedBrush = New-TextBrush "#8b949e"
$tealBrush = New-TextBrush "#2dd4bf"

try {
  $graphics.FillRectangle($background, 0, 0, 1200, 630)
  $graphics.FillRectangle($panel, 810, 0, 390, 630)
  $graphics.DrawRectangle($borderPen, 44, 44, 1112, 542)

  $graphics.DrawString(
    "SOFTWARE DEVELOPER / GRADE 12",
    $monoFont,
    $tealBrush,
    78,
    92
  )
  $graphics.DrawString(
    "I build useful software",
    $displayFont,
    $textBrush,
    74,
    164
  )
  $graphics.DrawString(
    "for real workflows.",
    $displayFont,
    $textBrush,
    74,
    232
  )
  $graphics.DrawString(
    "Web apps / Windows utilities / Developer tools",
    $bodyFont,
    $mutedBrush,
    80,
    346
  )
  $graphics.DrawString(
    "LIQUID UTILITY   /   FILSAFIT   /   ARINDRA PRODUCTION",
    $monoFont,
    $textBrush,
    80,
    468
  )
  $graphics.DrawString(
    "KV / DZ00",
    $monoFont,
    $tealBrush,
    974,
    524
  )

  $og.Save(
    (Join-Path $publicDir "og-image.png"),
    [System.Drawing.Imaging.ImageFormat]::Png
  )
} finally {
  $textBrush.Dispose()
  $mutedBrush.Dispose()
  $tealBrush.Dispose()
  $displayFont.Dispose()
  $bodyFont.Dispose()
  $monoFont.Dispose()
  $borderPen.Dispose()
  $panel.Dispose()
  $background.Dispose()
  $graphics.Dispose()
  $og.Dispose()
}

$icon = [System.Drawing.Bitmap]::new(180, 180)
$iconGraphics = [System.Drawing.Graphics]::FromImage($icon)
$iconGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$iconBackground = New-TextBrush "#010409"
$iconText = New-TextBrush "#f0f6fc"
$iconAccent = New-TextBrush "#2dd4bf"
$iconFont = [System.Drawing.Font]::new(
  "Segoe UI",
  72,
  [System.Drawing.FontStyle]::Bold,
  [System.Drawing.GraphicsUnit]::Pixel
)

try {
  $iconGraphics.FillRectangle($iconBackground, 0, 0, 180, 180)
  $iconGraphics.DrawString("KV", $iconFont, $iconText, 22, 43)
  $iconGraphics.FillRectangle($iconAccent, 148, 32, 8, 116)
  $icon.Save(
    (Join-Path $publicDir "apple-touch-icon.png"),
    [System.Drawing.Imaging.ImageFormat]::Png
  )
} finally {
  $iconFont.Dispose()
  $iconBackground.Dispose()
  $iconText.Dispose()
  $iconAccent.Dispose()
  $iconGraphics.Dispose()
  $icon.Dispose()
}
