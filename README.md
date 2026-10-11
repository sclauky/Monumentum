# Monumentum

Monumentum est une application web dédiée à la découverte des monuments français.
Consultez leurs fiches descriptives et gérez votre collection personnelle en suivant ceux que vous souhaitez découvrir, que vous visitez ou que vous avez déjà vus.

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

# Lancement complet WINDOWS UNIQUEMENT

## Sur votre ordinateur

Avant de taper toute commande, lancez l'application "Docker Desktop" sur votre ordinateur.

En suite, après avoir pull, pensez à modifier votre fichier .env qui se trouve dans le dossier monumentum (.\Monumentum\.env).

## Dans votre termianl VScode

Une fois l'application totalement lancé vous pouveez taper cette commande dans votre terminal (en étant à la racine du projet):
```
cd .\Monumentum\
```

Une fois fait vous pouvez lancer le projet en tapant uniquement cette commande:
```
.\start.bat
```
