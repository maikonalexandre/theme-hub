import { router } from "./router.js"

window.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        router.push(e.target.href)
    }
});

window.addEventListener("popstate", router.render());
window.addEventListener("DOMContentLoaded", router.render());



