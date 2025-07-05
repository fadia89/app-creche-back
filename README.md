# Crèche App – API (Back‑end)

## Description
Cette API REST constitue le cœur du système de gestion d’une crèche. Elle permet la gestion complète des inscriptions, des enfants, des parents, des activités, des événements, des documents ainsi que des messages de contact.

# Fonctionnalités principales :
- Gestion complète (CRUD) : création, lecture, mise à jour et suppression des utilisateurs (parents et administrateurs), des enfants, des inscriptions, des activités et des événements.

- Gestion centralisée des enfants, des activités, des événements et des documents

- Authentification sécurisée avec JWT (JSON Web Token)

- Système de permissions via middleware pour sécuriser les routes

- Téléversement de fichiers (images, documents PDF)

## Prérequis
- Node.js 
- PostgreSQL (SGBD utilisé avec Sequelize)
- Sequelize (ORM utilisé côté serveur)
- Express.js (framework web backend)

## Installation & Démarrage

 Cloner le dépôt et se placer dans le dossier `server` :  
 
   ```git clone https://github.com/fadia89/app-creche-back```

## Installer les dépendances :
Dans un terminal, se déplacer dans le dossier client  ```cd creche-app/server``` puis:
   ```npm install```
# ou

```yarn install```
## Démarer le serveur
Depuis le dossier du client:
# En développement (avec nodemon)
```npm run dev```
# En production
```npm start```

## Configurer les variables d’environnement :
Crée un fichier `.env` à la racine du dossier `server/` à partir du modèle `.env.example`, et remplis-le avec tes valeurs personnelles.

 ## Démarer le serveur
Depuis le dossier du client:
```npm run dev``` 

## Structure du projet

server/
├── controllers/         # Logique métier (handlers)
├── dataBase/            # Configuration Sequelize
├── middlewares/         # Middlewares d’auth, upload (multer), etc.
├── models/              # Définitions des modèles Sequelize
├── routes/              # Définition des routes Express.
├── public/
│   ├── images/          # Dossiers d’upload pour les photos.
│   └── documents/       # Dossiers d’upload pour les fichiers (PDF).
├── index.js             # Point d’entrée principal (Express).
├── .env                 # Fichier d’environnement (non versionné via .gitignore).
└── .env.example         # Modèle pour créer son .env local.
├── package.json         # Dépendances, scripts, métadonnées du projet.
└── README.md            # Documentation du projet back-end.


## Endpoints principaux
| Méthode | URL                   | Description                         |
| ------- | --------------------- | ----------------------------------- |
| POST    | `/api/register`       | Enregistrement d’un parent/admin    |
| POST    | `/api/login`          | Authentification (JWT)              |


## Documentation
# Node.js
https://nodejs.org

# PostgreSQL (SGBD relationnel utilisé pour stocker les données)
https://www.postgresql.org/

# Express permettant de créer  des serveurs web et des API REST.
https://expressjs.com/fr

#  JSON Web Token (JWT)
Permet de gérer l’authentification via des tokens signés, envoyés au client après la connexion, pour sécuriser les routes privées.
https://jwt.io/

# bcrypt
Librairie pour hasher les mots de passe de manière sécurisée avant de les stocker dans la base de données.
https://www.npmjs.com/package/bcrypt

# CORS (Cross-Origin Resource Sharing)
Middleware permettant d’autoriser ou bloquer les requêtes entre serveurs et clients d’origines différentes (client React → API Node).
https://www.npmjs.com/package/cors

# Multer 
Middleware pour gérer l’upload de fichiers (images, documents...) via des formulaires multipart/form-data.
https://www.npmjs.com/package/multer
# Postman 
Outil de test d’API qui permet d’envoyer des requêtes HTTP (GET, POST, PUT, DELETE) et de visualiser les réponses.
https://www.postman.com/

# Git 
 https://git-scm.com/