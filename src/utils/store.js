import themeMock from "./themes.json"
import cuuid from "cuuid"

class Storage {
    constructor() {
        this.storageThemes = themeMock
    }

    getThemes() {
        return this.storageThemes
    }

    getThemeById(id) {
        return this.storageThemes.find((theme) => theme.id == id)
    }

    deleteTheme(id) {
        const themesNotBeDeleted = this.storageThemes.filter((e) => e.id != id)
        this.storageThemes = themesNotBeDeleted
    }

    saveThemeOnStorage(theme, id) {
        if (id) {
            const themesThatNotBeEdited = this.storageThemes.filter((e) => e.id != id)
            const editedTheme = { ...theme, id }
            this.storageThemes = [...themesThatNotBeEdited, editedTheme]
            return
        }

        const newTheme = [...this.storageThemes, { ...theme, id: cuuid() }]
        this.storageThemes = newTheme
    }

}



class ThemesStorageWithLocalStorage {
    constructor() {
        this.updateState()
    }

    saveThemeOnStorage(data, id) {
        if (id) {
            this.updateThemeOnStorage(data, id)
        }
        if (!id) {
            this.createThemeOnStorage(data)
        }
    }

    getThemesOnStorage() {
        return JSON.parse(localStorage.getItem("@theme-hub-themes"))
    }

    createThemeOnStorage(data) {
        const currentThemes = this.getThemesOnStorage()
        const newTheme = [{ ...data, id: cuuid() }]

        if (currentThemes) {
            const allThemes = [...currentThemes, ...newTheme]
            localStorage.setItem("@theme-hub-themes", JSON.stringify(allThemes));
            this.storageThemes = allThemes
            this.updateState()
            return
        }

        localStorage.setItem("@theme-hub-themes", JSON.stringify(newTheme));
        this.updateState()
    }

    updateThemeOnStorage(data, id) {
        const currentThemes = this.getThemesOnStorage()
        const themesThatNotBeEdited = currentThemes.filter((theme) => theme.id != id)
        const updatedTheme = { ...data, id }


        const allThemes = [...themesThatNotBeEdited, updatedTheme]
        localStorage.setItem("@theme-hub-themes", JSON.stringify(allThemes));
        this.updateState()
    }

    getThemes() {
        return this.storageThemes
    }

    getThemeById(id) {
        return this.storageThemes.find((theme) => theme.id == id)
    }

    deleteTheme(id) {
        const themesNotBeDeleted = this.getThemesOnStorage().filter((theme) => theme.id != id)
        localStorage.setItem("@theme-hub-themes", JSON.stringify(themesNotBeDeleted));
        this.updateState()
    }

    updateState() {
        const currentThemesOnStorage = this.getThemesOnStorage()
        if (currentThemesOnStorage) {
            this.storageThemes = [...themeMock, ...currentThemesOnStorage]
            return
        }

        this.storageThemes = [...themeMock]
    }

}


export const themesStorage = new ThemesStorageWithLocalStorage()
// export const themesStorage = new Storage()
