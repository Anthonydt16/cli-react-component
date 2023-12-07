// createComponent.ts
import fs from "fs-extra";
import yargs from "yargs";
import enquirer from "enquirer";

/**
 * the function createAtomicDesignComponent create the component in atomic design
 * @param props the props of the component contains the name of the component, the type of the component, the architect type of the component and the type in atomic design of the component
 * @param sourceDirectory the source directory of the project
 */
const createAtomicDesignComponent = (
  props: {
    componentName: string;
    architectType: string;
    typeInAtomicDesign?: string;
  },
  sourceDirectory: string
) => {
  const componentsDirectory = `${sourceDirectory}/components`;
  const typeInAtomicDesignDirectory = `${componentsDirectory}/${props.typeInAtomicDesign}`;
  const componentPath = `${typeInAtomicDesignDirectory}/${props.componentName}.tsx`;
  fs.ensureDirSync(componentsDirectory);
  fs.ensureDirSync(typeInAtomicDesignDirectory);

  const content = `
    import React from 'react';

    const ${props.componentName} = () => {
        return (
            <div>
                <h1>${props.componentName}</h1>
            </div>
        );
    };
    export default ${props.componentName};
  `;
  // Écriture du contenu dans le fichier "${componentName}.tsx"
  fs.writeFileSync(componentPath, content);

  console.log(
    `the component ${props.componentName} has been created in ${componentPath}`
  );
};

/**
 * the function createStyleComponent create the style component
 * @param componentName The name of the component to create
 * @param sourceDirectory The source directory of the project
 */
const createStyleComponent = (
  componentName: string,
  sourceDirectory: string
) => {
  const stylesDirectory = `${sourceDirectory}/styles`;
  const componentDirectory = `${stylesDirectory}/${componentName}`;

  fs.ensureDirSync(stylesDirectory);

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

  fs.appendFileSync(`${stylesDirectory}/import.scss`, contentImport);
  fs.appendFileSync(`${stylesDirectory}/settings.scss`, contentSettings);

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

/**
 * the function createComponent create the component in components classic
 * @param componentName the name of the component to create
 * @param sourceDirectory the source directory of the project
 */
const createComponent = (componentName: string, sourceDirectory: string) => {
  const componentsDirectory = `${sourceDirectory}/components`;
  const componentPath = `${componentsDirectory}/${componentName}.tsx`;

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

  fs.writeFileSync(componentPath, content);

  console.log(
    `the component ${componentName} has been created in ${componentPath}`
  );
};

const createAtomicDesignComponentStyle = (
  props: {
    componentName: string;
    architectType: string;
    typeInAtomicDesign?: string;
  },
  sourceDirectory: string
) => {
  const stylesDirectory = `${sourceDirectory}/styles`;
  const typeInAtomicDesignDirectory = `${stylesDirectory}/${props.typeInAtomicDesign}`;
  const componentPath = `${typeInAtomicDesignDirectory}/${props.componentName}.scss`;
  fs.ensureDirSync(stylesDirectory);
  fs.ensureDirSync(typeInAtomicDesignDirectory);

  const content = `
    .${props.componentName} {
        
    }
    `;
  // Écriture du contenu dans le fichier "${componentName}.tsx"
  fs.writeFileSync(componentPath, content);
  //Vérifier qu'il y a bien un fichier import.scss et settings.scss sinon les créer
  fs.ensureFileSync(`${stylesDirectory}/import.scss`);
  fs.ensureFileSync(`${stylesDirectory}/settings.scss`);
  //Vérifier que le fichier import.scss contient bien le fichier settings.scss
  const contentImport = `@import './settings.scss';`;
  const contentSettings = `$color-primary: #000;
    body {
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        background-color: $color-primary;
    }
    `;
  fs.appendFileSync(`${stylesDirectory}/import.scss`, contentImport);
  fs.appendFileSync(`${stylesDirectory}/settings.scss`, contentSettings);
  //Vérifier que le fichier import.scss contient bien le fichier ${componentName}.scss
  const importFilePath = `${stylesDirectory}/import.scss`;
  const importFileContent = fs.readFileSync(importFilePath, "utf8");

  if (
    !importFileContent.includes(
      `@import './${props.typeInAtomicDesign}/${props.componentName}.scss';`
    )
  ) {
    fs.appendFileSync(
      importFilePath,
      `\n@import './${props.typeInAtomicDesign}/${props.componentName}.scss';\n`
    );
  }

  console.log(
    `the component ${props.componentName} has been created in ${componentPath}`
  );
};

/**
 * the function create create the component
 * @param props the props of the component contains the name of the component, the type of the component, the architect type of the component and the type in atomic design of the component
 */
const create = (props: {
  componentName: string;
  architectType: string;
  typeInAtomicDesign?: string;
}) => {
  let sourceDirectory: string;
  if (fs.existsSync("src") && fs.existsSync("app")) {
    sourceDirectory = fs.existsSync("src") ? "src" : "app";
  } else {
    fs.ensureDirSync("src");
    sourceDirectory = "src";
  }

  if (props.architectType === "atomic") {
    if (props.typeInAtomicDesign) {
      createAtomicDesignComponent(props, sourceDirectory);
      createAtomicDesignComponentStyle(props, sourceDirectory);
    } else {
      throw new Error(
        "You must specify the type in atomic design of the component"
      );
    }
  } else {
    createComponent(props.componentName, sourceDirectory);
    createStyleComponent(props.componentName, sourceDirectory);
  }
};

/**
 * the function askQuestions ask the questions to create the component
 */
const askQuestions = () => {
  const questions = [
    {
      type: "input",
      name: "componentName",
      message: "What is the name of the component?",
    },
    {
      type: "select",
      name: "architectType",
      message: "What is the architect type of the component?",
      choices: [
        { message: "Atomic Design", value: "atomic" },
        { message: "MVC", value: "mvc" },
      ],
    },
  ];

  enquirer.prompt(questions).then(async (answers: any) => {
    if (answers.architectType === "atomic") {
      const additionalQuestion = await enquirer.prompt({
        type: "select",
        name: "typeInAtomicDesign",
        message: "What is the type in atomic design of the component?",
        choices: [
          { name: "Atoms", value: "atoms" },
          { name: "Molecules", value: "molecules" },
          { name: "Organisms", value: "organisms" },
          { name: "Templates", value: "templates" },
        ],
      });

      Object.assign(answers, additionalQuestion);
    }
    create(answers);
  });
};

askQuestions();
