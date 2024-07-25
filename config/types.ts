export type AppStage = 'dev'|'test'|'main';
export type NodeEnv = 'development'|'production';
export type SassBuildConfig = {
  path:string,
  outputPath:string,
  //you can make watch true to decrease build and watch overhead and run npm run build manually every time you need to build the sass file
  watch:true,
  dependencyList?:string[]
}
export type WebComponentBuildConfig = {
  name: string;
  path: string;
  outputPath: string;
  umdName: string;
  external?: string[];
  umdIncludes?: string[];
  tsconfigPath?:string;
  globals?: { [key: string]: string };
};