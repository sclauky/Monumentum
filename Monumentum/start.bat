@echo off
setlocal

echo.
echo ================================
echo       MONUMENTUM - START
echo ================================
echo.

REM ==========================================
REM 1. Trouver / creer l'environnement Python
REM ==========================================

set "PYTHON=%~dp0.venv\Scripts\python.exe"

if not exist "%PYTHON%" set "PYTHON=%~dp0..\.venv\Scripts\python.exe"

if not exist "%PYTHON%" (
    echo [INFO] Environnement Python introuvable.
    echo [INFO] Creation du .venv...

    py -m venv "%~dp0.venv"

    if errorlevel 1 (
        echo [ERREUR] Impossible de creer le .venv.
        pause
        exit /b 1
    )

    set "PYTHON=%~dp0.venv\Scripts\python.exe"
)

echo [OK] Python trouve.
echo.

REM ==========================================
REM 2. Installer les dependances Python
REM ==========================================

echo [INFO] Installation des dependances Python...
"%PYTHON%" -m pip install -r "%~dp0requirements.txt"

if errorlevel 1 (
    echo [ERREUR] Installation Python echouee.
    pause
    exit /b 1
)

echo [OK] Dependances Python installees.
echo.

REM ==========================================
REM 3. Verifier le fichier .env
REM ==========================================

if not exist "%~dp0.env" (
    echo [INFO] .env introuvable.
    echo [INFO] Creation depuis .env.example...

    copy "%~dp0.env.example" "%~dp0.env" >nul

    if errorlevel 1 (
        echo [ERREUR] Impossible de creer le .env.
        pause
        exit /b 1
    )

    echo [OK] .env cree.
    echo.
)

REM ==========================================
REM 4. Demarrer PostgreSQL avec Docker
REM ==========================================

echo [INFO] Demarrage de PostgreSQL...
docker compose up -d

if errorlevel 1 (
    echo [ERREUR] Impossible de demarrer Docker.
    echo Verifie que Docker Desktop est ouvert.
    pause
    exit /b 1
)

echo [OK] Docker demarre.
echo.

REM ==========================================
REM 5. Attendre que PostgreSQL soit pret
REM ==========================================

echo [INFO] Attente de PostgreSQL...

:WAIT_DB
docker compose exec -T postgres pg_isready -U monumentum -d monumentum >nul 2>&1

if errorlevel 1 (
    timeout /t 2 /nobreak >nul
    goto WAIT_DB
)

echo [OK] PostgreSQL est pret.
echo.

REM ==========================================
REM 6. Initialiser la base de donnees
REM ==========================================

echo [INFO] Initialisation de la base de donnees...
"%PYTHON%" -c "import sys; sys.path.insert(0, 'src/backend'); import models.monument, models.user, models.collection, models.comment_like; import asyncio; from db.database import create_db_and_tables; asyncio.run(create_db_and_tables())"

if errorlevel 1 (
    echo [ERREUR] Initialisation de la base de donnees echouee.
    pause
    exit /b 1
)

echo [OK] Base de donnees initialisee.
echo.

REM ==========================================
REM 7. Initialiser / mettre a jour les monuments
REM ==========================================

echo [INFO] Lancement du seed...
"%PYTHON%" "%~dp0src\backend\seed.py"

if errorlevel 1 (
    echo [ERREUR] Seed echoue.
    pause
    exit /b 1
)

echo [OK] Seed termine.
echo.

REM ==========================================
REM 8. Lancer le backend
REM ==========================================

echo [INFO] Lancement du backend...

start "Monumentum - Backend" /D "%~dp0" cmd /k ""%PYTHON%" -m uvicorn main:app --reload --app-dir src/backend"

REM ==========================================
REM 9. Lancer le frontend
REM ==========================================

echo [INFO] Lancement du frontend...

start "Monumentum - Frontend" /D "%~dp0web" cmd /k "npm run dev"

echo.
echo ================================
echo        MONUMENTUM LANCE
echo ================================
echo.
echo Backend  : http://127.0.0.1:8000
echo Swagger  : http://127.0.0.1:8000/docs
echo Frontend : http://localhost:5173
echo.
echo Tu peux fermer cette fenetre.
echo Les serveurs tournent dans leurs propres fenetres.
echo.

pause