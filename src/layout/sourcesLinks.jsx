import { Link } from "react-router-dom"
import "../styles/layout/sourcesLinks.css"
import { observer } from "mobx-react-lite"
import global from "../store/global"


export const SoucesLinks = observer(({display = "none"}) => {
    const location = global.location;
    return (
        <nav className = "nav-links" style={{display:display}}>
            <Link to = "sources/devInfo" className={(location.includes("sources/devInfo") ? "active" : "")}>
                Information
            </Link>
            <Link to="sources/devSettings" className={(location.includes("sources/devSettings") ? "active" : "")}>
                Settings
            </Link>
            <Link to="sources/devCommands" className={(location.includes("sources/devCommands") ? "active" : "")}>
                Commands
            </Link>
        </nav>
    )
})