# Read-only competitive FPS audit — SapphireOS / 5800X / 4060 Ti
#Requires -RunAsAdministrator
$ErrorActionPreference = 'SilentlyContinue'

function Row($k, $v, $ok) {
    $flag = if ($ok) { '[OK]' } else { '[!!]' }
    [PSCustomObject]@{ Flag = $flag; Check = $k; Value = $v }
}

$rows = @()

# Hardware
$cpu = (Get-CimInstance Win32_Processor).Name.Trim()
$gpu = (Get-CimInstance Win32_VideoController | Where-Object { $_.Name -notmatch 'Microsoft' }).Name
$ram = [math]::Round((Get-CimInstance Win32_PhysicalMemory | Measure-Object Capacity -Sum).Sum / 1GB)
$rows += Row 'CPU' $cpu $true
$rows += Row 'GPU' $gpu $true
$rows += Row 'RAM' "${ram}GB" ($ram -ge 32)

# Power
$active = (powercfg /getactivescheme) -replace '.*\((.+)\).*', '$1'
$rows += Row 'Power plan' $active ($active -match 'Sapphire')

# Timer
$gtr = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\kernel').GlobalTimerResolutionRequests
$rows += Row 'GlobalTimerResolutionRequests' $(if ($gtr -eq 1) { '1' } else { 'not set' }) ($gtr -eq 1)
$timerTask = Get-ScheduledTask -TaskName 'Sapphire-TimerResolution' -ErrorAction SilentlyContinue
$rows += Row 'Timer holder task' $(if ($timerTask) { $timerTask.State } else { 'missing' }) ($null -ne $timerTask)

Add-Type @'
using System; using System.Runtime.InteropServices;
public static class NtQ { [DllImport("ntdll.dll")] public static extern int NtQueryTimerResolution(out uint Min, out uint Max, out uint Current); }
'@
$mn=[uint32]0;$mx=[uint32]0;$cr=[uint32]0; [void][NtQ]::NtQueryTimerResolution([ref]$mn,[ref]$mx,[ref]$cr)
$curMs = [math]::Round($cr/10000.0,4)
$rows += Row 'Current timer (ms)' $curMs ($curMs -le 1.0)

# Graphics
$hags = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\GraphicsDrivers').HwSchMode
$mpo = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\Dwm').OverlayTestMode
$rows += Row 'HAGS (1=off)' $hags ($hags -eq 1)
$rows += Row 'MPO (5=off)' $mpo ($mpo -eq 5)

# Game DVR
$dvr = (Get-ItemProperty 'HKCU:\System\GameConfigStore').GameDVR_Enabled
$rows += Row 'GameDVR' $(if ($dvr -eq 0) { 'off' } else { 'on' }) ($dvr -eq 0)

# MMCSS
$games = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Tasks\Games'
$rows += Row 'MMCSS Games Priority' $games.Priority ($games.Priority -ge 6)
$rows += Row 'MMCSS Latency Sensitive' $games.'Latency Sensitive' ($games.'Latency Sensitive' -eq 'True')

# Boot
$bcd = bcdedit /enum '{current}' 2>$null
$ddt = if ($bcd -match 'disabledynamictick\s+Yes') { 'Yes' } else { 'No' }
$rows += Row 'disabledynamictick' $ddt ($ddt -eq 'Yes')

# Startup bloat
$run = Get-ItemProperty 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$startupNames = $run.PSObject.Properties | Where-Object { $_.Name -notmatch '^PS' } | Select-Object -ExpandProperty Name
$rows += Row 'Startup (HKCU Run)' ($startupNames -join ', ') ($startupNames.Count -le 1 -and $startupNames -contains 'RawAccel')

# Disk
$winOld = if (Test-Path 'C:\Windows.old') {
    $gb = [math]::Round((Get-ChildItem 'C:\Windows.old' -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1GB)
    "${gb}GB reclaimable"
} else { 'none' }
$rows += Row 'Windows.old' $winOld ($winOld -eq 'none')

$cFree = 0
$disk = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'" -ErrorAction SilentlyContinue
if ($disk -and $disk.FreeSpace) { $cFree = [math]::Round($disk.FreeSpace / 1GB) }
if ($cFree -le 0) {
    $fs = fsutil volume diskfree C: 2>$null | Select-String 'Total free bytes'
    if ($fs -match ':\s+([\d,.\s]+)\s+\(([\d,.\s]+)\sGB\)') { $cFree = [math]::Round([double]($matches[2] -replace ',','.')) }
}
$rows += Row 'C: free GB' $cFree ($cFree -gt 100)

$rows | Format-Table -AutoSize
$issues = ($rows | Where-Object { $_.Flag -eq '[!!]' }).Count
Write-Host "`nIssues found: $issues"
if ($issues -gt 0) { exit 1 }
