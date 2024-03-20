import { Page } from "../components/page"
import "../styles/pages/settings.css";
//типо Get запрос на /mqtt/settings  вернул settings:
import settings from "../asks/settings.json";
import { CheckBox } from "../components/checkbox";


export const Settings = () => {
    return (
        <Page header = "Settings" subHeader = "Настройки" header2="Настройки подключения по MQTT"
            elem = {
            <form>
                <h3>Connection Details</h3>
                <section className="connedtion-details">
                    <label>
                        <h5>Host Name</h5>
                        <input type = "text" ></input>
                    </label>    

                    <label>
                        <h5>Port</h5>
                        <input type="text" ></input>
                    </label> 

                    <label>
                        <h5>Client ID</h5>
                        <input type="text" ></input>
                    </label>   
                    <div className="label-replacer">
                        <h5>Session</h5> <CheckBox/>
                    </div>
                        

                    <label>
                        <h5>Keep Alive</h5>
                        <input type="text" ></input>
                    </label>                    
                </section>
            </form>
            }
        />
    )
}