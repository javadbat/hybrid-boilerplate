declare module "*.svg" {
    import {SVGProps, VFC} from "react";
    const SVG: VFC<SVGProps<SVGSVGElement>>;
    export default SVG;
}