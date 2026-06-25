# Prepare captainsolo.ca upload folders for Namecheap cPanel
# Run from repo root: .\scripts\prepare-cpanel-upload.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Deploy = Join-Path $Root "deploy\cpanel"
$Stamp = Get-Date -Format "yyyyMMdd-HHmm"

Write-Host "=== CaptainSolo cPanel deploy prep ===" -ForegroundColor Cyan
Write-Host "Repo: $Root"

# --- 1. Frontend build ---
$envFile = Join-Path $Root ".env.production"
if (-not (Test-Path $envFile)) {
    Write-Host ""
    Write-Host "MISSING: .env.production" -ForegroundColor Yellow
    Write-Host "Copy cpanel.env.example -> .env.production and fill VITE_* keys first."
    Write-Host "  copy cpanel.env.example .env.production"
    exit 1
}

Push-Location $Root
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm not found. Install Node.js LTS, reopen terminal, retry."
}
Write-Host "Installing npm dependencies..." -ForegroundColor Green
npm install --legacy-peer-deps
Write-Host "Building production frontend..." -ForegroundColor Green
npm run build
Pop-Location

# --- 2. Stage public_html (frontend) ---
$publicOut = Join-Path $Deploy "public_html"
if (Test-Path $publicOut) { Remove-Item $publicOut -Recurse -Force }
New-Item -ItemType Directory -Force -Path $publicOut | Out-Null
Copy-Item (Join-Path $Root "dist\*") $publicOut -Recurse -Force
# Ensure .htaccess from public/
$htaccess = Join-Path $Root "public\.htaccess"
if (Test-Path $htaccess) { Copy-Item $htaccess (Join-Path $publicOut ".htaccess") -Force }

# --- 3. Stage portfolio-backend ---
$backendOut = Join-Path $Deploy "portfolio-backend"
if (Test-Path $backendOut) { Remove-Item $backendOut -Recurse -Force }
$backendSrc = Join-Path $Root "tools\portfolio-backend"
Copy-Item $backendSrc $backendOut -Recurse -Force
# Drop local db if present (server creates fresh)
Remove-Item (Join-Path $backendOut "portfolio.db") -ErrorAction SilentlyContinue

# --- 4. SSL DCV file (already in deploy/cpanel/ssl) ---
$sslDest = Join-Path $Deploy "ssl-upload"
New-Item -ItemType Directory -Force -Path $sslDest | Out-Null
$sslFile = Join-Path $Deploy "ssl\ADA74535102569C97541A0CDBE1BA3EB.txt"
if (Test-Path $sslFile) {
    $pkival = Join-Path $sslDest "pki-validation"
    New-Item -ItemType Directory -Force -Path $pkival | Out-Null
    Copy-Item $sslFile (Join-Path $pkival "ADA74535102569C97541A0CDBE1BA3EB.txt") -Force
}

# --- 5. Zip for cPanel upload ---
$zipDir = Join-Path $Deploy "zips"
New-Item -ItemType Directory -Force -Path $zipDir | Out-Null
$pubZip = Join-Path $zipDir "public_html-$Stamp.zip"
$apiZip = Join-Path $zipDir "portfolio-backend-$Stamp.zip"
$sslZip = Join-Path $zipDir "ssl-dcv-$Stamp.zip"

Compress-Archive -Path "$publicOut\*" -DestinationPath $pubZip -Force
Compress-Archive -Path "$backendOut\*" -DestinationPath $apiZip -Force
if (Test-Path $sslDest) {
    Compress-Archive -Path "$sslDest\*" -DestinationPath $sslZip -Force
}

Write-Host ""
Write-Host "DONE. Upload these in cPanel File Manager:" -ForegroundColor Green
Write-Host "  1. SSL:    extract $sslZip -> public_html/.well-known/pki-validation/"
Write-Host "  2. Site:   extract $pubZip -> public_html/ (root)"
Write-Host "  3. API:    extract $apiZip -> ~/portfolio-backend/ (NOT inside public_html)"
Write-Host ""
Write-Host "Then: Setup Python App (see docs/setup/CPANEL-MIGRATION-DEPLOY-GUIDE.md)"
