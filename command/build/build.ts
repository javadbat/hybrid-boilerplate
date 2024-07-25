import SassBuilder from "./sass-builder.ts";
import { WebComponentBuilder } from "./web-component-builder.ts";

const sassBuilder = new SassBuilder();
const webComponentsBuilder = new WebComponentBuilder();
async function BuildDependencies(){
  await sassBuilder.buildSassFiles(false);
  await webComponentsBuilder.buildAllComponents();
}
await BuildDependencies();