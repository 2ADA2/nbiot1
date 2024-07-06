import { Outlet } from "react-router"
import "../styles/layout/layout.css"
import { Panel } from "./panel";
import {useEffect} from "react";
import global from "../store/global";
import {IntlProvider} from "react-intl";
import {observer} from "mobx-react-lite";
import settings from "../store/settings";
import RU from "../localization/ru.json";
import EN from "../localization/en.json";
import "../styles/themes/dark.css"

export const Layout = observer(() => {

    //внешний вид
    useEffect(() => {
        const interval = setInterval(() => {
            global.updateDevices()
        }, 60000);
        return () => {
            clearInterval(interval)
        };
    }, []);

    const messages = {
        "ru": RU,
        "en": EN
    }

    return(
        <IntlProvider locale={navigator.language} messages={messages[settings.lang]}>
            <header>
                <h1>NB-IoT collector / SH-219</h1>
            </header>
            <Panel/>
            <main>
                <Outlet/>
            </main>
        </IntlProvider>
    )
})