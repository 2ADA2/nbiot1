import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom";
import "../styles/layout/panel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/free-regular-svg-icons'
import {faCog, faServer} from "@fortawesome/free-solid-svg-icons";
import { SoucesLinks } from "./sourcesLinks";
import Global from "../store/global";
import { observer } from "mobx-react-lite";
import { DEVCOMMANDS_ROUTE, DEVINFO_ROUTE, DEVSETTINGS_ROUTE, SOURCES_ROUTE } from "../utils/consts";

export const Panel = observer(() => {
    const page = Global.location
    function updateLocation() {
        Global.setLocation()
    }
    const isInSources =  page.includes(SOURCES_ROUTE) ||
        page.includes(DEVCOMMANDS_ROUTE) ||
        page.includes(DEVINFO_ROUTE) ||
        page.includes(DEVSETTINGS_ROUTE)
    
    return (
        <aside className="panel" onClick={() => updateLocation()}>
            <nav className="panel-nav">

                <Link to="/sources" className={ isInSources ? "opened" : ""} onClick={() => {updateLocation(false)}}>
                    <FontAwesomeIcon icon={faServer} />
                    Sources
                </Link>
                <SoucesLinks display={(page.includes("/dev")) ? "block" : "none"}/>

                <Link to="/settings" className={page.includes("/settings") ? "opened" : ""} onClick={() => {updateLocation()}}>
                    <FontAwesomeIcon icon={faCog}/>
                    Settings
                </Link>

            </nav>
        </aside>
    )
}
)
