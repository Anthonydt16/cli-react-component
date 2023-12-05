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
npx cli-react-component create
```

Ensuite répondai au question dans le terminal pour crée le composant

- app/src
  - components
    - [NomDuComposant].tsx
  - styles
    - components
      - [NomDuComposant].tsx
    - import.scss
    - settings.scss

Ou l'architecture Atomic Design

- app/src
  - components
    - Atom/Molecule/Organism/Template
      - [NomDuComposant].tsx
  - styles
    - components
      - [NomDuComposant].tsx
    - import.scss
    - settings.scss

## Attention

⚠️ Attention: N'oubliez pas d'importer le fichier 'import.scss' dans votre fichier 'app.tsx' pour inclure les styles globaux du projet. ⚠️
