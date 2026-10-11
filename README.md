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

# Lancement complet (Windows)

Le moyen le plus simple est de lancer le projet complet avec une seule commande.

## ouvrir l'application docker avant d'effectuer la commande

Ensuite depuis la racine du dépôt :

```powershell
.\Monumentum\start.bat
```

Le script prépare les dépendances, démarre PostgreSQL avec Docker, puis lance
l’API et le frontend dans des fenêtres séparées. Docker Desktop doit être
installé et démarré. Ce script est prévu pour Windows et n’est pas compatible
avec WSL.

Pour démarrer uniquement le backend ou le frontend, consulte les README dans
[`Monumentum/src`](./Monumentum/src/README.md) et
[`Monumentum/web`](./Monumentum/web/README.md).
