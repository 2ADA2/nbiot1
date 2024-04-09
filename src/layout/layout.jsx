import { Outlet } from "react-router"
import "../styles/layout/layout.css"
import { Panel } from "./panel";
import {useEffect} from "react";
import global from "../store/global";

export const Layout = () => {
    //внешний вид
    useEffect(() => {
        const interval = setInterval(() => {
            global.updateDevices()
        }, 60000);
        return () => {
            clearInterval(interval)
        };
    }, []);
    return(
        <>
            <header>
                <h1>NB-IoT collector</h1>
            </header>
            <Panel header = "123"/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}