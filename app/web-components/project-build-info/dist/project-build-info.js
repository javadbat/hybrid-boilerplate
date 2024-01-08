var HTML = "<div class=\"project-build-info-web-component\">\r\n    <div class=\"version-wrapper\">...</div>\r\n    <div class=\"build-env-wrapper\">...</div>\r\n    <div class=\"app-stage-wrapper\">...</div>\r\n</div>";

var css_248z = ".project-build-info-web-component {\n  font-size: 1.1em;\n  text-align: center;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QtYnVpbGQtaW5mby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixXQUFXO0FBQ2IiLCJmaWxlIjoicHJvamVjdC1idWlsZC1pbmZvLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvamVjdC1idWlsZC1pbmZvLXdlYi1jb21wb25lbnQge1xuICBmb250LXNpemU6IDEuMWVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDAuNXJlbTtcbn0iXX0= */";

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
