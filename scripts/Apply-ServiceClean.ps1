# Conservative service clean — disable obvious bloat only, keep gaming/audio/net/security
#Requires -RunAsAdministrator
$ErrorActionPreference = 'SilentlyContinue'

$Disable = @(
    # EA / store / account bloat
    'EABackgroundService','InstallService','TokenBroker','wlidsvc','smphost','PcaSvc',
    # Telemetry / diagnostics
    'DiagTrack','diagsvc','DPS','WdiServiceHost','WdiSystemHost','InventorySvc',
    # Xbox (launch games manually; services restart if needed)
    'XblAuthManager','XblGameSave','XboxNetApiSvc','XboxGipSvc','BcastDVRUserService_39570',
    # Push / connected devices / phone
    'WpnService','WpnUserService_39570','CDPSvc','CDPUserSvc_39570','dmwappushservice',
    'PhoneSvc','SmsRouter','MessagingService','icssvc',
    # Brave updater
    'brave','bravem','BraveElevationService',
    # Delivery opt / maps / fax / search index
    'DoSvc','MapsBroker','Fax','WSearch','SysMain',
    # Sensors / biometrics / smart card
    'SensrSvc','SensorDataService','SensorService','WbioSrvc','SCardSvr',
    # Remote desktop / server / sharing
    'TermService','SessionEnv','UmRdpService','RemoteRegistry','LanmanServer','SharedAccess',
    # Print / scan / camera frame server
    'Spooler','PrintNotify','stisvc','WiaRpc','FrameServer','FrameServerMonitor',
    # UPnP / SSDP / misc legacy
    'upnphost','SSDPSRV','SNMPTRAP','PerfHost','MSDTC','TrkWks',
    # Bluetooth stack (2.4GHz mouse dongle — not BT)
    'BTAGService','bthserv','BthAvctpSvc','BluetoothUserService_39570',
    # Per-user fluff
    'CaptureService_39570','ConsentUxUserSvc_39570','DevicePickerUserSvc_39570',
    'DevicesFlowUserSvc_39570','DeviceAssociationBrokerSvc_39570','PimIndexMaintenanceSvc_39570','cbdhsvc_39570',
    # Enterprise / enrollment / wallet
    'DmEnrollmentSvc','EntAppSvc','WalletService','RetailDemo','AssignedAccessManagerSvc',
    # Misc
    'DisplayEnhancementService','GraphicsPerfSvc','DsSvc','DusmSvc','lfsvc','wisvc',
    'MixedRealityOpenXRSvc','VacSvc','shpamsvc','tzautoupdate','autotimesvc',
    'NetTcpPortSharing','ssh-agent','WpcMonSvc','WorkFolders','NgcSvc','NgcCtnrSvc',
    'pla','TieringEngineService','FontCache','RemoteAccess','CscService','defragsvc',
    'ShellHWDetection','VSS','wbengine','uhssvc','vmms','HvHost','WMPNetworkSvc'
)

# NEVER touch: Audiosrv, AudioEndpointBuilder, nsi, Dnscache, Dhcp, mpssvc, Schedule,
# GamingServices*, GameInput*, hidserv, PlugPlay, CryptSvc, RpcSs, wuauserv, UsoSvc, Winmgmt, EventLog

$changed = 0
foreach ($name in $Disable) {
    $svc = Get-Service -Name $name -ErrorAction SilentlyContinue
    if (-not $svc -or $svc.StartType -eq 'Disabled') { continue }
    if ($svc.Status -eq 'Running') { Stop-Service -Name $name -Force }
    Set-Service -Name $name -StartupType Disabled
    Write-Host "Disabled $name (was $($svc.StartType))"
    $changed++
}
Write-Host "Done. $changed services set to Disabled."
