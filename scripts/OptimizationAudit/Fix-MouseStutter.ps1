# Mouse stutter audit + minimal safe fixes — SapphireOS competitive stack
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'
$AuditRoot = 'C:\PostInstall\OptimizationAudit'
$Log = Join-Path $AuditRoot 'CHANGELOG.txt'
$Stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
function Log($m) { $l = "[$Stamp] [MOUSE-FIX] $m"; Add-Content $Log $l; Write-Host $l }

Log '--- Fix-MouseStutter audit ---'

# --- Audit ---
$mouse = Get-ItemProperty 'HKCU:\Control Panel\Mouse'
$eppOff = ($mouse.MouseSpeed -eq '0' -and $mouse.MouseThreshold1 -eq '0' -and $mouse.MouseThreshold2 -eq '0')
$throttle = $mouse.RawMouseThrottleDuration
$rawRunning = [bool](Get-Process -Name writer -ErrorAction SilentlyContinue)
$mice = Get-PnpDevice -Class Mouse -ErrorAction SilentlyContinue
$hidusbf = Get-Service -Name hidusbf -ErrorAction SilentlyContinue
$mpo = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\Dwm' -ErrorAction SilentlyContinue).OverlayTestMode
$refresh = (Get-CimInstance Win32_VideoController | Where-Object { $_.Name -notmatch 'Microsoft' }).CurrentRefreshRate

Log "EPP off: $eppOff | RawMouseThrottleDuration: $throttle | Raw Accel writer: $rawRunning"
Log "Mouse endpoints: $($mice.Count) | hidusbf service: $(if ($hidusbf) { $hidusbf.Status } else { 'not installed' })"
Log "MPO OverlayTestMode: $mpo (5=off) | Refresh: ${refresh}Hz"
$mice | ForEach-Object { Log "  [$($_.Status)] $($_.InstanceId)" }

# --- Fixes (minimal, reversible) ---
if ($throttle -ne 0) {
    Set-ItemProperty 'HKCU:\Control Panel\Mouse' -Name RawMouseThrottleDuration -Value 0 -Type DWord -Force
    Log 'FIX: RawMouseThrottleDuration -> 0 (was Win11 raw-input throttle)'
}

$usbGuid = '2a737441-1930-4402-8d77-b2bebba308a3'
$suspendGuid = '48e6b7a6-50f5-4782-a5d4-53bb8f07e226'
powercfg /setacvalueindex SCHEME_CURRENT $usbGuid $suspendGuid 0 | Out-Null
powercfg /setdcvalueindex SCHEME_CURRENT $usbGuid $suspendGuid 0 | Out-Null
powercfg /setactive SCHEME_CURRENT | Out-Null
Log 'FIX: USB selective suspend -> disabled'

if (-not $rawRunning) {
    $writer = 'C:\Tools\RawAccel\RawAccel\writer.exe'
    $settings = 'C:\Tools\RawAccel\RawAccel\settings.json'
    if (Test-Path $writer) {
        Start-Process -FilePath $writer -ArgumentList "`"$settings`"" -WindowStyle Hidden
        Start-Sleep -Seconds 2
        Log "FIX: Started Raw Accel writer (EPP was off without curve driver active)"
    }
}

$ghost = $mice | Where-Object { $_.Status -eq 'Unknown' -or $_.Status -eq 'Error' }
foreach ($g in $ghost) {
    Disable-PnpDevice -InstanceId $g.InstanceId -Confirm:$false -ErrorAction SilentlyContinue
    Log "FIX: Disabled ghost mouse $($g.InstanceId)"
}

$wootingMouse = $mice | Where-Object { $_.InstanceId -match 'VID_3837' -and $_.Status -eq 'OK' }
if ($wootingMouse) {
    Log 'WARN: Wooting analog keyboard exposes a 2nd HID mouse - top suspect for desktop double-take'
    Log '      Disable in Wooting software (analog mouse emulation) OR run: -DisableWootingMouseHID'
}

if ($args -contains '-DisableWootingMouseHID' -and $wootingMouse) {
    Disable-PnpDevice -InstanceId $wootingMouse.InstanceId -Confirm:$false
    Log "FIX: Disabled Wooting mouse HID $($wootingMouse.InstanceId) - re-enable in Device Manager if analog breaks"
}

Log '--- Fix-MouseStutter done ---'
