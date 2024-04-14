import "./style.css"
import { defaultColors, getDefaultTheme, inputColorName } from "../../utils/index.js"

import { themesStorage } from "../../utils/store.js"

import "../../components/large-preview/index.js"
import { router } from "../../router.js"


export class Theme {
    constructor(params) {
        this.pageId = params[0]

        if (this.pageId) {
            this.theme = themesStorage.getThemeById(this.pageId)
            if (!this.theme) {
                console.log("redirect to another page");
            }
        }

        if (!this.pageId) {
            this.theme = getDefaultTheme()
        }
    }

    build() {
        const page = this.createPage()
        this.setPreviewTheme(page)
        return page
    }

    createPage() {
        const element = document.createElement("div")
        element.classList.add("theme-container")

        element.innerHTML = /*html*/`
        <div class="theme-header">
            <h1><span class="title-primary">Theme</span> <span class="title-secondary">Hub</span></h1>
        </div>

        <div class="header-theme-container">
               <h2 class="subtitle">Select the colors for you theme</h2>
               <div class="add-themes-btn-container">
                <a href="/" data-link class="btn-add-theme secondary">
                   Back
                </a>
                <button type="submit" form="add-theme-colors" class="btn-add-theme">
                    Save theme
                </button>
                </div>
        </div>

        <div class="theme-card">
            <form id="add-theme-colors" class="theme-form">
                <div class="add-theme-input-container">
                    <label for="">Name</label>
                    <input class="theme-name" type="text">
                </div>

                ${inputColorName.map((input) => {
            return /*html*/`
                <div class="add-theme-input-container">
                    <label for="">${input.name}</label>
                    <input id=${input.id} type="color" value=${defaultColors["--secondary"]}>
                </div>`
        }).join("")}
            </form>

            <large-preview />
        </div>
        `

        const allInputsColor = element.querySelectorAll("input[type=color]")
        allInputsColor.forEach((element) => {
            element.addEventListener(("change"), (event) => {
                const color = event.target.value;
                const target = event.target.id.split("-")[2]

                this.showOnPreview(color, target)
            })
        })

        const form = element.querySelector("#add-theme-colors")
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            this.createNewTheme()
        })

        return element
    }

    setPreviewTheme(element) {
        if (this.pageId) {
            element.querySelector(".theme-name").value = this.theme.name
        }

        if (this.theme) {
            element.querySelector("#input-color-primary").value = this.theme.colors.primary;
            element.querySelector("#input-color-secondary").value = this.theme.colors.secondary;
            element.querySelector("#input-color-success").value = this.theme.colors.success;
            element.querySelector("#input-color-warning").value = this.theme.colors.warning;
            element.querySelector("#input-color-danger").value = this.theme.colors.danger;

            const largePreview = element.querySelector("large-preview")

            Object.entries(this.theme.colors).forEach(([key, value]) => {
                largePreview.setAttribute(key, value)
            })
        }

    }

    createNewTheme() {
        const name = document.querySelector(".theme-name")

        if (name.value == "") {
            name.classList.add("error")
            return
        }

        const primaryColor = document.querySelector("#input-color-primary").value;
        const secondaryColor = document.querySelector("#input-color-secondary").value;
        const successColor = document.querySelector("#input-color-success").value;
        const warningColor = document.querySelector("#input-color-warning").value;
        const dangerColor = document.querySelector("#input-color-danger").value;

        const colors = {
            primary: primaryColor,
            secondary: secondaryColor,
            success: successColor,
            warning: warningColor,
            danger: dangerColor
        }

        themesStorage.saveThemeOnStorage({ name: name.value, colors }, this.pageId)
        router.push("/")
    }

    showOnPreview(color, target) {
        const elementPreview = document.querySelector("large-preview")
        elementPreview.setAttribute(target, `${color}`)
    }
}