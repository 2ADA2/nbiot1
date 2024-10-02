import { Page } from "./page";
import "../styles/components/errorPage.css"
import { Link } from "react-router-dom";
import global from "../store/global";

export const ErrorPage = ({toBack = true, err = {}}) => {
    return (
        <>
            <header >
                <h1>NB-IoT collector</h1>
            </header>
            <Page header = "Connecting" header2="Connecting to the server (Failed)"
                elem = {
                    <section className="error-page">
                        <h1>Connection Failed</h1>
                        <section className="error-info">   
                            <h3>Error Info</h3>
                            <div>
                                <h5>Error name:</h5><h5>{err.name || "none"}</h5>
                            </div>
                            <div>
                                <h5>Error message:</h5><h5>{err.message || "none"}</h5>
                            </div>
                            <div>
                                <h5>Error stack:</h5><h5>{err.stack || "none"}</h5>
                            </div>
                        </section>
                        {toBack ? <button><Link to = "/authorization" onClick={() => global.updateToken()}>На главную</Link></button>:<></> }
                    </section>
                }
            />            
        </>

    );
}