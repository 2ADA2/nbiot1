import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from "./page";
import { faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import "../styles/components/loadingPage.css"

export const LoadingPage = ({toBack = true}) => {
    return (
        <>
            <header style={{display : (toBack) ? "none" : "flex", position:"relative"}} className={"loading-header"}>
                <h1>NB-IoT collector<sup style={{fontWeight:100, fontSize:8}}>loading</sup></h1>
            </header>
                <Page header="Connecting" header2="Connecting to the server"
                      elem = {
                          <section className="loading">
                              <FontAwesomeIcon icon={faReact}/>
                              <h2>Loading...</h2>
                          </section>
                      }
                />
        </>

    );
}