import "./style.css"
import { defaultColors, inputColorName } from "../../utils/index.js"

import "../../components/large-preview/index.js"

export class Theme {
    constructor(params) {
        this.params = params
        // if (params.length > 0) {
        //     this.createDefaultTheme()
        // }
    }

    build() {
        const page = this.createPage()
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
            this.createDefaultTheme()
        })

        return element
    }

    createDefaultTheme() {
        const primaryColor = document.querySelector("#input-color-primary").value;
        const secondaryColor = document.querySelector("#input-color-secondary").value;
        const successColor = document.querySelector("#input-color-success").value;
        const warningColor = document.querySelector("#input-color-warning").value;
        const dangerColor = document.querySelector("#input-color-danger").value;

        console.log(primaryColor, secondaryColor, successColor, warningColor, dangerColor);
    }

    showOnPreview(color, target) {
        const elementPreview = document.querySelector("large-preview")
        elementPreview.setAttribute(target, `${color}`)
    }
}