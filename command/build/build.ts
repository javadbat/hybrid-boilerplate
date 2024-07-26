import { ReactBuilder } from "./react-builder.ts";
import SassBuilder from "./sass-builder.ts";
import { WebComponentBuilder } from "./web-component-builder.ts";

const sassBuilder = new SassBuilder();
const webComponentsBuilder = new WebComponentBuilder();
const reactBuilder = new ReactBuilder(null);
async function BuildDependencies(){
  await sassBuilder.buildSassFiles(false);
  await webComponentsBuilder.buildAllComponents();
  await reactBuilder.buildReactApps(false);
}

await BuildDependencies();