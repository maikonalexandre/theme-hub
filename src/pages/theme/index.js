import "./style.css"
import { defaultColors, getDefaultTheme, inputColorName } from "../../utils/index.js"

import { themesStorage } from "../../utils/store.js"

import "../../components/large-preview/index.js"
import { router } from "../../router.js"


export class Theme {
    constructor(params) {
        this.pageId = params[0]

        if (this.pageId) {
            this.defaultTheme = themesStorage.getThemeById(this.pageId)
        }

        if (!this.pageId) {
            this.defaultTheme = getDefaultTheme()
        }
    }

    build() {
        const page = this.createPage()
        this.setThemeLargePreviewComponent(page)
        this.addFeaturesToPage(page)
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
        return element
    }

    setThemeLargePreviewComponent(page) {
        if (this.pageId) {
            page.querySelector(".theme-name").value = this.defaultTheme.name
        }

        if (this.defaultTheme) {
            page.querySelector("#input-color-primary").value = this.defaultTheme.colors.primary;
            page.querySelector("#input-color-secondary").value = this.defaultTheme.colors.secondary;
            page.querySelector("#input-color-success").value = this.defaultTheme.colors.success;
            page.querySelector("#input-color-warning").value = this.defaultTheme.colors.warning;
            page.querySelector("#input-color-danger").value = this.defaultTheme.colors.danger;

            const largePreview = page.querySelector("large-preview")

            Object.entries(this.defaultTheme.colors).forEach(([key, value]) => {
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

        const colors = {
            primary: document.querySelector("#input-color-primary").value,
            secondary: document.querySelector("#input-color-secondary").value,
            success: document.querySelector("#input-color-success").value,
            warning: document.querySelector("#input-color-warning").value,
            danger: document.querySelector("#input-color-danger").value
        }

        themesStorage.saveThemeOnStorage({ name: name.value, colors }, this.pageId)
        router.push("/")
    }

    showOnPreviewComponent(color, target) {
        const elementPreview = document.querySelector("large-preview")
        elementPreview.setAttribute(target, `${color}`)
    }

    addFeaturesToPage(page) {
        const allInputTypeColor = page.querySelectorAll("input[type=color]")
        allInputTypeColor.forEach((element) => {
            element.addEventListener(("change"), (e) => {
                const color = e.target.value;
                const target = e.target.id.split("-")[2]

                this.showOnPreviewComponent(color, target)
            })
        })

        const createNewThemeForm = page.querySelector("#add-theme-colors")
        createNewThemeForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.createNewTheme()
        })
    }
}