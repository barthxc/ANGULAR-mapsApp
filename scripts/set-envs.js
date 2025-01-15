const { mkdirSync, writeFileSync } = require("fs");
require("dotenv").config();

const targetPath = "./src/environments/environment.ts";

const envFileContent = `
  export const environment = {
    mapbox_key:"${process.env["MAPBOX_KEY"]}",
  };
`;

console.log("Creando directorio.....🤔📂");
mkdirSync("./src/environments", { recursive: true });
console.log("Creando archivo.....🤔🗃");
writeFileSync(targetPath, envFileContent);
console.log("Creado archivo correctamente 😍😍!!!");
