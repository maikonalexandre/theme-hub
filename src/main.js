import './style.css'
import "../src/components/min-preview/index.js"

document.querySelector('#app').innerHTML = /*html*/`
<div class="home-container">
    <div class="home-header">
        <h1><span class="title-primary">Theme</span> <span class="title-secondary">Hub</span></h1>
    </div>

    <div class="search-container">
        <input class="search-bar" placeholder="Search...">
        <a class="btn-add-theme">
            Add new theme
        </a>
    </div>

    <div class="main-grid">
        <min-preview primary="#32A6DC" title="Theme pink" secondary="#A370FB" danger="#a25544" success="#bbeeee" warning="#12f2ff" id="1"></min-preview>
        <min-preview primary="#fa16DC" title="Theme gray" secondary="#ffbbcc" danger="#ff5544" success="#11eeee" warning="#f1a1ff" id="1"></min-preview>
    </div>
 
</div>
`

const cards = document.querySelectorAll("min-preview")

const searchBar = document.querySelector(".search-bar")
searchBar.addEventListener(("input"), (event) => {
    cards.forEach((card) => {
        const title = card.getAttribute("title").toLowerCase()

        if (!title.includes(event.target.value.toLowerCase())) {
            card.style.display = "none"
        } else {
            card.style.display = "block"
        }
    })
})


