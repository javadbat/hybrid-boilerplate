var HTML$1 = "<div class=\"jb-button-web-component\">\r\n    <button>\r\n        <slot class=\"button-content\"></slot>\r\n        <div class=\"loading-wrapper\">\r\n            <div class=\"loading-icon\">\r\n                <svg viewbox=\"0 0 100 100\">\r\n                    <circle cx=\"50\" cy=\"50\" r=\"40\"></circle>\r\n                </svg>\r\n            </div>\r\n            <div class=\"loading-text\"></div>\r\n        </div>\r\n    </button>\r\n</div>";

var css_248z$1 = ".jb-button-web-component {\n  width: 100%;\n  height: auto;\n  box-sizing: border-box;\n  margin: 16px 0;\n  margin: var(--jb-button-margin, 16px 0);\n  box-shadow: var(--jb-button-box-shadow, none); }\n  .jb-button-web-component button {\n    width: 100%;\n    height: 44px;\n    height: var(--jb-button-height, 44px);\n    box-sizing: border-box;\n    font-family: inherit;\n    border-radius: var(--jb-button-border-radius, 16px);\n    background-color: var(--jb-button-primary-bgcolor, #ff1229);\n    border: var(--jb-button-border, none);\n    color: var(--jb-button-color, #fff);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-size: var(--jb-button-font-size, 1.2em);\n    font-weight: var(--jb-button-font-weight, bold);\n    cursor: var(--jb-button-cursor, pointer);\n    transition: ease 0.3s all;\n    text-shadow: var(--jb-button-text-shadow, none); }\n    .jb-button-web-component button:focus {\n      outline: none; }\n    .jb-button-web-component button:hover {\n      background-color: var(--jb-button-primary-hover-bgcolor, #da1124);\n      color: var(--jb-button-color-hover, var(--jb-button-color, #fff));\n      transition: ease 0.3s all; }\n    .jb-button-web-component button.--loading .button-content {\n      display: none; }\n    .jb-button-web-component button.--loading .loading-wrapper {\n      display: flex; }\n    .jb-button-web-component button[type=\"secendary\"] {\n      background-color: #f7f6f6;\n      color: #828282; }\n      .jb-button-web-component button[type=\"secendary\"]:hover {\n        background-color: #d3d3d3;\n        color: #1e2832; }\n    .jb-button-web-component button:disabled {\n      background-color: var(--jb-button-bgcolor-disabled, #f7f6f6);\n      color: var(--jb-button-color-disabled, #828282);\n      cursor: var(--jb-button-cursor-disabled, not-allowed);\n      border: var(--jb-button-border-disabled, var(--jb-button-border, none));\n      text-shadow: var(--jb-button-text-shadow-disabled, var(--jb-button-text-shadow, none)); }\n    .jb-button-web-component button .button-content {\n      display: block; }\n    .jb-button-web-component button .loading-wrapper {\n      display: none;\n      font-size: 0.8em;\n      justify-content: center;\n      align-items: center; }\n      .jb-button-web-component button .loading-wrapper .loading-icon {\n        width: 24px;\n        height: 24px;\n        padding: 0 8px; }\n        .jb-button-web-component button .loading-wrapper .loading-icon svg {\n          width: 100%;\n          height: 100%;\n          fill: transparent; }\n          .jb-button-web-component button .loading-wrapper .loading-icon svg circle {\n            stroke: #fff;\n            stroke-width: 8px;\n            stroke-linecap: round;\n            stroke-dasharray: 1px 50px;\n            animation: loading 1s infinite ease-in-out;\n            transform-box: center;\n            transform-origin: center; }\n\n@keyframes loading {\n  0% {\n    stroke-dasharray: 1px 50px;\n    transform: rotate(0deg); }\n  50% {\n    stroke-dasharray: 50px 1px;\n    transform: rotate(180deg); }\n  100% {\n    stroke-dasharray: 1px 50px;\n    transform: rotate(359deg); } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpCQnV0dG9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixjQUFjO0VBQ2QsdUNBQXVDO0VBQ3ZDLDZDQUE2QyxFQUFFO0VBQy9DO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUNwQixtREFBbUQ7SUFDbkQsMkRBQTJEO0lBQzNELHFDQUFxQztJQUNyQyxtQ0FBbUM7SUFDbkMsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsNENBQTRDO0lBQzVDLCtDQUErQztJQUMvQyx3Q0FBd0M7SUFDeEMseUJBQXlCO0lBQ3pCLCtDQUErQyxFQUFFO0lBQ2pEO01BQ0UsYUFBYSxFQUFFO0lBQ2pCO01BQ0UsaUVBQWlFO01BQ2pFLGlFQUFpRTtNQUNqRSx5QkFBeUIsRUFBRTtJQUM3QjtNQUNFLGFBQWEsRUFBRTtJQUNqQjtNQUNFLGFBQWEsRUFBRTtJQUNqQjtNQUNFLHlCQUF5QjtNQUN6QixjQUFjLEVBQUU7TUFDaEI7UUFDRSx5QkFBeUI7UUFDekIsY0FBYyxFQUFFO0lBQ3BCO01BQ0UsNERBQTREO01BQzVELCtDQUErQztNQUMvQyxxREFBcUQ7TUFDckQsdUVBQXVFO01BQ3ZFLHNGQUFzRixFQUFFO0lBQzFGO01BQ0UsY0FBYyxFQUFFO0lBQ2xCO01BQ0UsYUFBYTtNQUNiLGdCQUFnQjtNQUNoQix1QkFBdUI7TUFDdkIsbUJBQW1CLEVBQUU7TUFDckI7UUFDRSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGNBQWMsRUFBRTtRQUNoQjtVQUNFLFdBQVc7VUFDWCxZQUFZO1VBQ1osaUJBQWlCLEVBQUU7VUFDbkI7WUFDRSxZQUFZO1lBQ1osaUJBQWlCO1lBQ2pCLHFCQUFxQjtZQUNyQiwwQkFBMEI7WUFDMUIsMENBQTBDO1lBQzFDLHFCQUFxQjtZQUNyQix3QkFBd0IsRUFBRTs7QUFFdEM7RUFDRTtJQUNFLDBCQUEwQjtJQUMxQix1QkFBdUIsRUFBRTtFQUMzQjtJQUNFLDBCQUEwQjtJQUMxQix5QkFBeUIsRUFBRTtFQUM3QjtJQUNFLDBCQUEwQjtJQUMxQix5QkFBeUIsRUFBRSxFQUFFIiwiZmlsZSI6IkpCQnV0dG9uLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuamItYnV0dG9uLXdlYi1jb21wb25lbnQge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBtYXJnaW46IDE2cHggMDtcbiAgbWFyZ2luOiB2YXIoLS1qYi1idXR0b24tbWFyZ2luLCAxNnB4IDApO1xuICBib3gtc2hhZG93OiB2YXIoLS1qYi1idXR0b24tYm94LXNoYWRvdywgbm9uZSk7IH1cbiAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0NHB4O1xuICAgIGhlaWdodDogdmFyKC0tamItYnV0dG9uLWhlaWdodCwgNDRweCk7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1qYi1idXR0b24tYm9yZGVyLXJhZGl1cywgMTZweCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tamItYnV0dG9uLXByaW1hcnktYmdjb2xvciwgI2ZmMTIyOSk7XG4gICAgYm9yZGVyOiB2YXIoLS1qYi1idXR0b24tYm9yZGVyLCBub25lKTtcbiAgICBjb2xvcjogdmFyKC0tamItYnV0dG9uLWNvbG9yLCAjZmZmKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiB2YXIoLS1qYi1idXR0b24tZm9udC1zaXplLCAxLjJlbSk7XG4gICAgZm9udC13ZWlnaHQ6IHZhcigtLWpiLWJ1dHRvbi1mb250LXdlaWdodCwgYm9sZCk7XG4gICAgY3Vyc29yOiB2YXIoLS1qYi1idXR0b24tY3Vyc29yLCBwb2ludGVyKTtcbiAgICB0cmFuc2l0aW9uOiBlYXNlIDAuM3MgYWxsO1xuICAgIHRleHQtc2hhZG93OiB2YXIoLS1qYi1idXR0b24tdGV4dC1zaGFkb3csIG5vbmUpOyB9XG4gICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbjpmb2N1cyB7XG4gICAgICBvdXRsaW5lOiBub25lOyB9XG4gICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1qYi1idXR0b24tcHJpbWFyeS1ob3Zlci1iZ2NvbG9yLCAjZGExMTI0KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1qYi1idXR0b24tY29sb3ItaG92ZXIsIHZhcigtLWpiLWJ1dHRvbi1jb2xvciwgI2ZmZikpO1xuICAgICAgdHJhbnNpdGlvbjogZWFzZSAwLjNzIGFsbDsgfVxuICAgIC5qYi1idXR0b24td2ViLWNvbXBvbmVudCBidXR0b24uLS1sb2FkaW5nIC5idXR0b24tY29udGVudCB7XG4gICAgICBkaXNwbGF5OiBub25lOyB9XG4gICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbi4tLWxvYWRpbmcgLmxvYWRpbmctd3JhcHBlciB7XG4gICAgICBkaXNwbGF5OiBmbGV4OyB9XG4gICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvblt0eXBlPVwic2VjZW5kYXJ5XCJdIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmN2Y2ZjY7XG4gICAgICBjb2xvcjogIzgyODI4MjsgfVxuICAgICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvblt0eXBlPVwic2VjZW5kYXJ5XCJdOmhvdmVyIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2QzZDNkMztcbiAgICAgICAgY29sb3I6ICMxZTI4MzI7IH1cbiAgICAuamItYnV0dG9uLXdlYi1jb21wb25lbnQgYnV0dG9uOmRpc2FibGVkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWpiLWJ1dHRvbi1iZ2NvbG9yLWRpc2FibGVkLCAjZjdmNmY2KTtcbiAgICAgIGNvbG9yOiB2YXIoLS1qYi1idXR0b24tY29sb3ItZGlzYWJsZWQsICM4MjgyODIpO1xuICAgICAgY3Vyc29yOiB2YXIoLS1qYi1idXR0b24tY3Vyc29yLWRpc2FibGVkLCBub3QtYWxsb3dlZCk7XG4gICAgICBib3JkZXI6IHZhcigtLWpiLWJ1dHRvbi1ib3JkZXItZGlzYWJsZWQsIHZhcigtLWpiLWJ1dHRvbi1ib3JkZXIsIG5vbmUpKTtcbiAgICAgIHRleHQtc2hhZG93OiB2YXIoLS1qYi1idXR0b24tdGV4dC1zaGFkb3ctZGlzYWJsZWQsIHZhcigtLWpiLWJ1dHRvbi10ZXh0LXNoYWRvdywgbm9uZSkpOyB9XG4gICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbiAuYnV0dG9uLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTogYmxvY2s7IH1cbiAgICAuamItYnV0dG9uLXdlYi1jb21wb25lbnQgYnV0dG9uIC5sb2FkaW5nLXdyYXBwZXIge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbiAgICAgIC5qYi1idXR0b24td2ViLWNvbXBvbmVudCBidXR0b24gLmxvYWRpbmctd3JhcHBlciAubG9hZGluZy1pY29uIHtcbiAgICAgICAgd2lkdGg6IDI0cHg7XG4gICAgICAgIGhlaWdodDogMjRweDtcbiAgICAgICAgcGFkZGluZzogMCA4cHg7IH1cbiAgICAgICAgLmpiLWJ1dHRvbi13ZWItY29tcG9uZW50IGJ1dHRvbiAubG9hZGluZy13cmFwcGVyIC5sb2FkaW5nLWljb24gc3ZnIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgZmlsbDogdHJhbnNwYXJlbnQ7IH1cbiAgICAgICAgICAuamItYnV0dG9uLXdlYi1jb21wb25lbnQgYnV0dG9uIC5sb2FkaW5nLXdyYXBwZXIgLmxvYWRpbmctaWNvbiBzdmcgY2lyY2xlIHtcbiAgICAgICAgICAgIHN0cm9rZTogI2ZmZjtcbiAgICAgICAgICAgIHN0cm9rZS13aWR0aDogOHB4O1xuICAgICAgICAgICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICAgICAgICAgICAgc3Ryb2tlLWRhc2hhcnJheTogMXB4IDUwcHg7XG4gICAgICAgICAgICBhbmltYXRpb246IGxvYWRpbmcgMXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XG4gICAgICAgICAgICB0cmFuc2Zvcm0tYm94OiBjZW50ZXI7XG4gICAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7IH1cblxuQGtleWZyYW1lcyBsb2FkaW5nIHtcbiAgMCUge1xuICAgIHN0cm9rZS1kYXNoYXJyYXk6IDFweCA1MHB4O1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XG4gIDUwJSB7XG4gICAgc3Ryb2tlLWRhc2hhcnJheTogNTBweCAxcHg7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTsgfVxuICAxMDAlIHtcbiAgICBzdHJva2UtZGFzaGFycmF5OiAxcHggNTBweDtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNTlkZWcpOyB9IH1cbiJdfQ== */";

class JBButtonWebComponent extends HTMLElement {
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = value;
        if (value == true) {
            this.elements.button.classList.add('--loading');
        } else {
            this.elements.button.classList.remove('--loading');
        }
    }
    get loadingText() {
        return this.shadowRoot.querySelector('loading-text').innerHTML;
    }
    set loadingText(value) {
        this.shadowRoot.querySelector('.loading-text').innerHTML = value;
    }
    constructor() {
        super();
        this.initWebComponent();
    }
    initWebComponent() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const html = `<style>${css_248z$1}</style>` + '\n' + HTML$1;
        const element = document.createElement('template');
        element.innerHTML = html;
        shadowRoot.appendChild(element.content.cloneNode(true));
        this.elements = {
            button: shadowRoot.querySelector('button')
        };
    }
    static get observedAttributes() {
        return ['isLoading', 'loading-text', 'type', 'button-style', 'component-style','disabled'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'isLoading':
                this.isLoading = Boolean(value);
                break;
            case 'loading-text':
                this.loadingText = value;
                break;
            case 'type':
                this.elements.button.setAttribute('type', value);
                break;
            case 'button-style':
                this.elements.button.style = value;
                break;
            case 'component-style':
                this.style = value;
                break;
            case 'disabled':
                if(value == "true" || value == "" || value == "disabled"){
                    this.elements.button.setAttribute('disabled', "disabled");
                }else {
                    this.elements.button.removeAttribute('disabled');
                }
                break;
        }
    }
}
const myElementNotExists$1 = !customElements.get('jb-button');
if(myElementNotExists$1){
    window.customElements.define('jb-button', JBButtonWebComponent);
}

var HTML = "<div class=\"project-build-info-web-component\">\r\n    <div class=\"version-wrapper\">...</div>\r\n    <div class=\"build-env-wrapper\">...</div>\r\n    <div class=\"app-stage-wrapper\">...</div>\r\n</div>";

var css_248z = ".project-build-info-web-component {\n  font-size: 1.1em;\n  text-align: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QtYnVpbGQtaW5mby5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQix1QkFBdUI7QUFDekIiLCJmaWxlIjoicHJvamVjdC1idWlsZC1pbmZvLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvamVjdC1idWlsZC1pbmZvLXdlYi1jb21wb25lbnQge1xuICBmb250LXNpemU6IDEuMWVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufSJdfQ== */";

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
//# sourceMappingURL=index.js.map
