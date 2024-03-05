import { Outlet } from "react-router"
import "../styles/layout/layout.css"
import { Page } from "../components/page"
export const Layout = () => {
    return(
        <>
            <header>
                <h1>NB-IoT collector</h1>
            </header>
            <main>
                <Outlet/>
                <Page/>
            </main>
        </>
    )
}