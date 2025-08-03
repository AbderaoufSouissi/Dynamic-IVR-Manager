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
- Création ,modification et suppression des rôles
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
| Librairie            | Description                                               |
|----------------------|-----------------------------------------------------------|
| `react`              | Bibliothèque pour construire l'interface utilisateur      |
| `react-router-dom`   | Gestion du routage côté client                            |
| `tailwindcss`        | Framework CSS utilitaire pour le design                   |
| `react-icons`        | Pack d'icônes SVG pour React                              |
| `axios`              | Client HTTP pour appeler le backend                       |
| `react-toastify`     | Affichage de notifications toast                          |

### **Backend**
| Dépendance Spring Boot         | Description                                       |
|--------------------------------|---------------------------------------------------|
| `spring-boot-starter-web`      | Création des endpoints REST                      |
| `spring-boot-starter-security` | Sécurité de l'application (authentification)     |
| `spring-boot-starter-data-jpa` | Persistance des données avec JPA                 |
| `spring-boot-starter-validation` | Validation des entrées utilisateur              |
| `spring-boot-starter-mail`     | Envoi de mails                                   |
| `lombok`                       | Réduction du code répétitif                      |
| `ojdbc8` / `oracle.jdbc.OracleDriver` | Connexion à la base Oracle                |

### **Base de données**
| Élément       | Description                                |
|---------------|--------------------------------------------|
| Oracle XE 11g | Système de gestion de base de données utilisé |

---

