import { ElementsObject } from './types';
export declare class ProjectBuildInfoWebComponent extends HTMLElement {
    elements: ElementsObject;
    constructor();
    initWebComponent(): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    onAttributeChange(name: string, value: string): void;
}
