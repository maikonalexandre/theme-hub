export const defaultColors = {
    "--primary": " #F24423",
    "--secondary": " #cdced0",
    "--success": " #28a745",
    "--danger": "#dc3545",
    "--warning": "#ffc107",
};

export function resetColorsToDefault() {
    for (const [key, value] of Object.entries(defaultColors)) {
        document.documentElement.style.setProperty(key, value);
    }
}

export const inputColorName = [
    { name: "Primary color", id: "input-color-primary" },
    { name: "Secondary color", id: "input-color-secondary" },
    { name: "Success color", id: "input-color-success" },
    { name: "Warning color", id: "input-color-warning" },
    { name: "Danger color", id: "input-color-danger" }
]

export function saveDefaultTheme(data) {
    localStorage.setItem("@default-theme", JSON.stringify(data));
}

export function getDefaultTheme() {
    var dados = localStorage.getItem("@default-theme");
    return JSON.parse(dados);
}

export function disableAnotherCheckBoxes() {
    const cards = document.querySelectorAll("theme-card")
    cards.forEach((element) => {
        element.setAttribute("checked", element.getAttribute("id") === getDefaultTheme().id)
    });
}

export function setApplicationTheme() {
    const { colors } = getDefaultTheme()

    if (colors) {
        document.documentElement.style.setProperty('--primary', colors.primary);
        document.documentElement.style.setProperty('--secondary', colors.secondary);
        document.documentElement.style.setProperty('--danger', colors.danger);
        document.documentElement.style.setProperty('--success', colors.success);
        document.documentElement.style.setProperty('--warning', colors.warning);
    }
}