import { Outlet } from "react-router"
import "../styles/layout/layout.css"
import { Page } from "../components/page"
import { Link } from "react-router-dom"
import { Panel } from "./panel";

export const Layout = () => {
    //внешний вид
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