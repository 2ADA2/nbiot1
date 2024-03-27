import { Link } from "react-router-dom"
import "../styles/layout/sourcesLinks.css"
import { observer } from "mobx-react-lite"
import global from "../store/global"
import { DEVCOMMANDS_ROUTE, DEVINFO_ROUTE, DEVSETTINGS_ROUTE } from "../utils/consts"
import { useDevice } from "../hooks/useDevice"


export const SoucesLinks = observer(({display = "none"}) => {
    const location = global.location;
    const MAC = useDevice().Device.DevId

    return (
        <nav className = "nav-links" style={{display:display}}>
            <Link 
                to = {"/devInfo/" + MAC} 
                className={(location.includes(DEVINFO_ROUTE) ? "active" : "")}>
                    Information
            </Link>
            <Link 
                to={"/devSettings/" + MAC} 
                className={(location.includes(DEVSETTINGS_ROUTE) ? "active" : "")}>
                    Settings
            </Link>
            <Link 
                to={"/devCommands/" + MAC} 
                className={(location.includes(DEVCOMMANDS_ROUTE) ? "active" : "")}>
                    Commands
            </Link>
        </nav>
    )
})