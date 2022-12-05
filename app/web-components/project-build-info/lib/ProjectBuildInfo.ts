import HTML from './ProjectBuildInfo.html';
import CSS from './ProjectBuildInfo.scss';
import {ElementsObject} from './types';
export class ProjectBuildInfoWebComponent extends HTMLElement {
    elements:ElementsObject;
    constructor() {
        super();
        this.initWebComponent();
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({ mode: 'open' });     
        const html = `<style>${CSS}</style>` + '\n' + HTML;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            versionWrapper: shadowRoot.querySelector('.version-wrapper'),
            buildENVWrapper: shadowRoot.querySelector('.build-env-wrapper'),
            appStageWrapper: shadowRoot.querySelector('.app-stage-wrapper'),
        };
    }
    static get observedAttributes() {
        return ['version','build-env','app-stage'];
    }
    attributeChangedCallback(name:string, oldValue:string, newValue:string) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name:string, value:string) {
        switch (name) {
            case 'version':
                this.elements.versionWrapper.innerHTML = `version:${value}`;
                break;
            case 'build-env':
                this.elements.buildENVWrapper.innerHTML = `build envirement:${value}`;
                break;
            case 'app-stage':
                this.elements.appStageWrapper.innerHTML = `app stage:${value}`;
                break;
        }
    }
}
const myElementNotExists = !customElements.get('project-build-info');
if(myElementNotExists){
    window.customElements.define('project-build-info', ProjectBuildInfoWebComponent);
}

