// createComponent.ts
import fs from "fs-extra";
import yargs from "yargs";

const createStyleComponent = (componentName: string, sourceDirectory: string) => {
  const stylesDirectory = `${sourceDirectory}/styles`;
  const componentDirectory = `${stylesDirectory}/${componentName}`;

  // Création du répertoire "app/styles" s'il n'existe pas
  fs.ensureDirSync(stylesDirectory);

  // Ajout des fichiers "import.scss" et "settings.scss" s'ils n'existent pas
  const contentImport = `@import '../${stylesDirectory}/settings.scss';`;
  const contentSettings = `$color-primary: #000;
    body {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        background-color: $color-primary;
    }
    `;
  fs.ensureFileSync(`${stylesDirectory}/import.scss`);
  fs.ensureFileSync(`${stylesDirectory}/settings.scss`);

  // Écriture du contenu dans les fichiers "import.scss" et "settings.scss" s'ils sont vides
  fs.appendFileSync(`${stylesDirectory}/import.scss`, contentImport);
  fs.appendFileSync(`${stylesDirectory}/settings.scss`, contentSettings);

  // Création du répertoire du composant et ajout du fichier "${componentName}.scss"
  fs.ensureDirSync(componentDirectory);
  const contentComponent = `.${componentName} {
    .${componentName} {
      // Code
    }
    `;
  fs.ensureFileSync(`${componentDirectory}/${componentName}.scss`);
  fs.appendFileSync(
    `${componentDirectory}/${componentName}.scss`,
    contentComponent
  );
  // Vérification et ajout de l'import du composant dans "import.scss"
  const importFilePath = `${stylesDirectory}/import.scss`;
  const importFileContent = fs.readFileSync(importFilePath, "utf8");

  if (
    !importFileContent.includes(
      `@import './${componentName}/${componentName}.scss';`
    )
  ) {
    fs.appendFileSync(
      importFilePath,
      `\n@import './${componentName}/${componentName}.scss';\n`
    );
  }
};

const createComponent = (componentName: string, sourceDirectory: string) => {
  const componentsDirectory = `${sourceDirectory}/components`;
  const componentPath = `${componentsDirectory}/${componentName}.tsx`;

  // Création du répertoire "app/components" s'il n'existe pas
  fs.ensureDirSync(componentsDirectory);

  const content = `
import React from 'react';

const ${componentName} = () => {
    return (
        <div>
            <h1>${componentName}</h1>
        </div>
    );
};

export default ${componentName};
`;

  // Écriture du contenu dans le fichier "${componentName}.tsx"
  fs.writeFileSync(componentPath, content);

  console.log(
    `the component ${componentName} has been created in ${componentPath}`
  );
};

const create = (componentName: string) => {
  let sourceDirectory: string;
  //si il y a un src a la racine du projet on le notifie et on sort du programme
  if (fs.existsSync("src") && fs.existsSync("app")) {
    sourceDirectory = fs.existsSync("src") ? "src" : "app";
  } else {
//sinon on crée le dossier src
    fs.ensureDirSync("src");
    sourceDirectory = "src";
  }

  createComponent(componentName,sourceDirectory);
  createStyleComponent(componentName,sourceDirectory);
};

// Gestion des arguments de la ligne de commande
const argv = yargs
  .command(
    "create <componentName>",
    "Create a component",
    (yargs: any) => {
      const componentName = yargs.argv._[1];
      const componentType = yargs.argv._[0];
      create(componentName);
    }
  )
  .help().argv;
