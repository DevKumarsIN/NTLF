# NTLF 2026 Website Development Guide

## Quick Start Options

### Option 1: Using npm from any directory (Recommended)

```bash
# From the root directory (F:\all websites files\ntlf 27 oct -evening\finel html)
npm run dev
```

### Option 2: Using the batch script (Double-click to run)

- Double-click `start-dev-server.bat` in Windows Explorer
- This will automatically start the development server

### Option 3: Using PowerShell script

```powershell
# Right-click and "Run with PowerShell" or execute:
.\start-dev-server.ps1
```

### Option 4: Manual method (if needed)

```bash
cd "react-components"
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run install-deps` - Install/update dependencies

## Project Structure

```
F:\all websites files\ntlf 27 oct -evening\finel html\
├── package.json (Root - proxy scripts)
├── start-dev-server.bat (Windows batch script)
├── start-dev-server.ps1 (PowerShell script)
├── react-components/
│   ├── package.json (Main React project)
│   ├── src/
│   ├── components/
│   └── ...
├── images/
├── style.css (Original)
└── index.html (Original)
```

## Troubleshooting

### If you get "Port 3000 is in use"

- The server will automatically try port 3001, 3002, etc.
- Or stop other development servers first

### If dependencies are missing

- Run `npm run install-deps` from the root directory
- Or manually: `cd react-components && npm install`

### If scripts don't work

- Make sure you're in the correct directory
- Check that both package.json files exist
- Try the manual method as fallback

## Development Server URLs

- Primary: http://localhost:3000
- Alternate: http://localhost:3001 (if 3000 is busy)
- Alternate: http://localhost:3002 (if 3001 is busy)
