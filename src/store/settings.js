import {makeAutoObservable} from "mobx";

class Settings {
    lang = localStorage.getItem("lang") || 'ru';
    theme = localStorage.getItem("theme") || 'light'

    constructor() {
        makeAutoObservable(this);
    }

    setLang(lang){
        this.lang = lang
        localStorage.setItem("lang", lang)
    }

    setTheme(theme){
        this.theme = theme
        localStorage.setItem("theme", theme)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Settings()