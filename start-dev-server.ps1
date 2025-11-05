# NTLF 2026 Development Server Starter
Write-Host "Starting NTLF 2026 Development Server..." -ForegroundColor Green
Write-Host ""

$projectPath = "F:\all websites files\ntlf 27 oct -evening\finel html\react-components"
Set-Location $projectPath
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Installing/updating dependencies..." -ForegroundColor Cyan
npm install
Write-Host ""

Write-Host "Starting development server..." -ForegroundColor Cyan
npm run dev