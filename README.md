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
│       │   ├── seed.py
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