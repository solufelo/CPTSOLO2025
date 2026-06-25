# Core gaming registry + network — DXGI-safe (HAGS off, MPO off)
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$AuditRoot = 'C:\PostInstall\OptimizationAudit'
if (-not (Test-Path $AuditRoot)) { New-Item -ItemType Directory -Path $AuditRoot -Force | Out-Null }
$Log = Join-Path $AuditRoot 'CHANGELOG.txt'
$Stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
function Log($m) { $l = "[$Stamp] [GAMING] $m"; Add-Content $Log $l; Write-Host $l }

Log '--- Apply-GamingOptimizations ---'

New-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers' -Name 'HwSchMode' -Value 1 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows\Dwm' -Name 'OverlayTestMode' -Value 5 -PropertyType DWord -Force | Out-Null
Log 'HAGS off, MPO off'

New-ItemProperty -Path 'HKCU:\Software\Microsoft\GameBar' -Name 'AllowAutoGameMode' -Value 0 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\Software\Microsoft\GameBar' -Name 'AutoGameModeEnabled' -Value 0 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name 'GameDVR_Enabled' -Value 0 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name 'GameDVR_FSEBehaviorMode' -Value 2 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name 'GameDVR_HonorUserFSEBehaviorMode' -Value 1 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name 'GameDVR_DXGIHonorFSEWindowsCompatible' -Value 1 -PropertyType DWord -Force | Out-Null
New-ItemProperty -Path 'HKCU:\System\GameConfigStore' -Name 'GameDVR_EFSEFeatureFlags' -Value 0 -PropertyType DWord -Force | Out-Null
Log 'Game DVR off, FSE behavior optimized'

$cdm = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager'
if (Test-Path $cdm) {
    'SystemPaneSuggestionsEnabled','SubscribedContent-338388Enabled','SubscribedContent-338389Enabled',
    'SubscribedContent-353694Enabled','SubscribedContent-353696Enabled','SilentInstalledAppsEnabled' | ForEach-Object {
        Set-ItemProperty -Path $cdm -Name $_ -Value 0 -Force -ErrorAction SilentlyContinue
    }
}
Log 'Content delivery suggestions off'

$bg = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\BackgroundAccessApplications'
if (Test-Path $bg) {
    Get-ChildItem $bg | ForEach-Object {
        Set-ItemProperty -Path $_.PSPath -Name 'Disabled' -Value 1 -Force -ErrorAction SilentlyContinue
    }
}
Log 'Background app access disabled'

Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseSpeed' -Value '0' -Force
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseThreshold1' -Value '0' -Force
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'MouseThreshold2' -Value '0' -Force
Set-ItemProperty -Path 'HKCU:\Control Panel\Mouse' -Name 'RawMouseThrottleDuration' -Value 0 -Type DWord -Force
Log 'Enhance pointer precision off, RawMouseThrottleDuration=0'

$usbGuid = '2a737441-1930-4402-8d77-b2bebba308a3'
$suspendGuid = '48e6b7a6-50f5-4782-a5d4-53bb8f07e226'
powercfg /setacvalueindex SCHEME_CURRENT $usbGuid $suspendGuid 0 | Out-Null
powercfg /setdcvalueindex SCHEME_CURRENT $usbGuid $suspendGuid 0 | Out-Null
powercfg /setactive SCHEME_CURRENT | Out-Null
Log 'USB selective suspend disabled'

if (Test-Path 'C:\Windows\System32\nvidia-smi.exe') {
    & nvidia-smi -pl 165 | Out-Null
    Log 'GPU power limit 165W stock'
}

$nic = Get-NetAdapter -Physical -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq 'Up' } | Select-Object -First 1
if ($nic) {
    Set-NetAdapterAdvancedProperty -Name $nic.Name -DisplayName 'Interrupt Moderation' -DisplayValue 'Disabled' -ErrorAction SilentlyContinue
    Set-NetAdapterAdvancedProperty -Name $nic.Name -DisplayName 'Flow Control' -DisplayValue 'Disabled' -ErrorAction SilentlyContinue
    Log "NIC $($nic.Name): Interrupt Moderation off, Flow Control off"
}

& netsh int tcp set global autotuninglevel=normal 2>$null | Out-Null
& netsh int tcp set global timestamps=disabled 2>$null | Out-Null
& netsh int tcp set global rss=enabled 2>$null | Out-Null
Log 'TCP globals refreshed'

$Sapphire = '7ad6fd0b-3307-4ad6-b498-609f82bf1a5c'
powercfg /setactive $Sapphire | Out-Null
Log 'Power plan: Sapphire'

Log '--- Apply-GamingOptimizations done ---'
