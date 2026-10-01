@echo off

set "PYTHON=%~dp0.venv\Scripts\python.exe"
if not exist "%PYTHON%" set "PYTHON=%~dp0..\.venv\Scripts\python.exe"

if not exist "%PYTHON%" (
	echo Python virtual environment not found. Create .venv and install requirements.txt.
	pause
	exit /b 1
)

start "Backend" /D "%~dp0" cmd /k ""%PYTHON%" -m uvicorn main:app --reload --app-dir src/backend"
start "Frontend" /D "%~dp0web" cmd /k "npm run dev"