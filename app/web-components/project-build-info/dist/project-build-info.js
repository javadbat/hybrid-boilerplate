var HTML = "<div class=\"project-build-info-web-component\">\r\n    <div class=\"version-wrapper\">...</div>\r\n    <div class=\"build-env-wrapper\">...</div>\r\n    <div class=\"app-stage-wrapper\">...</div>\r\n</div>";

var css_248z = ".project-build-info-web-component {\n  font-size: 1.1em;\n  text-align: center;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}";

class ProjectBuildInfoWebComponent extends HTMLElement {
    constructor() {
        super();
        this.initWebComponent();
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const html = `<style>${css_248z}</style>` + '\n' + HTML;
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
        return ['version', 'build-env', 'app-stage'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
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
if (myElementNotExists) {
    window.customElements.define('project-build-info', ProjectBuildInfoWebComponent);
}

export { ProjectBuildInfoWebComponent };
//# sourceMappingURL=project-build-info.js.map
