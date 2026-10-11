# Backend

Pour lancer tout le projet en une seule commande sous Windows, suis les
instructions du [README racine](../../README.md). Si tu préfères démarrer les
services séparément, suis les étapes ci-dessous.

Le code de l’API FastAPI se trouve dans [`backend`](./backend). Il comprend
les routes, modèles, schémas, dépendances et accès à la base de données.

## Démarrage séparé

Depuis le dossier `Monumentum`, crée l’environnement Python et installe les
dépendances :

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

Crée `.env` à partir de `.env.example` s’il n’existe pas, puis vérifie sa
configuration. Démarre ensuite PostgreSQL :

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
docker compose up -d
```

Dans un terminal ouvert dans le dossier `Monumentum`, lance l’API :

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --app-dir src/backend
```

L’API est disponible sur `http://127.0.0.1:8000` et sa documentation
interactive sur `http://127.0.0.1:8000/docs`.

Les dépendances Python sont déclarées dans
[`requirements.txt`](../requirements.txt). Le fichier `.env` doit être
configuré avant le démarrage.
