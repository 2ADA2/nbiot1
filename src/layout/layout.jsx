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
        global.intervalUpdate()
        const interval = setInterval(() => {
            global.intervalUpdate()
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
                <h1>NB-IoT collector<sup style={{fontWeight:100, fontSize:20}}> {global.progType}</sup></h1>
            </header>
            <Panel/>
            <main>
                <Outlet/>
            </main>
        </IntlProvider>
    )
})