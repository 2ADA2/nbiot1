import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom";
import "../styles/layout/panel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/free-regular-svg-icons'
import {faCog, faServer} from "@fortawesome/free-solid-svg-icons";
import { SoucesLinks } from "./sourcesLinks";
import Global from "../store/global";
import { observer } from "mobx-react-lite";

export const Panel = observer(() => {
    const page = Global.location
    console.log(page)
    function cleanPanel() {
        Global.setLocation(window.location.href)
    }
    
    return (
        <aside className="panel" onClick={() => cleanPanel()}>
            <nav className="panel-nav">

                <Link to="/sources" className={page.includes("/sources") ? "opened" : ""} onClick={() => {cleanPanel()}}>
                    <FontAwesomeIcon icon={faServer} />
                    Sources
                </Link>
                <SoucesLinks display={(page.includes("/dev")) ? "block" : "none"}/>

                <Link to="/settings" className={page.includes("/settings") ? "opened" : ""} onClick={() => {cleanPanel()}}>
                    <FontAwesomeIcon icon={faCog}/>
                    Settings
                </Link>

            </nav>
        </aside>
    )
}
)
