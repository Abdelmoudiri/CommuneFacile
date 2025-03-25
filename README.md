# Application Web de Gestion Communale


## 📋 Description du Projet

Cette application web vise à améliorer la gestion administrative et la communication entre les citoyens et la commune. Elle offre une plateforme centralisée pour la soumission et le suivi des demandes administratives, la gestion des événements locaux et les communications officielles.
Application web moderne de gestion communale développée avec une architecture découplée :
- Backend : Laravel API
- Frontend : React
- Gestion de projet : Jira
- Intégration continue et déploiement

## 🎯 Architecture Technique

### Backend
- **Framework :** Laravel 10
- **API :** RESTful API avec Laravel Sanctum
- **ORM :** Eloquent
- **Authentification :** Laravel Passport

### Frontend
- **Bibliothèque :** React 18
- **Routing :** React Router
- **State Management :** Redux Toolkit
- **Styled :** Tailwind CSS
- **Requêtes API :** Axios

### Gestion de Projet
- **Outil :** Jira
- **Méthodologie :** Agile Scrum
- **Gestion des Sprints :** Boards Jira
- **Suivi des Tâches :** Backlog détaillé

## ✨ Fonctionnalités Principales

### Backend (Laravel API)
- CRUD Requêtes Administratives
- Gestion des Événements
- Système de Notifications
- Authentification & Autorisations
- Gestion des Utilisateurs
- Génération de Rapports

### Frontend (React)
- Interfaces Utilisateurs Réactives
- Formulaires Dynamiques
- Tableau de Bord Interactif
- Gestion des États Centralisée
- Responsive Design

## 🛠 Technologies Détaillées

### Backend
- Laravel 10
- PHP 8.1+
- MySQL 8.0
- Redis (Cache)
- Laravel Horizon (File Management)
- Laravel Telescope (Debugging)

### Frontend
- React 18
- TypeScript
- Redux Toolkit
- React Query
- Tailwind CSS
- Vite (Bundler)

### DevOps
- Docker
- GitHub Actions
- Nginx
- PM2
- Swagger/OpenAPI (Documentation API)

## 🔒 Sécurité

- JWT Authentication
- HTTPS
- Validation des Requêtes
- Protection CSRF
- Middleware d'Autorisation
- Logs de Sécurité
- Vérification des Permissions

## 📦 Prérequis

- Docker
- PHP 8.1+
- Composer
- Node.js 18+
- NPM
- Compte Jira

## 🚀 Installation Rapide

### Clonage du Projet
```bash
git clone https://github.com/votre-organisation/gestion-communale.git
cd gestion-communale
```

### Configuration Backend
```bash
# Installation des dépendances
composer install

# Configuration environnement
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan passport:install
```

### Configuration Frontend
```bash
# Installation des dépendances
cd frontend
npm install

# Démarrage du serveur de développement
npm run dev
```

### Démarrage avec Docker
```bash
docker-compose up -d
```

## 🤝 Contribution

1. Créer une issue dans Jira
2. Créer une branche feature
3. Développer
4. Pull Request
5. Revue de code

## 📊 Intégration Jira

- Chaque fonctionnalité liée à une issue Jira
- Workflow : To Do → In Progress → Review → Done
- Estimation des points de sprint
- Suivi des burndown charts

## 📡 Documentation API

- Généré automatiquement avec Swagger
- Accessible via `/api/documentation`
- Mise à jour dynamique

## 🔍 Tests

- PHPUnit (Backend)
- Jest & React Testing Library (Frontend)
- Couverture de test > 80%

## 📄 Licence

MIT License

## 📞 Contact

Votre Nom - email@contact.com

Lien du Projet : [URL du Projet]