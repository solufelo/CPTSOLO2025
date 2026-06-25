# Melody-style MMCSS + scheduler tuning for SapphireOS / Ryzen 5800X
# Tradeoff: SystemResponsiveness=10 reserves ~10% CPU for background; lower values are clamped on Win11.
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'

$mmcss = 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile'
$games = "$mmcss\Tasks\Games"

New-Item -Path $games -Force | Out-Null

Set-ItemProperty -Path $mmcss -Name 'SystemResponsiveness' -Value 10 -Type DWord -Force
Set-ItemProperty -Path $mmcss -Name 'NetworkThrottlingIndex' -Value 0xFFFFFFFF -Type DWord -Force
Set-ItemProperty -Path $mmcss -Name 'NoLazyMode' -Value 1 -Type DWord -Force
Set-ItemProperty -Path $mmcss -Name 'AlwaysOn' -Value 1 -Type DWord -Force

@{
    'Affinity'            = 0
    'Background Only'     = 'False'
    'Clock Rate'          = 10000
    'GPU Priority'        = 8
    'Priority'            = 8
    'Scheduling Category' = 'High'
    'SFIO Priority'       = 'High'
    'Latency Sensitive'   = 'True'
} | ForEach-Object {
    $_.GetEnumerator() | ForEach-Object {
        Set-ItemProperty -Path $games -Name $_.Key -Value $_.Value -Force
    }
}

$cpu = 'HKLM:\SYSTEM\CurrentControlSet\Control\PriorityControl'
if (-not (Test-Path $cpu)) { New-Item -Path $cpu -Force | Out-Null }
Set-ItemProperty -Path $cpu -Name 'Win32PrioritySeparation' -Value 38 -Type DWord -Force

Write-Host 'Melody-Sapphire: MMCSS Games=High, SystemResponsiveness=10, Win32PrioritySeparation=38'
