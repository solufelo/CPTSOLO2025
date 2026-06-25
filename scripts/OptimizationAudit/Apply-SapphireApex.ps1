# Master apply — audit, optimize, reclaim. Run as Administrator.
# Stack: Winhance/Sapphire base + Talon-style services + Melody MMCSS + 0.5ms timer + CompetitiveFinal
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$Root = $PSScriptRoot
$AuditRoot = 'C:\PostInstall\OptimizationAudit'
$RepoScripts = 'C:\Users\Administrator\Projects\captainsoloHQ\scripts'

if (-not (Test-Path $AuditRoot)) { New-Item -ItemType Directory -Path $AuditRoot -Force | Out-Null }

# Mirror scripts to PostInstall (Apply-CompetitiveFinal expects them there)
@('Melody-Sapphire.ps1','Apply-GamingOptimizations.ps1','Set-TimerResolution-Sapphire.ps1') | ForEach-Object {
    Copy-Item (Join-Path $Root $_) (Join-Path $AuditRoot $_) -Force
}

Write-Host '=== PRE-AUDIT ===' -ForegroundColor Cyan
& (Join-Path $Root 'Audit-CompetitiveState.ps1')

Write-Host "`n=== TIMER 0.5ms ===" -ForegroundColor Cyan
& (Join-Path $AuditRoot 'Set-TimerResolution-Sapphire.ps1')

Write-Host "`n=== MELODY MMCSS ===" -ForegroundColor Cyan
& (Join-Path $AuditRoot 'Melody-Sapphire.ps1')

Write-Host "`n=== GAMING REGISTRY + NIC ===" -ForegroundColor Cyan
& (Join-Path $AuditRoot 'Apply-GamingOptimizations.ps1')

Write-Host "`n=== MOUSE STUTTER FIX ===" -ForegroundColor Cyan
& (Join-Path $Root 'Fix-MouseStutter.ps1')

Write-Host "`n=== SERVICE CLEAN ===" -ForegroundColor Cyan
& (Join-Path $RepoScripts 'Apply-ServiceClean.ps1')

Write-Host "`n=== STARTUP CLEAN (Raw Accel only) ===" -ForegroundColor Cyan
& (Join-Path $RepoScripts 'Apply-StartupClean.ps1')

Write-Host "`n=== COMPETITIVE FINAL (games, NVIDIA, DXGI lock) ===" -ForegroundColor Cyan
& (Join-Path $RepoScripts 'Apply-CompetitiveFinal.ps1')

Write-Host "`n=== DISK RECLAIM (safe) ===" -ForegroundColor Cyan
& (Join-Path $Root 'Apply-DiskReclaim-Safe.ps1')

Write-Host "`n=== POST-AUDIT ===" -ForegroundColor Cyan
& (Join-Path $Root 'Audit-CompetitiveState.ps1')

Write-Host "`nREBOOT ONCE to finalize timer + HAGS/MPO + GlobalTimerResolutionRequests." -ForegroundColor Yellow
