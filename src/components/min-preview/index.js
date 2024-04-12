import { template } from "./template";

class MinPreview extends HTMLElement {
    constructor() {
        super();
        this.build()

    }

    build() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template);

        this.style()
    }

    style() { }
}

customElements.define("min-preview", MinPreview);