# 📞 Application de gestion des actions sur l'IVR

## 🧾 Description


Cette application permet de gérer *les utilisateurs*, *les rôles*, *les permissions* ainsi que les actions liées aux *MSISDN*.


---

## 🚀 Fonctionnalités principales

### **Authentification utilisateur**
- Connexion via identifiants (nom d'utilisateur et mot de passe)
- Fonctionnalité "mot de passe oublié" et "réinitialiser mot de passe"

### **Gestion des utilisateurs**
- Création et modification des utilisateurs
- Attribution de rôles

### **Gestion des rôles et permissions**
- Création, modification et suppression des rôles
- Un rôle regroupe plusieurs permissions
- Attribution de permissions aux rôles

### **Audit**
- Historique des actions réalisées (ex : mot de passe oublié, réinitialisation mot de passe, modification, suppression...)

### **MSISDN**
- Vérifier si un **MSISDN** est blacklisté
- Blacklister / Whitelister un **MSISDN**
- Réinitialiser le nombre d'appels pour un **MSISDN**

---

## 🛠️ Technologies utilisées

### **Frontend**
- React + TypeScript

### **Backend**
- Spring Boot (Java/J2EE)

### **Base de données**
- Oracle

---

## 📦 Dépendances utilisées

### **Frontend**
| Librairie            | Description                                           |
|----------------------|-------------------------------------------------------|
| `react`              | Bibliothèque pour construire l'interface utilisateur  |
| `react-router-dom`   | Gestion du routage côté client                        |
| `tailwindcss`        | Framework CSS utilitaire pour le design               |
| `react-icons`        | Pack d'icônes SVG pour React                          |
| `axios`              | Client HTTP pour appeler le backend                   |
| `react-toastify`     | Affichage de notifications toast                      |

### **Backend**
| Dépendance Spring Boot           | Description                                         |
|---------------------------------|-----------------------------------------------------|
| `spring-boot-starter-web`       | Création des endpoints REST                        |
| `spring-boot-starter-security`  | Sécurité de l'application (authentification)       |
| `spring-boot-starter-data-jpa`  | Persistance des données avec JPA                    |
| `spring-boot-starter-validation`| Validation des entrées utilisateur                  |
| `spring-boot-starter-mail`      | Envoi de mails                                     |
| `lombok`                        | Réduction du code répétitif                        |
| `ojdbc8` / `oracle.jdbc.OracleDriver` | Connexion à la base Oracle                    |

### **Base de données**
| Élément       | Description                                    |
|---------------|------------------------------------------------|
| Oracle XE 11g | Système de gestion de base de données utilisé |

---

## ⚙️ Prérequis

- Java 17+
- Maven 3.8+
- Node.js 18+
- Oracle XE 11g (ou version compatible)
- Gmail pour l'envoi d'emails (avec mot de passe d'application)

---

## 🚀 Lancer l'application

### 🔧 1. Configuration du backend (`.env`)

Créer un fichier `.env` à la racine du dossier `/IVR-api` avec le contenu suivant :

SPRING_PROFILE_ACTIVE=dev

SPRING_DATASOURCE_URL=jdbc:oracle:thin:@localhost:1521:xe
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=your_db_password

SPRING_EMAIL_HOST=smtp.gmail.com
SPRING_EMAIL_PORT=587

SPRING_EMAIL_USERNAME=adresse_email@gmail.com
SPRING_EMAIL_PASSWORD=mot_de_passe_généré_par_google_app_password

SPRING_MAIL_VERIFY_HOST=http://localhost:8080/reset-password

CORS_ALLOWED_ORIGIN=http://localhost:5173

SERVER_PORT=8080


### 📝 Détails des champs

- **SPRING_PROFILE_ACTIVE** : Le profil Spring à utiliser (`dev`, `prod`, etc.)
- **SPRING_DATASOURCE_*** : Informations de connexion à la base de données Oracle
- **SPRING_EMAIL_USERNAME** : Adresse email utilisée pour envoyer les emails de réinitialisation de mot de passe
- **SPRING_EMAIL_PASSWORD** : Mot de passe d’application généré via Google (⚠️ ne pas utiliser le mot de passe Gmail classique)
- **SPRING_MAIL_VERIFY_HOST** : Lien complet du hote pour la vérification des emails (ex. `http://localhost:8080/reset-password`)
- **CORS_ALLOWED_ORIGIN** : Origine autorisée pour les requêtes CORS depuis le frontend (ex. `http://localhost:5173`)
- **SERVER_PORT** : Port utilisé par le backend (par défaut `8080`)

---

## 🌐 Configuration de l'environnement Frontend

Le frontend utilise des variables d'environnement pour configurer certains paramètres, notamment l’URL du backend.

### 1. Fichier `.env`

Le fichier `.env` doit être placé à la racine du dossier `/IVR-client`. Il contient les variables d’environnement utilisées par l’application React (Vite).

Exemple de contenu minimal dans `.env` :

```env
VITE_BACKEND_URL=http://localhost:8080
```


## 🛠️ Installation et démarrage

Après avoir cloné le dépôt, suivez ces étapes pour lancer l'application :

### 1. Backend

```bash
cd IVR-api
cp .env.example .env       # Créez votre fichier .env avec les variables d'environnement nécessaires
mvn clean install          # Compile et package l'application backend
java -jar target/mon-app.jar  # Lancez l'application backend

### 2. Frontend

cd IVR-client
cp .env.example .env       # Créez votre fichier .env avec les variables d'environnement 
npm install                # Installez les dépendances frontend
npm run dev   