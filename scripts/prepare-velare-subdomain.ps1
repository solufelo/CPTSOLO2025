# Build Velare (Next.js static export) and zip for velare.captainsolo.ca
# DEPRECATED: use prepare-portfolio-subdomain.ps1 -Project velare
# Run from captainsoloHQ root: .\scripts\prepare-velare-subdomain.ps1

& (Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) 'prepare-portfolio-subdomain.ps1') -Project velare
