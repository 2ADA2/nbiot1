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
                        <h5>Clean Session</h5> <CheckBox/>
                    </div>
                        

                    <label>
                        <h5>Keep Alive</h5>
                        <input type="text" ></input>
                    </label>                    
                </section>

                <h3>Credentials</h3>
                <section className="Credentials">
                    <label>
                        <h5>User name</h5>
                        <input type = "text" ></input>
                    </label>    

                    <label>
                        <h5>Password</h5>
                        <input type="text" ></input>
                    </label>                  
                </section>

                <h3>Last-Will</h3>
                <section className="Last-Will">
                    <label>
                        <h5>Last-Will Topic</h5>
                        <input type = "text" ></input>
                    </label>    

                    <label>
                        <h5>Last-Will Message</h5>
                        <input type="text" ></input>
                    </label>    

                    <label>
                        <h5>Last-Will Qos</h5>
                        <select>
                            <option>0 - at most once</option>
                            <option>1 - at last once</option>
                            <option>2 - exactly once</option>
                        </select>
                    </label> 

                    <div className="label-replacer">
                        <h5>Last-Will Retain</h5> <CheckBox/>
                    </div>
                </section>
                <button>Применить</button>
            </form>
            }
        />
    )
}