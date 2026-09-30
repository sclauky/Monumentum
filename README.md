# Monumentum

Application de gestion d’une collection de monuments français, avec une API FastAPI et une interface frontend React/Vite.

## Arborescence du projet

```text
Monumentum/
├── README.md
├── requirements.txt
├── Monumentum/
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── monuments.db
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── backend/
│       │   ├── main.py
│       │   ├── seed.py                     --> rempli la db avec les monuments
│       │   ├── core/
│       │   │   ├── config.py
│       │   │   └── security.py
│       │   ├── db/
│       │   │   ├── database.py
│       │   │   └── init_db.py
│       │   ├── dependencies/
│       │   │   ├── auth.py
│       │   │   ├── database.py
│       │   │   └── pagination.py
│       │   ├── models/
│       │   │   └── monument.py
│       │   ├── routers/
│       │   │   ├── auth.py
│       │   │   ├── collection.py
│       │   │   └── item.py
│       │   └── schemas/
│       │       ├── auth.py
│       │       ├── collection.py
│       │       └── item.py
│       ├── database/
│       └── frontend/
│           ├── 404.tsx
│           ├── 500.tsx
│           ├── App.css
│           ├── App.tsx
│           ├── index.css
│           └── main.tsx
└── .venv/
```

# Lancement du projet (BACKEND) NON COMPATIBLE AVEC LA VERSION WSL

## 1. Placemant

```
cd Monumentum
```

## 2. Créer l'environnement virtuel

```
python -m venv .venv
```

## 3. Activer l'environnement virtuel

```
.\.venv\Scripts\Activate.ps1
```

## 4. Installer toutes les dépendances

```
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

## 4.5 Lancer PostGre SQL

```
docker compose up -d
docker compose ps
```

## 5. Créer le fichier .env et innitialiser example.env

```
Copy-Item .env.example .env
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## 6. Remplir le fichier .env avec la configuration du projet

```
notepad .env
```

## 7. Initialiser la base de données et le catalogue

```
python src/backend/seed.py
```

## 8. Lancer le serveur FastAPI

```
python -m uvicorn main:app --reload --app-dir src/backend
```