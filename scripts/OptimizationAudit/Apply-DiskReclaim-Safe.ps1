# Safe disk reclaim — does NOT touch dev tools (vcpkg, Projects, node_modules)
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Continue'
$Log = 'C:\PostInstall\OptimizationAudit\CHANGELOG.txt'
$logDir = Split-Path $Log
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
$Stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
function Log($m) { Add-Content $Log "[$Stamp] [DISK] $m"; Write-Host $m }

Log '--- Safe disk reclaim ---'
$freed = 0

function Remove-ReclaimTarget([string]$TargetPath, [string]$Label) {
    if (-not (Test-Path $TargetPath)) { Log "$Label : skip (not found)"; return }
    $before = (Get-ChildItem $TargetPath -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum
    try {
        Remove-Item $TargetPath -Recurse -Force -ErrorAction Stop
        $script:freed += $before
        Log "$Label : removed $([math]::Round($before/1GB,2)) GB"
    } catch {
        Log "$Label : partial/failed - $($_.Exception.Message)"
    }
}

function Remove-WindowsOldFast {
    if (-not (Test-Path 'C:\Windows.old')) { Log 'Windows.old : skip (not found)'; return }
    $beforeFree = (Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'").FreeSpace
    Log 'Windows.old found - using Disk Cleanup (reliable for large previous installs)...'
    $prev = 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\VolumeCaches\Previous Installations'
    if (Test-Path $prev) {
        Set-ItemProperty -Path $prev -Name StateFlags0001 -Value 2 -Type DWord -Force
    }
    $cleanmgr = "$env:SystemRoot\System32\cleanmgr.exe"
    if (Test-Path $cleanmgr) {
        Start-Process -FilePath $cleanmgr -ArgumentList '/d', 'C:', '/sagerun:1' -Wait -NoNewWindow
    }
    if (Test-Path 'C:\Windows.old') {
        Log 'Windows.old : cleanmgr incomplete - trying robocopy mirror delete...'
        $empty = 'C:\PostInstall\_empty_mirror'
        New-Item -ItemType Directory -Path $empty -Force | Out-Null
        & takeown /F 'C:\Windows.old' /R /D Y 2>$null | Out-Null
        & icacls 'C:\Windows.old' /grant Administrators:F /T 2>$null | Out-Null
        & robocopy $empty 'C:\Windows.old' /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS /NC /NS /NP | Out-Null
        Remove-Item 'C:\Windows.old' -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item $empty -Recurse -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path 'C:\Windows.old') {
        Log 'Windows.old : still present - run Storage Settings > Cleanup recommendations manually'
    } else {
        $afterFree = (Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'").FreeSpace
        $script:freed += [math]::Max(0, $afterFree - $beforeFree)
        Log "Windows.old : removed ($([math]::Round($script:freed/1GB,1)) GB freed on C:)"
    }
}

Remove-WindowsOldFast

foreach ($t in @($env:TEMP, 'C:\Windows\Temp')) {
    if (Test-Path $t) {
        Get-ChildItem $t -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
        Log "Cleared $t"
    }
}

$do = 'C:\Windows\ServiceProfiles\NetworkService\AppData\Local\Microsoft\Windows\DeliveryOptimization\Cache'
if (Test-Path $do) {
    Get-ChildItem $do -Force -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    Log 'Delivery Optimization cache cleared'
}

& Dism.exe /Online /Cleanup-Image /StartComponentCleanup /ResetBase 2>&1 | Out-Null
Log 'DISM component cleanup run'

Remove-ReclaimTarget 'C:\Tools\RawAccel_v1.7.1.zip' 'RawAccel zip'

Log "Total reclaimed (approx): $([math]::Round($freed/1GB,2)) GB"
Log '--- Disk reclaim done ---'
