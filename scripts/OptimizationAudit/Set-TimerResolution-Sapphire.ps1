# Permanent 0.5ms timer resolution — Ryzen 5800X / SapphireOS desktop
# 5000 = 0.5ms in 100ns units. GlobalTimerResolutionRequests fixes Win11 background-window bug.
# Tradeoff: ~1-2% idle power increase; major frame-pacing win in comp FPS.
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'

$AuditRoot = 'C:\PostInstall\OptimizationAudit'
if (-not (Test-Path $AuditRoot)) { New-Item -ItemType Directory -Path $AuditRoot -Force | Out-Null }

$Desired = 5000
$TaskName = 'Sapphire-TimerResolution'
$Holder = Join-Path $AuditRoot 'Hold-TimerResolution.ps1'
$Log = Join-Path $AuditRoot 'CHANGELOG.txt'

New-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\kernel' `
    -Name 'GlobalTimerResolutionRequests' -Value 1 -PropertyType DWord -Force | Out-Null

Add-Type @'
using System;
using System.Runtime.InteropServices;
public static class NtTimer {
    [DllImport("ntdll.dll")]
    public static extern int NtSetTimerResolution(uint DesiredResolution, bool SetResolution, out uint CurrentResolution);
    [DllImport("ntdll.dll")]
    public static extern int NtQueryTimerResolution(out uint Min, out uint Max, out uint Current);
}
'@

$cur = [uint32]0
[void][NtTimer]::NtSetTimerResolution([uint32]$Desired, $true, [ref]$cur)
$min = [uint32]0; $max = [uint32]0; $now = [uint32]0
[void][NtTimer]::NtQueryTimerResolution([ref]$min, [ref]$max, [ref]$now)
$ms = [math]::Round($now / 10000.0, 4)
Write-Host "Timer resolution: ${ms}ms (target 0.5ms)"

@'
param([int]$Desired = 5000)
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class NtTimer {
    [DllImport("ntdll.dll")]
    public static extern int NtSetTimerResolution(uint DesiredResolution, bool SetResolution, out uint CurrentResolution);
}
"@
while ($true) {
    $c = [uint32]0
    [void][NtTimer]::NtSetTimerResolution([uint32]$Desired, $true, [ref]$c)
    Start-Sleep -Seconds 30
}
'@ | Set-Content $Holder -Encoding UTF8

$action = New-ScheduledTaskAction -Execute 'powershell.exe' `
    -Argument "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$Holder`" -Desired $Desired"
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger (New-ScheduledTaskTrigger -AtLogOn) `
    -Settings $settings -RunLevel Highest -Force | Out-Null
Register-ScheduledTask -TaskName "$TaskName-Boot" -Action $action -Trigger (New-ScheduledTaskTrigger -AtStartup) `
    -Settings $settings -RunLevel Highest -Force | Out-Null

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
Add-Content $Log "[$stamp] [TIMER] 0.5ms holder + GlobalTimerResolutionRequests=1 (current ${ms}ms)"
Write-Host "Scheduled tasks: $TaskName, $TaskName-Boot"
