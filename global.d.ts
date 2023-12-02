declare module "*.svg" {
    import {SVGProps, VFC} from "react";
    const SVG: VFC<SVGProps<SVGSVGElement>>;
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