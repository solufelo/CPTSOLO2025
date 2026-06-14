# Startup clean — Raw Accel only
#Requires -RunAsAdministrator
$ErrorActionPreference = 'Stop'

$BackupPath = 'C:\PostInstall\OptimizationAudit\startup-backup.json'
$Keep   = 'RawAccel'
$Disabled = [byte[]](0x03,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00)
$Enabled  = [byte[]](0x02,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00)

$runPaths = @(
    @{ Run = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'; Approved = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run' }
    @{ Run = 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Run'; Approved = 'HKLM:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run' }
)

$backup = [ordered]@{ timestamp = (Get-Date -Format 'o'); entries = @() }

foreach ($p in $runPaths) {
    if (-not (Test-Path $p.Run)) { continue }
    $props = Get-ItemProperty $p.Run
    $props.PSObject.Properties | Where-Object { $_.Name -notmatch '^PS' } | ForEach-Object {
        $backup.entries += [ordered]@{ hive = $p.Run; name = $_.Name; command = $_.Value }
        if ($p.Run -like 'HKCU*' -and $_.Name -eq $Keep) { return }
        Remove-ItemProperty -Path $p.Run -Name $_.Name -ErrorAction SilentlyContinue
        if (Test-Path $p.Approved) {
            Set-ItemProperty -Path $p.Approved -Name $_.Name -Value $Disabled -Type Binary -Force -ErrorAction SilentlyContinue
        }
        Write-Host "OFF  $($_.Name)"
    }
}

# Ensure Raw Accel stays enabled (HKCU)
$raw = '"C:\Tools\RawAccel\RawAccel\writer.exe" "C:\Tools\RawAccel\RawAccel\settings.json"'
if (-not (Test-Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run')) {
    New-Item -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Force | Out-Null
}
Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run' -Name $Keep -Value $raw -Force
$approved = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved\Run'
if (-not (Test-Path $approved)) { New-Item -Path $approved -Force | Out-Null }
Set-ItemProperty -Path $approved -Name $Keep -Value $Enabled -Type Binary -Force
Write-Host "ON   $Keep"

# MSI Afterburner — not a Run key, uses scheduled task + cfg
$abTask = Get-ScheduledTask -TaskName 'MSIAfterburner' -ErrorAction SilentlyContinue
if ($abTask -and $abTask.State -ne 'Disabled') {
    Disable-ScheduledTask -TaskName 'MSIAfterburner' | Out-Null
    Write-Host 'OFF  MSIAfterburner (scheduled task)'
}
$abCfg = 'C:\Program Files (x86)\MSI Afterburner\Profiles\MSIAfterburner.cfg'
if (Test-Path $abCfg) {
    (Get-Content $abCfg -Raw) -replace 'StartWithWindows=\d+', 'StartWithWindows=0' | Set-Content $abCfg -NoNewline -Encoding ASCII
    Write-Host 'OFF  MSI Afterburner (StartWithWindows=0)'
}

$backup | ConvertTo-Json -Depth 4 | Set-Content $BackupPath -Encoding UTF8
Write-Host "Backup: $BackupPath"
