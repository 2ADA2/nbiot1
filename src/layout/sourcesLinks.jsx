import {Link} from "react-router-dom"
import "../styles/layout/sourcesLinks.css"
import {observer} from "mobx-react-lite"
import {DEVCOMMANDS_ROUTE, DEVINFO_ROUTE, DEVSETTINGS_ROUTE} from "../utils/consts"
import {useDevice} from "../hooks/useDevice"
import {FormattedMessage} from "react-intl/lib";
import {useLocation} from "react-router";
import {faGears, faListCheck, faTerminal} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const SoucesLinks = observer(({display = "none"}) => {
    const location = useLocation().pathname
    const MAC = useDevice().Device.DevId

    return (
        <nav className="nav-links" style={{display: display}}>
            <Link
                to={DEVINFO_ROUTE + "/" + MAC}
                className={(location.includes(DEVINFO_ROUTE) ? "active" : "")}>
                   <FontAwesomeIcon icon={faListCheck}/>
                <span>
                      <FormattedMessage id="panel.devInfo"/>
                </span>
            </Link>

            <Link
                to={DEVSETTINGS_ROUTE + "/" + MAC}
                className={(location.includes(DEVSETTINGS_ROUTE) ? "active" : "")}>
                    <FontAwesomeIcon icon={faGears}/>
                <span>
                    <FormattedMessage id="panel.devSettings"/>
                </span>
            </Link>

            <Link
                to={DEVCOMMANDS_ROUTE + "/" + MAC}
                className={(location.includes(DEVCOMMANDS_ROUTE) ? "active" : "")}>
                     <FontAwesomeIcon icon={faTerminal}/>
                <span>
                     <FormattedMessage id="panel.devCommands"/>
                </span>
            </Link>
        </nav>
    )
})