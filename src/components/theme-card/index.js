import { template } from "./template";
import { resetColorsToDefault, saveDefaultTheme, verifyIsChecked, setApplicationTheme } from "../../utils/index.js"

import { themesStorage } from "../../utils/store.js"

import { router } from "../../router.js"

class ThemeCard extends HTMLElement {
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

        const primaryTitle = this.shadowRoot.querySelector(".title-primary")
        primaryTitle.style.color = this.getAttribute("primary")

        const secondaryTitle = this.shadowRoot.querySelector(".title-secondary")
        secondaryTitle.style.color = this.getAttribute("secondary")

        const buttonSuccess = this.shadowRoot.querySelector("div.btn-success")
        buttonSuccess.style.backgroundColor = this.getAttribute("success")

        const buttonWarning = this.shadowRoot.querySelector("div.btn-warning")
        buttonWarning.style.backgroundColor = this.getAttribute("warning")

        const buttonDanger = this.shadowRoot.querySelector("div.btn-danger")
        buttonDanger.style.backgroundColor = this.getAttribute("danger")
    }

    static get observedAttributes() {
        return ["checked"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const checkboxInput = this.shadowRoot.querySelector("#input-checkmark")
        const isChecked = this.getAttribute("checked") === "true" ? true : false
        checkboxInput.checked = isChecked
        const deleteButton = this.shadowRoot.querySelector(".btn-danger")

        if (isChecked) {
            deleteButton.setAttribute("disabled", "true")
        }

        if (!isChecked) {
            deleteButton.removeAttribute("disabled")
        }
    }

    connectedCallback() {
        const checkboxInput = this.shadowRoot.querySelector("#input-checkmark")
        const deleteButton = this.shadowRoot.querySelector(".btn-danger")

        deleteButton.addEventListener(("click"), () => {
            themesStorage.deleteTheme(this.getAttribute("id"))
            this.remove()
        })

        const editButton = this.shadowRoot.querySelector(".btn-warning")
        editButton.addEventListener(("click"), (e) => {
            e.preventDefault();
            router.push(`/theme/${this.getAttribute("id")}`)
        })

        const cardTitle = this.shadowRoot.querySelector(".card-title")
        cardTitle.textContent = this.getAttribute("title")

        checkboxInput.addEventListener(("change"), (event) => {
            const isChecked = event.target.checked

            const colors = {
                primary: this.getAttribute("primary"),
                secondary: this.getAttribute("secondary"),
                success: this.getAttribute("success"),
                warning: this.getAttribute("warning"),
                danger: this.getAttribute("danger")
            }

            if (!isChecked) {
                resetColorsToDefault()
                saveDefaultTheme("")
            }

            if (isChecked) {
                saveDefaultTheme({ name: this.getAttribute("title"), id: this.getAttribute("id"), colors: colors })
                setApplicationTheme()
            }

            verifyIsChecked()
        })
    }

}

customElements.define("theme-card", ThemeCard);

