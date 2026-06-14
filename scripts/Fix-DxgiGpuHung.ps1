# Fix DXGI device hung — reset GPU OC, disable HAGS, stock power
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$Log = 'C:\PostInstall\OptimizationAudit\CHANGELOG.txt'
$Stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
function Log($m) { $l = "[$Stamp] $m"; Add-Content $Log $l; Write-Host $l }

Log '--- DXGI GPU HUNG FIX ---'

# 1) Stock GPU power (150W cap can contribute to driver recovery under spike load)
$smi = 'C:\Windows\System32\nvidia-smi.exe'
if (Test-Path $smi) {
    & $smi -pl 165 | Out-Null
    Log 'GPU power limit -> 165W (stock)'
}

# 2) Disable logon PL cap task
$task = Get-ScheduledTask -TaskName 'CaptainSolo-GpuPowerCap' -ErrorAction SilentlyContinue
if ($task -and $task.State -ne 'Disabled') {
    Disable-ScheduledTask -TaskName 'CaptainSolo-GpuPowerCap' | Out-Null
    Log 'Disabled CaptainSolo-GpuPowerCap task'
}

# 3) Reset MSI Afterburner profile to stock (OC/UV was active — top DXGI hang cause)
$gpuCfg = 'C:\Program Files (x86)\MSI Afterburner\Profiles\VEN_10DE&DEV_2805&SUBSYS_41231458&REV_A1&BUS_9&DEV_0&FN_0.cfg'
if (Test-Path $gpuCfg) {
    $stock = @'
[Startup]
Format=2
PowerLimit=100
ThermalLimit=
ThermalPrioritize=0
CoreClkBoost=0
VFCurve=
MemClkBoost=0
FanMode=1
FanSpeed=30
[Profile1]
Format=2
PowerLimit=100
ThermalLimit=
ThermalPrioritize=0
CoreClkBoost=0
VFCurve=
MemClkBoost=0
FanMode=1
FanSpeed=30
'@
    $existing = Get-Content $gpuCfg -Raw
    if ($existing -match '\[Defaults\][\s\S]*') {
        $stock += "`n" + ($existing -replace '(?s)^.*(?=\[Defaults\])', '')
    }
    Set-Content -Path $gpuCfg -Value $stock -Encoding ASCII
    Log 'Afterburner profile reset: no OC/UV, PL 100%'
}

$abExe = 'C:\Program Files (x86)\MSI Afterburner\MSIAfterburner.exe'
if (Test-Path $abExe) {
    Get-Process MSIAfterburner -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    Start-Process $abExe -ArgumentList '-profile1','-minimized' -WindowStyle Hidden
    Log 'Afterburner restarted with stock profile'
}

# 4) Disable HAGS — common DXGI device hung trigger (reboot required)
New-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers' -Name 'HwSchMode' -Value 1 -PropertyType DWord -Force | Out-Null
Log 'HAGS disabled (HwSchMode=1) — REBOOT REQUIRED'

# 5) MPO disable — reduces DWM/GPU compositor hangs on high-refresh NVIDIA
New-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows\Dwm' -Name 'OverlayTestMode' -Value 5 -PropertyType DWord -Force | Out-Null
Log 'MPO overlay disabled (OverlayTestMode=5) — REBOOT REQUIRED'

Log '--- DXGI FIX DONE — REBOOT THEN TEST ---'
