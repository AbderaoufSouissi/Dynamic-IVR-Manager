# 📞 Application de gestion des actions sur l'IVR

## 🧾 Description

Cette application a été développée dans le cadre du projet **"Développement d'une application pour la gestion des actions sur l'IVR"**.  
Elle permet de gérer les utilisateurs, les rôles, les permissions ainsi que les actions liées aux **MSISDN**.

---

## 🚀 Fonctionnalités principales

### **Authentification utilisateur**
- Connexion via identifiants (nom d'utilisateur et mot de passe)
- Fonctionnalité "mot de passe oublié" et "réinitialiser mot de passe"

### **Gestion des utilisateurs**
- Création et modification des utilisateurs
- Attribution de rôles

### **Gestion des rôles et permissions**
- Création et modification des rôles
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
- React (Vite)
- React Router DOM
- TailwindCSS

### **Backend**
- Spring Boot (Java/J2EE)
- Spring Web
- Spring Security
- Spring Data JPA
- Spring Boot Validation
- Java Mail Sender
- Lombok
- Oracle JDBC Driver

### **Base de données**
- Oracle

---
