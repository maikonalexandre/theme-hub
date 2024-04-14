import { template } from "./template";
import { resetColorsToDefault } from "../../utils/index.js"

class LargePreview extends HTMLElement {
    constructor() {
        super();
        this.build()
    }

    build() {
        this.showInfo = false;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.setPreviewTheme()
    }

    static get observedAttributes() {
        return ["primary", "secondary", "success", "danger", "warning"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.setPreviewTheme()
    }

    setPreviewTheme() {
        const primaryTitle = this.shadowRoot.querySelector(".title-primary")
        primaryTitle.style.color = this.getAttribute("primary")

        const secondaryTitle = this.shadowRoot.querySelector(".title-secondary")
        secondaryTitle.style.color = this.getAttribute("secondary")

        const buttonSuccess = this.shadowRoot.querySelector(".btn-success")
        buttonSuccess.style.backgroundColor = this.getAttribute("success")

        const buttonWarning = this.shadowRoot.querySelector(".btn-warning")
        buttonWarning.style.backgroundColor = this.getAttribute("warning")

        const buttonDanger = this.shadowRoot.querySelector(".btn-danger")
        buttonDanger.style.backgroundColor = this.getAttribute("danger")
    }
}

customElements.define("large-preview", LargePreview);