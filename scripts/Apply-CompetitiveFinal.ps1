# Final competitive push — latency max, DXGI-crash safe
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$Log = 'C:\PostInstall\OptimizationAudit\CHANGELOG.txt'
$Stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
function Log($m) { $l = "[$Stamp] [COMP-FINAL] $m"; Add-Content $Log $l; Write-Host $l }

Log '--- COMPETITIVE FINAL APPLY (crash-safe) ---'

# === DXGI STABILITY LOCK (never trade for FPS) ===
New-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers' -Name 'HwSchMode' -Value 1 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows\Dwm' -Name 'OverlayTestMode' -Value 5 -PropertyType DWord -Force | Out-Null
if (Test-Path 'C:\Windows\System32\nvidia-smi.exe') { & nvidia-smi -pl 165 | Out-Null }
$cap = Get-ScheduledTask -TaskName 'CaptainSolo-GpuPowerCap' -ErrorAction SilentlyContinue
if ($cap -and $cap.State -ne 'Disabled') { Disable-ScheduledTask -TaskName 'CaptainSolo-GpuPowerCap' | Out-Null }
Log 'DXGI lock: HAGS off, MPO off, GPU 165W, PL task off'

# Stock Afterburner — no OC
$gpuCfg = 'C:\Program Files (x86)\MSI Afterburner\Profiles\VEN_10DE&DEV_2805&SUBSYS_41251458&REV_A1&BUS_9&DEV_0&FN_0.cfg'
$gpuCfg2 = 'C:\Program Files (x86)\MSI Afterburner\Profiles\VEN_10DE&DEV_2805&SUBSYS_41231458&REV_A1&BUS_9&DEV_0&FN_0.cfg'
foreach ($g in @($gpuCfg, $gpuCfg2)) {
    if (-not (Test-Path $g)) { continue }
    $txt = Get-Content $g -Raw
    $txt = $txt -replace '(?m)^PowerLimit=\d+', 'PowerLimit=100'
    $txt = $txt -replace '(?m)^CoreClkBoost=-?\d+', 'CoreClkBoost=0'
    $txt = $txt -replace '(?m)^MemClkBoost=\d+', 'MemClkBoost=0'
    $txt = $txt -replace '(?m)^VFCurve=.*', 'VFCurve='
    Set-Content $g -Value $txt -Encoding ASCII
}
Log 'Afterburner: stock clocks enforced'

# === CORE STACK (existing proven scripts) ===
& 'C:\PostInstall\OptimizationAudit\Melody-Sapphire.ps1'
Log 'Melody-Sapphire applied'

& 'C:\PostInstall\OptimizationAudit\Apply-GamingOptimizations.ps1'
Log 'Apply-GamingOptimizations applied'

# === PER-GAME (no startup bloat) ===
$compat = 'HKCU:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers'
$gpuPref = 'HKCU:\SOFTWARE\Microsoft\DirectX\UserGpuPreferences'
if (-not (Test-Path $compat)) { New-Item -Path $compat -Force | Out-Null }
if (-not (Test-Path $gpuPref)) { New-Item -Path $gpuPref -Force | Out-Null }

$gameList = @(
    @{ Name='Valorant'; Exe='C:\Riot Games\VALORANT\live\ShooterGame\Binaries\Win64\VALORANT-Win64-Shipping.exe'; QoS='ValorantComp' }
    @{ Name='Overwatch'; Exe='C:\Program Files (x86)\Steam\steamapps\common\Overwatch\Overwatch.exe'; QoS='OverwatchComp' }
    @{ Name='Marvel Rivals'; Exe='C:\Program Files (x86)\Steam\steamapps\common\Marvel Rivals\MarvelGame\Binaries\Win64\Marvel-Win64-Shipping.exe'; QoS='MarvelComp' }
    @{ Name='Apex'; Exe='C:\Program Files (x86)\Steam\steamapps\common\Apex Legends\r5apex.exe'; QoS='ApexComp' }
    @{ Name='CS2'; Exe='C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe'; QoS='CS2Comp' }
)

foreach ($g in $gameList) {
    if (-not (Test-Path $g.Exe)) { Log "$($g.Name): not installed, skip"; continue }
    Set-ItemProperty -Path $compat -Name $g.Exe -Value '~ DISABLEDXMAXIMIZEDWINDOWEDMODE HIGHDPIAWARE' -Force
    Set-ItemProperty -Path $gpuPref -Name $g.Exe -Value 'GpuPreference=2;' -Force
    $qos = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\QoS\$($g.QoS)"
    New-Item -Path $qos -Force | Out-Null
    @(
        @{N='Version';V='1.0'},@{N='Application Name';V=$g.Exe},@{N='Protocol';V='*'},@{N='Local Port';V='*'},
        @{N='Local IP';V='*'},@{N='Local IP Prefix Length';V='*'},@{N='Remote Port';V='*'},@{N='Remote IP';V='*'},
        @{N='Remote IP Prefix Length';V='*'},@{N='DSCP Value';V='46'},@{N='Throttle Rate';V='-1'}
    ) | ForEach-Object { Set-ItemProperty -Path $qos -Name $_.N -Value $_.V -Force }
    Log "$($g.Name): FSE + GPU perf + QoS DSCP 46"
}

# === MOUSE (Windows accel off — Raw Accel handles curve) ===
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseSpeed' -Value '0' -Force
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseThreshold1' -Value '0' -Force
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseThreshold2' -Value '0' -Force
Log 'Mouse: Enhance pointer precision OFF'

# === STARTUP: Raw Accel only ===
& "$PSScriptRoot\Apply-StartupClean.ps1"
Log 'Startup: Raw Accel only'

# === NVIDIA PROFILES ===
$npi = 'C:\PostInstall\GPU\Nvidia\NIP\nvidiaProfileInspector.exe'
$base = 'C:\PostInstall\GPU\Nvidia\NIP\Settings.nip'
$games = 'C:\PostInstall\OptimizationAudit\Competitive-Games.nip'
$global = 'C:\PostInstall\OptimizationAudit\Competitive-Global.nip'
if (-not (Test-Path $global)) {
    @'
<?xml version="1.0" encoding="utf-16"?>
<ArrayOfProfile>
  <Profile>
    <ProfileName>Base Profile</ProfileName>
    <Executeables />
    <Settings>
      <ProfileSetting>
        <SettingNameInfo>Frame Rate Limiter</SettingNameInfo>
        <SettingID>277041134</SettingID>
        <SettingValue>380</SettingValue>
        <ValueType>Dword</ValueType>
      </ProfileSetting>
      <ProfileSetting>
        <SettingNameInfo>Max Frame Rate</SettingNameInfo>
        <SettingID>277041162</SettingID>
        <SettingValue>380</SettingValue>
        <ValueType>Dword</ValueType>
      </ProfileSetting>
    </Settings>
  </Profile>
</ArrayOfProfile>
'@ | Set-Content $global -Encoding Unicode
}
if ((Test-Path $npi) -and (Test-Path $base) -and (Test-Path $games)) {
    Stop-Process -Name nvidiaProfileInspector -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    $p = Start-Process -FilePath $npi -ArgumentList @('-silentImport', $base, $games, $global) -PassThru -Wait
    Log "NVIDIA profiles imported (exit $($p.ExitCode))"
} else {
    Log 'NVIDIA Profile Inspector import skipped (missing files)'
}

# === GAME BAR / DVR off ===
New-ItemProperty -Path 'HKCU:\Software\Microsoft\GameBar' -Name AllowAutoGameMode -Value 0 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\Software\Microsoft\GameBar' -Name AutoGameModeEnabled -Value 0 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name GameDVR_Enabled -Value 0 -PropertyType DWord -Force | Out-Null
Log 'Game Bar / DVR off'

Log '--- COMPETITIVE FINAL DONE — REBOOT ONCE ---'
Log 'BIOS reminder: remove 65C temp cap, PBO Disabled only'
Write-Host ''
Write-Host 'Stack: Sapphire + 0.5ms timer + Melody MMCSS + Val QoS + NVIDIA comp profiles'
Write-Host 'Safe:   no HAGS, no GPU OC, no PL cap, Raw Accel only at boot'
Write-Host 'Reboot once, then play.'
