import pencil from "../../svgs/pencil.svg"
import trash from "../../svgs/trash.svg"

export const template = document.createElement("template");
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/components/theme-card/styles.css"/>
<div class="card-container">
    <div class="aside-card">
        <span class="card-title">Theme title</span> 
        <div class="aside-btn-container">
            <label for="input-checkmark" class="input-container">
                <input id="input-checkmark" type="checkbox">
                <div class="input-checkmark"></div>
            </label>
            <a class="btn-warning">
                <img src="${pencil}" alt="pencil svg"> 
            </a>
            <button class="btn-danger">
                <img src="${trash}" alt="pencil svg"> 
            </button>
        </div >
    </div >

    <div class="preview-container">
        <div>
            <h1 class="title title-primary">Building one pagers together,</h1>
            <h1 class="title title-secondary">wherever and anywhere</h1>
        </div>

        <div>
            <p>The fastest method for working together on staging and temporary environments</p>
        </div>

        <div class="btn-container">
            <div class="preview btn-success">Check</div>
            <div class="preview btn-warning">Later</div>
            <div class="preview btn-danger">Deny</div>
        </div>
    </div>
</div >
    `;
