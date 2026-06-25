# Build portfolio demo zips for cPanel subdomains
# Usage: .\scripts\prepare-portfolio-subdomain.ps1 -Project velare
#        .\scripts\prepare-portfolio-subdomain.ps1 -Project all

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('velare', 'suburbia', 'captain-funds', 'all')]
    [string]$Project
)

$ErrorActionPreference = "Stop"
$HqRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$ProjectsRoot = Split-Path -Parent $HqRoot
$Deploy = Join-Path $HqRoot "deploy\cpanel"
$Stamp = Get-Date -Format "yyyyMMdd-HHmm"
$Node = Join-Path $HqRoot ".tools\node"
$env:Path = $Node + ';' + $env:Path

$definitions = @{
    'velare' = @{
        RepoPath   = Join-Path $ProjectsRoot 'velare-site'
        BuildKind  = 'next'
        OutputDir  = 'out'
        Htaccess   = Join-Path $Deploy 'velare\.htaccess'
        ZipPrefix  = 'velare'
        PreBuild   = { }
        Build      = { param($r) Push-Location $r; npm install; npm run build; Pop-Location }
    }
    'suburbia' = @{
        RepoPath   = Join-Path $ProjectsRoot 'suburbia-solo'
        BuildKind  = 'next'
        OutputDir  = 'out'
        Htaccess   = Join-Path $Deploy 'velare\.htaccess'
        ZipPrefix  = 'suburbia'
        PreBuild   = {
            param($r)
            $script:SuburbiaStash = Join-Path $env:TEMP "suburbia-deploy-stash-$Stamp"
            if (Test-Path $script:SuburbiaStash) { Remove-Item $script:SuburbiaStash -Recurse -Force }
            New-Item -ItemType Directory -Force -Path $script:SuburbiaStash | Out-Null
            foreach ($name in @('api', 'slice-simulator')) {
                $p = Join-Path "$r\src\app" $name
                if (Test-Path $p) { Move-Item $p (Join-Path $script:SuburbiaStash $name) -Force }
            }
            Remove-Item "$r\.next" -Recurse -Force -ErrorAction SilentlyContinue
        }
        PostBuild  = {
            param($r)
            if (-not $script:SuburbiaStash) { return }
            foreach ($name in @('api', 'slice-simulator')) {
                $from = Join-Path $script:SuburbiaStash $name
                $to = Join-Path "$r\src\app" $name
                if (Test-Path $from) { Move-Item $from $to -Force }
            }
        }
        Build      = { param($r) Push-Location $r; npm install; npm run build; Pop-Location }
    }
    'captain-funds' = @{
        RepoPath   = Join-Path $ProjectsRoot 'CAPTAIN-FUNDS-MERN\client'
        BuildKind  = 'vite'
        OutputDir  = 'dist'
        Htaccess   = Join-Path $Deploy 'spa\.htaccess'
        ZipPrefix  = 'captain-funds'
        PreBuild   = { }
        Build      = { param($r) Push-Location $r; npm install; npx vite build; Pop-Location }
    }
}

function Build-PortfolioDemo {
    param([string]$Key)

    $def = $definitions[$Key]
    Write-Host "`n=== $Key ===" -ForegroundColor Cyan

    if (-not (Test-Path $def.RepoPath)) {
        Write-Warning "SKIP $Key - repo not found at $($def.RepoPath)"
        return
    }

    & $def.PreBuild $def.RepoPath
    try {
        & $def.Build $def.RepoPath
        if ($LASTEXITCODE -ne 0) { throw "Build failed for $Key" }

        $out = Join-Path $def.RepoPath $def.OutputDir
        if (-not (Test-Path $out)) { throw "Missing output: $out" }

        $stage = Join-Path $Deploy "$($def.ZipPrefix)-staging"
        if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
        New-Item -ItemType Directory -Force -Path $stage | Out-Null
        Copy-Item "$out\*" $stage -Recurse -Force
        Copy-Item $def.Htaccess (Join-Path $stage '.htaccess') -Force

        $zipDir = Join-Path $Deploy 'zips'
        New-Item -ItemType Directory -Force -Path $zipDir | Out-Null
        $zip = Join-Path $zipDir "$($def.ZipPrefix)-$Stamp.zip"
        Compress-Archive -Path "$stage\*" -DestinationPath $zip -Force

        $sizeMb = [math]::Round((Get-Item $zip).Length / 1MB, 1)
        Write-Host "OK $Key - $sizeMb MB -> $zip" -ForegroundColor Green
    }
    finally {
        if ($def.PostBuild) { & $def.PostBuild $def.RepoPath }
    }
}

Write-Host "Portfolio subdomain deploy prep" -ForegroundColor Cyan
Write-Host "Docs: docs/setup/PORTFOLIO-DEMOS-PIPELINE.md"

if ($Project -eq 'all') {
    foreach ($k in @('velare', 'suburbia', 'captain-funds')) { Build-PortfolioDemo $k }
}
else {
    Build-PortfolioDemo $Project
}
