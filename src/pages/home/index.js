import "./style.css"
import "../../components/theme-card"

export class Home {

    render() {
        const element = document.createElement('div');
        element.classList.add("home-container")

        element.innerHTML = /*html*/`
            <div class="home-header">
                <h1><span class="title-primary">Theme</span> <span class="title-secondary">Hub</span></h1>
            </div>

            <div class="search-container">
                <input class="search-bar" placeholder="Search...">
                <a href="/theme" class="btn-add-theme">
                    Add new theme
                </a>
            </div>

            <div class="main-grid">
                <theme-card primary="#32A6DC" title="Theme pink" secondary="#A370FB" danger="#a25544" success="#bbeeee" warning="#12f2ff" id="1"></theme-card>
            </div>
        `

        return element
    }
}




// const cards = document.querySelectorAll("theme-card")

// const searchBar = document.querySelector(".search-bar")
// searchBar.addEventListener(("input"), (event) => {
//     cards.forEach((card) => {
//         const title = card.getAttribute("title").toLowerCase()

//         if (!title.includes(event.target.value.toLowerCase())) {
//             card.style.display = "none"
//         } else {
//             card.style.display = "block"
//         }
//     })
// })


