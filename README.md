# CLI React Component

CLI React Component est un générateur de composants React en ligne de commande (CLI). Il permet de créer rapidement et facilement des composants React pour accélérer votre développement.

## Installation

Pour installer le CLI React Component, exécutez la commande suivante :

```bash
npm install -g cli-react-component
```

## Utilisation

Pour crée un component voici la commande:

```bash
npx cli-react-component create [nameComponent]
```

Ensuite, le script va créer le dossier "app" s'il n'existe pas déjà, et à l'intérieur, il va créer les dossiers "styles" et "components". Ensuite, il ajoutera le fichier du composant en format TSX dans le dossier "components". Si le dossier "styles" n'existe pas, il le créera, ajoutera les fichiers "import.scss" et "settings.scss". Enfin, le script créera le dossier spécifique au composant avec le fichier .scss correspondant.

- app
  - components
    - [NomDuComposant].tsx
  - styles
    - components
      - [NomDuComposant].tsx
    - import.scss
    - settings.scss

## Attention

⚠️ Attention: N'oubliez pas d'importer le fichier 'import.scss' dans votre fichier 'app.tsx' pour inclure les styles globaux du projet. ⚠️
