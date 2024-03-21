import { useState, useEffect } from "react"
import { Link, Outlet } from "react-router-dom";
import "../styles/layout/panel.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/free-regular-svg-icons'
import {faCog, faServer} from "@fortawesome/free-solid-svg-icons";

export const Panel = () => {
    const [page, setPage] = useState(window.location.href);

    function handleChange(e) {
        if (e.href) setPage(e.href);
        else if (e.parentNode.href) setPage(e.parentNode.href);


    }

    function cleanPanel() {
        setTimeout(() => setPage(window.location.href))
    }

    return (
        <aside className="panel" onClick={(e) => handleChange(e.target)}>
            <nav className="panel-nav">

                <Link to="/sources" className={page.includes("/sources") ? "opened" : ""} onClick={() => {cleanPanel()}}>
                <FontAwesomeIcon icon={faServer} />
                Sources
                </Link>

                <Link to="/settings" className={page.includes("/settings") ? "opened" : ""} onClick={() => {cleanPanel()}}>
                    <FontAwesomeIcon icon={faCog}/>
                Settings
                </Link>

            </nav>
        </aside>
    )
}