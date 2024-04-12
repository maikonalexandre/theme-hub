export const template = document.createElement("div");
template.innerHTML = /*html*/`
<link rel="stylesheet" href="/components/min-preview/styles.css"/>
<div class="card-container">
    <div class="aside-card">
        <span class="card-header">Theme title</span> 
        <div class="">
            <button class="">1</button>
            <button class="btn-warning">
                <i class="ph-bold ph-pencil-simple-line"></i>   
            </button>
            <button class="btn-danger">3</button>
        </div>
    </div>

    <div class="preview-container">
        <div>
            <h1 class="title">Building one pagers together,</h1>
            <h1 class="title title-secondary">wherever and anywhere</h1>
        </div>

        <div>
            <p>The fastest method for working together on staging and temporary environments</p> 
        </div>

        <div class="btn-container">
            <button class="preview btn-primary">Primary button</button>
            <button class="preview btn-secondary">Secondary button</button>
        </div>
    </div>
</div>
`;
