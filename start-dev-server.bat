@echo off
echo Starting NTLF 2026 Development Server...
echo.
cd /d "F:\all websites files\ntlf 27 oct -evening\finel html\react-components"
echo Current directory: %CD%
echo.
echo Installing/updating dependencies...
call npm install
echo.
echo Starting development server...
call npm run dev
pause