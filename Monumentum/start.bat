@echo off

start "Backend" cmd /k ".\.venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir src/backend"
start "Frontend" cmd /k "cd /d web && npm run dev"