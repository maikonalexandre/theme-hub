import './style.css'
import "../src/components/min-preview/index.js"

document.querySelector('#app').innerHTML = /*html*/`
<div class="t">
    <div>
        <h1>Theme <span class="title-secondary">Hub</span></h1>
    </div>

    <div class="main-grid">
        <min-preview primary="#32A6DC" title="Theme pink" secondary="#A370FB" danger="#a25544" success="#bbeeee" warning="#12f2ff" id="1"></min-preview>
    </div>
</div>
`



