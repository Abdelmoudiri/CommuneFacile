# CommuneFacile (REMACTO)

## Description
CommuneFacile est une plateforme numérique moderne conçue pour améliorer la gouvernance locale et faciliter l'accès aux services administratifs au Maroc. Cette application fait partie de l'initiative REMACTO (Réseau Marocain des Collectivités Territoriales Ouvertes) qui vise à promouvoir la transparence et la bonne gouvernance au niveau local.

## Fonctionnalités Principales

### Pour les Citoyens
- Demande de documents administratifs en ligne (extraits de naissance, certificats de résidence, etc.)
- Suivi en temps réel des demandes
- Consultation des événements municipaux
- Gestion du profil personnel

### Pour les Employés
- Gestion des demandes de documents
- Traitement des dossiers administratifs
- Statistiques et rapports
- Planning et suivi des tâches

### Pour les Administrateurs
- Gestion complète des utilisateurs
- Administration des employés
- Gestion des événements
- Supervision des services municipaux

## Architecture Technique

### Frontend (lacommune/)
- React.js
- React Router pour la navigation
- Tailwind CSS pour le style
- Axios pour les requêtes HTTP

### Backend (LAcomuneAPI/)
- Laravel
- JWT pour l'authentification
- Base de données SQLite
- API RESTful

## Installation

### Prérequis
- Node.js (v14 ou supérieur)
- PHP 8.1 ou supérieur
- Composer
- SQLite

### Installation du Frontend
```bash
cd lacommune
npm install
npm run dev
```

### Installation du Backend
```bash
cd LAcomuneAPI
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan jwt:secret
php artisan serve
```

## Sécurité
- Authentification JWT
- Gestion des rôles (Admin, Employé, Citoyen)
- Validation des données
- Protection CSRF
- Gestion sécurisée des fichiers

## Contributeurs
- [Votre nom]

## Licence
Ce projet est sous licence MIT.

## Contact
Pour plus d'informations sur REMACTO et CommuneFacile :
- Email : abdeljabbarmoudiri17@gmail.com
- Téléphone : +212 677713460
- Adresse : Rabat, Maroc