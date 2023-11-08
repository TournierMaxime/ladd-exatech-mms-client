# ladd-exatech-mms-client

## Installation sur ios

1. Cloner le projet avec `git clone`
2. Lancer la commande `npm i` pour installer les dépendances
3. A la racine du projet faire `cd ios` et lancer la commande `pod install` pour installer les dépendances
4. A la racine du projet lancer `npm start`
5. Lancer Xcode et importer le projet. Patienter durant l'indexation des fichiers et exécuter `cmd + R` pour build le projet

## Installation sur android

1. Cloner le projet avec `git clone`
2. Lancer la commande `npm i` pour installer les dépendances
3. Ouvrir android studio et importer le projet à l'aide du dossier /android
4. Patienter durant l'indexation des fichiers
5. Une fois l'indexation des fichiers terminé
6. Lancer un émulateur et à la racine du projet faire `npx react-native start` ou `npx react-native run-android` pour installer les dépendances du projet
7. A la racine du projet exécuter `npm start` puis `a` pour lancer l'application dans l'émulateur

## Exécuter l'application sur le web

- Lancer la commande `npm run web` pour visualiser l'application à un format web (cette version ne représente pas la version mobile et comporte des problèmes de compatibilités notamment à cause des dépendances et des fonctionnalités spécifiques au mobile)

## Serveur de dev

Le serveur de dev est accessible via [cette adresse](https://ladd-exatech-mms-api.dev1.ladd.guru/api/v1)

## Création d'une clé keystore jks

- Lancer la commande dans `/android/app` keytool -genkey -v -keystore keystore.jks -alias ladd-exatech-mms-client -keyalg RSA -keysize 2048 -validity 10000

## MAJ de l'application

1. Dans `android/app/build.gradle` incrémenter dans l'objet android versionCode et versionName
2. Dans l'onglet Build de Android Studio cliquer sur `Generate signed bundle / APK`

## Problèmes possible

1. Si ajout ou modification du .env ou du babel.config.js
    - Exécuter la commande `npm run clear` pour vider le cache de expo et prendre en compte les nouvelles modifications