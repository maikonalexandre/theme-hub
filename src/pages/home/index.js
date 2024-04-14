import "./style.css"
import "../../components/theme-card"

import { themesStorage } from "../../utils/store.js"
import { getDefaultTheme } from "../../utils/index.js"

export class Home {
    themes = themesStorage.getThemes()
    defaultTheme = getDefaultTheme()

    build() {
        const page = this.createPage()
        return page
    }

    createPage() {
        const element = document.createElement('div');
        element.classList.add("home-container")

        element.innerHTML = /*html*/`
            <div class="home-header">
                <h1><span class="title-primary">Theme</span> <span class="title-secondary">Hub</span></h1>
            </div>

            <div class="search-container">
                <input class="search-bar" placeholder="Search...">
                <a href="/theme" data-link class="btn-add-theme">
                    Add new theme
                </a>
            </div>

            <div class="main-grid">
               ${this.themes.map((theme) => {
            return /*html*/`
                <theme-card 
                checked=${this.defaultTheme ? this.defaultTheme.id == theme.id : false} 
                primary=${theme.colors.primary} 
                title="${theme.name}" 
                secondary=${theme.colors.secondary} 
                danger=${theme.colors.danger}
                success=${theme.colors.success} 
                warning=${theme.colors.warning} 
                id=${theme.id}>
                </theme-card>
                `
        }).join("")}
            </div>
        `

        const cards = element.querySelectorAll("theme-card")

        const searchBar = element.querySelector(".search-bar")
        searchBar.addEventListener(("input"), (event) => {
            cards.forEach((card) => {
                const title = card.getAttribute("title").toLowerCase()

                if (!title.includes(event.target.value.toLowerCase().trim())) {
                    card.style.display = "none"
                } else {
                    card.style.display = "block"
                }
            })
        })

        return element
    }
}









