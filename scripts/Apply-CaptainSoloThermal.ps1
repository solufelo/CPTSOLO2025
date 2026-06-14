# CaptainSolo Thermal — smooth CPU (Sapphire) + cool GPU
# Run as Administrator: .\Apply-CaptainSoloThermal.ps1
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'

$LogDir   = 'C:\PostInstall\OptimizationAudit'
$Log      = Join-Path $LogDir 'CHANGELOG.txt'
$Stamp    = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$Sapphire = '7ad6fd0b-3307-4ad6-b498-609f82bf1a5c'
$GpuW     = 150
$AbDir    = 'C:\Program Files (x86)\MSI Afterburner'
$AbCfg    = Join-Path $AbDir 'Profiles\MSIAfterburner.cfg'
$GpuCfg   = Join-Path $AbDir 'Profiles\VEN_10DE&DEV_2805&SUBSYS_41231458&REV_A1&BUS_9&DEV_0&FN_0.cfg'

function Log([string]$Msg) {
    $line = "[$Stamp] $Msg"
    if (Test-Path $LogDir) { Add-Content -Path $Log -Value $line -Encoding UTF8 }
    Write-Host $line
}

if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Force -Path $LogDir | Out-Null }
Log '--- CAPTAINSOLO THERMAL APPLY ---'

# 1) Sapphire plan — smooth CPU, no Cool-plan stutter
$active = (powercfg /getactivescheme) -replace '.*\((.+)\).*','$1'
powercfg /setactive $Sapphire | Out-Null
Log "Power plan: '$active' -> Sapphire"

# 2) GPU power cap
$smi = 'C:\Windows\System32\nvidia-smi.exe'
if (Test-Path $smi) {
    $out = (& $smi -pl $GpuW 2>&1 | Out-String).Trim()
    Log "GPU power limit -> ${GpuW}W ($out)"
}

# 3) Afterburner fan curve
function Build-FanCurveHex {
    $pts = @(@(30,30),@(40,40),@(50,55),@(55,65),@(60,75),@(65,85),@(70,95),@(75,100))
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append('0000010004000000000000000000')
    foreach ($p in $pts) {
        [void]$sb.Append(([BitConverter]::ToString([BitConverter]::GetBytes([single]$p[0])) -replace '-',''))
        [void]$sb.Append(([BitConverter]::ToString([BitConverter]::GetBytes([single]$p[1])) -replace '-',''))
    }
    while ($sb.Length -lt 1344) { [void]$sb.Append('0') }
    $sb.ToString().Substring(0, 1344)
}

if (Test-Path $AbCfg) {
    $curve = Build-FanCurveHex
    $txt = Get-Content $AbCfg -Raw
    $txt = $txt -replace 'SwAutoFanControl=\d+', 'SwAutoFanControl=1'
    $txt = $txt -replace 'StartWithWindows=\d+', 'StartWithWindows=1'
    $txt = $txt -replace 'StartMinimized=\d+', 'StartMinimized=1'
    $txt = $txt -replace 'SwAutoFanControlCurve=[0-9A-Fa-f]+', "SwAutoFanControlCurve=$curve"
    Set-Content -Path $AbCfg -Value $txt -NoNewline -Encoding ASCII
    Log 'Afterburner: aggressive fan curve + start with Windows'
}

if (Test-Path $GpuCfg) {
    $g = Get-Content $GpuCfg -Raw
    $g = $g -replace '(?m)^PowerLimit=\d+', 'PowerLimit=85'
    $g = $g -replace '(?m)(\[Profile1\][\s\S]*?)^FanMode=\d+', '${1}FanMode=1'
    Set-Content -Path $GpuCfg -Value $g -NoNewline -Encoding ASCII
    Log 'Afterburner GPU profile: PL 85%'
}

# 4) Logon task for GPU PL
$taskName = 'CaptainSolo-GpuPowerCap'
$plScript = Join-Path $LogDir 'Set-GpuPowerCap.ps1'
Set-Content -Path $plScript -Value @"
`$smi = 'C:\Windows\System32\nvidia-smi.exe'
if (Test-Path `$smi) { & `$smi -pl 150 | Out-Null }
Start-Sleep -Seconds 30
if (Test-Path `$smi) { & `$smi -pl 150 | Out-Null }
"@ -Encoding UTF8

$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) { Unregister-ScheduledTask -TaskName $taskName -Confirm:$false }
$action   = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$plScript`""
$trigger  = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -User $env:USERNAME -Description '140W GPU cap at logon' | Out-Null
Log 'Task: CaptainSolo-GpuPowerCap'

# 5) Apply Afterburner now
$abExe = Join-Path $AbDir 'MSIAfterburner.exe'
if (Test-Path $abExe) {
    Get-Process MSIAfterburner -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
    Start-Process -FilePath $abExe -ArgumentList '-profile1','-minimized' -WindowStyle Hidden
    Log 'Afterburner restarted'
}

Log 'Set NVIDIA Max Frame Rate 380 in Control Panel (one click)'
Log 'BIOS: PBO Disabled — see COOL-CONSISTENT.md'
Log '--- DONE ---'
