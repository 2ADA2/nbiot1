import {useState, useEffect} from "react"
import {Link, Outlet, useNavigate} from "react-router-dom";
import "../styles/layout/panel.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faGears, faLaptopHouse, faServer, faSliders} from "@fortawesome/free-solid-svg-icons";
import {SoucesLinks} from "./sourcesLinks";
import Global from "../store/global";
import {observer} from "mobx-react-lite";
import {
    ADVANCED_SETTINGS_ROUTE,
    DEVCOMMANDS_ROUTE,
    DEVINFO_ROUTE,
    DEVSETTINGS_ROUTE, HOME_ROUTE,
    SETTINGS_ROUTE,
    SOURCES_ROUTE
} from "../utils/consts";
import global from "../store/global";
import {useLocation} from "react-router";
import {UISettings} from "../components/UISettings";
import {FormattedMessage} from "react-intl/lib";


export const Panel = observer(() => {
        const page = useLocation().pathname
        const location = useLocation()
        const [modal, setModal] = useState(false);

        function updateLocation() {
            Global.setLocation()
        }

        useEffect(() => {
            updateLocation()
        }, [location])

        const isInSources = page.includes(SOURCES_ROUTE) ||
            page.includes(DEVCOMMANDS_ROUTE) ||
            page.includes(DEVINFO_ROUTE) ||
            page.includes(DEVSETTINGS_ROUTE)

        return (
            <>
                <div style={{position:"fixed", bottom:2, left:10, fontSize:8, zIndex:3001, color:"white"}}>v 0.11</div>
                <aside className="panel" onClick={() => updateLocation()}>
                    <nav className="panel-nav">
                        <Link to={HOME_ROUTE} className={page === "/" ? "opened" : ""} onClick={() => {
                            updateLocation(false)
                        }}>
                            <FontAwesomeIcon icon={faLaptopHouse}/>
                            <span>
                                <FormattedMessage id="panel.home"/>
                            </span>

                        </Link>

                        <Link to={SOURCES_ROUTE} className={isInSources ? "opened" : ""} onClick={() => {
                            updateLocation(false)
                        }}>
                            <FontAwesomeIcon icon={faServer}/>
                            <span>
                                <FormattedMessage id="panel.devs"/>
                            </span>

                        </Link>
                        <SoucesLinks display={(page.includes("/dev")) ? "block" : "none"}/>

                        <Link to={SETTINGS_ROUTE} className={page.includes(SETTINGS_ROUTE) ? "opened" : ""}
                              onClick={() => {
                                  updateLocation()
                              }}>
                            <FontAwesomeIcon icon={faCog}/>

                            <span>
                            <FormattedMessage id="panel.settings"/>
                                {(global.progType === "mqtt") ?
                                    <> mqtt</> : <> sub</>
                                }
                            </span>


                        </Link>


                        {global.isAdmin ?
                            <Link to={ADVANCED_SETTINGS_ROUTE}
                                  className={page.includes(ADVANCED_SETTINGS_ROUTE) ? "opened" : ""} onClick={() => {
                                updateLocation()
                            }}>
                                <FontAwesomeIcon icon={faSliders}/>
                                <span>
                                    <FormattedMessage id="panel.advSettings"/>
                                 </span>

                            </Link> :
                            <></>}

                    </nav>
                    <Link className={"compact-link"} onClick={() => setModal(!modal)}>
                        <FontAwesomeIcon icon={faGears}/>
                    </Link>
                </aside>
                {modal ? <UISettings setModal={() => setModal(!modal)}/> : <></>}
            </>
        )
    }
)
