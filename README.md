# Gestion des Tâches pour Bars et Restaurants - Front-End

## Description

Ce projet front-end fait partie d'un système complet de gestion pour les bars et restaurants. Il permet de simplifier et d'automatiser plusieurs tâches telles que :

- **Prise de commande** : Les serveurs peuvent rapidement prendre des commandes via une interface conviviale.
- **Envoi des commandes** : Les commandes sont directement envoyées vers la cuisine ou le bar en fonction des besoins.
- **Gestion du personnel** : Les serveurs peuvent facilement suivre l'état des commandes et savoir quand elles sont prêtes à être servies.

L'objectif est de fournir une solution intuitive pour faciliter les opérations quotidiennes dans un bar ou un restaurant et améliorer l'efficacité du service.

## Fonctionnalités

- Interface utilisateur simple et intuitive pour la prise de commande.
- Synchronisation des commandes avec la cuisine et le bar.
- Visualisation de l'état des commandes en temps réel.
- Gestion des catégories de produits (boissons, plats, desserts, etc.).
- Responsivité sur différents appareils (tablettes, téléphones, ordinateurs).

## Technologies

- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
- **Redux** : Gestionnaire d'état global pour une gestion fluide des données dans l'application.
- **CSS/SCSS** : Pour la mise en page et le design réactif.
- **Axios** : Utilisé pour les appels API vers le back-end.
- **WebSockets** : Pour la mise à jour en temps réel de l'état des commandes.

## Screenshot

**Home** : Page d'accueil qui diffère en fonction de l'utilisateur. Ici, il s'agit de l'admin, qui peut créer des tables et des produits pour la carte.

![Home page](./src/assets/home.png)

**Menu commander** : Menu qui affiche toutes les tables de l'établissement et permet de commander des produits pour une table spécifique.

![Order Menu](./src/assets/order.png)

**Carte des produits** : Affiche les produits disponibles pour commande dans l'établissement, permettant de sélectionner des articles à ajouter aux tables.

![Product Menu](./src/assets/menu.png)

**Menu suivi des commandes** : Menu de suivi qui propose deux manières de suivre les commandes, a savoir le suivi par commande individuelle ou par table.

![Order Tracker Menu](./src/assets/order_traker_menu.png)

**Suivi par table** : Suivi des commandes regroupées par table, permettant de voir les commandes spécifiques à chaque table.

![Order Tracker by Table](./src/assets/traker_by_table.png)

**Suivi par commande** : Suivi des commandes regroupées individuellement. Permettant à un service (bar, cuisine, service) de voir spécifiquement les tâches qui lui sont associées.

![Order Tracker by Order](./src/assets/traker_by_order.png)
