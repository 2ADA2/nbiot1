import {Link} from "react-router-dom"
import "../styles/layout/sourcesLinks.css"
import {observer} from "mobx-react-lite"
import global from "../store/global"
import {DEVCOMMANDS_ROUTE, DEVINFO_ROUTE, DEVSETTINGS_ROUTE} from "../utils/consts"
import {useDevice} from "../hooks/useDevice"
import {FormattedMessage} from "react-intl/lib";


export const SoucesLinks = observer(({display = "none"}) => {
    const location = global.location;
    const MAC = useDevice().Device.DevId

    return (
        <nav className="nav-links" style={{display: display}}>
            <Link
                to={DEVINFO_ROUTE  + "/" + MAC}
                className={(location.includes(DEVINFO_ROUTE) ? "active" : "")}>
                <FormattedMessage id = "panel.devInfo"/>
            </Link>
            <Link
                to={DEVSETTINGS_ROUTE + "/" + MAC}
                className={(location.includes(DEVSETTINGS_ROUTE) ? "active" : "")}>
                <FormattedMessage id = "panel.devSettings"/>
            </Link>
            <Link
                to={DEVCOMMANDS_ROUTE + "/" + MAC}
                className={(location.includes(DEVCOMMANDS_ROUTE) ? "active" : "")}>
                <FormattedMessage id = "panel.devCommands"/>
            </Link>
        </nav>
    )
})