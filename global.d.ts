declare module "*.svg" {
    import {SVGProps, FunctionComponent} from "react";
    const SVG: FunctionComponent<SVGProps<SVGSVGElement>>;
    export default SVG;
}
declare module "*.png" {
    const value: any;
    export = value;
 }
 declare module "*.jpg" {
    const value: any;
    export = value;
 }