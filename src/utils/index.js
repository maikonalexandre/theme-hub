export function resetColorsToDefault() {
    const defaultColors = {
        "--primary": " #F24423",
        "--secondary": " #cdced0",
        "--success": " #28a745",
        "--danger": "#dc3545",
        "--warning": "#ffc107",
    };

    for (const [key, value] of Object.entries(defaultColors)) {
        document.documentElement.style.setProperty(key, value);
    }
}