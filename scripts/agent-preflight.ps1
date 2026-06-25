# Agent preflight — run before handing off to human
# Usage: .\scripts\agent-preflight.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Node = Join-Path $Root ".tools\node"

Write-Host "=== captainsoloHQ agent preflight ===" -ForegroundColor Cyan

if (-not (Test-Path "$Node\node.exe")) {
    Write-Error "Node not found at $Node — run full setup first"
}

$env:Path = "$Node;$env:Path"
Push-Location $Root

Write-Host "`n[1/3] Production build..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Pop-Location; exit 1 }

Write-Host "`n[2/3] Checking dist..." -ForegroundColor Yellow
@("index.html", "assets", ".htaccess") | ForEach-Object {
    if (-not (Test-Path "dist\$_")) { Write-Warning "Missing dist/$_" }
}

Write-Host "`n[3/3] Optional deploy zip..." -ForegroundColor Yellow
$zipDir = Join-Path $Root "deploy\cpanel\zips"
New-Item -ItemType Directory -Force -Path $zipDir | Out-Null
$zip = Join-Path $zipDir "public_html-$(Get-Date -Format yyyyMMdd-HHmm).zip"
Compress-Archive -Path "dist\*" -DestinationPath $zip -Force
Write-Host "Created: $zip" -ForegroundColor Green

Pop-Location
Write-Host "`nPreflight OK. Log session in docs/AGENT-SESSION-LOG.md" -ForegroundColor Green
