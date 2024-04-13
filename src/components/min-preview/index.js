import { template } from "./template";

class MinPreview extends HTMLElement {
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

    setPreviewTheme() {
        const previewContainer = this.shadowRoot.querySelector(".preview-container")
        previewContainer.style.borderLeft = `solid 1.5px ${this.getAttribute("primary")}`

        const secondaryTitle = this.shadowRoot.querySelector(".title-secondary")
        secondaryTitle.style.color = this.getAttribute("secondary")

        const buttonPrimary = this.shadowRoot.querySelector(".btn-primary")
        buttonPrimary.style.backgroundColor = this.getAttribute("primary")

        const buttonSecondary = this.shadowRoot.querySelector(".btn-secondary")
        buttonSecondary.style.backgroundColor = this.getAttribute("secondary")

        const themeTitle = this.shadowRoot.querySelector(".card-title")
        themeTitle.innerText = this.getAttribute("title")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
    }

    connectedCallback() {
        const checkboxInput = this.shadowRoot.querySelector("#input-checkmark")
        const deleteButton = this.shadowRoot.querySelector(".btn-danger")

        const editButton = this.shadowRoot.querySelector(".btn-warning")

        editButton.setAttribute("href", `/about/${this.getAttribute("id")}`)

        checkboxInput.addEventListener(("change"), (event) => {
            if (!event.target.checked) {
                deleteButton.removeAttribute("disabled")
                return
            }

            deleteButton.setAttribute("disabled", "true")
            this.setCollorTheme()
        })

        deleteButton.addEventListener(("click"), (event) => {
            this.remove()
        })
    }

    setCollorTheme() {
        document.documentElement.style.setProperty('--primary', this.getAttribute("primary"));
        document.documentElement.style.setProperty('--secondary', this.getAttribute("secondary"));
        document.documentElement.style.setProperty('--danger', this.getAttribute("danger"));
        document.documentElement.style.setProperty('--success', this.getAttribute("success"));
        document.documentElement.style.setProperty('--warning', this.getAttribute("warning"));
    }
}

customElements.define("min-preview", MinPreview);