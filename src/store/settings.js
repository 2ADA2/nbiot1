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









// {
//     "GW_Settings": {
//     "Addr RS485": 60,
//         "Addr SUB": 40,
//         "Count RX FIFO": 5,
//         "Count TX FIFO": 0,
//         "Count overflow RX FIFO": 0,
//         "Encryption state": "ok",
//         "FIFO State": "eptty",
//         "Local time": "1.0.5",
//         "MAC addr": "04:09:19:86:12:15",
//         "Num TX FIFO": 2,
//         "Peket count": 100,
//         "SUB speed": 100,
//         "SW version": "1.0.5",
//         "State": "ok",
//         "Sync word": "sync",
//         "TX Power": 14,
//         "Temperature": 27,
//         "Type last TX request": 7
// }
// }





























