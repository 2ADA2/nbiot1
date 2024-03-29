import { Page } from "../components/page"
import "../styles/pages/settings.css";
//типо Get запрос на /mqtt/settings  вернул settings:
import { CheckBox } from "../components/checkbox";
import { useState, useEffect } from "react";
import { Counter } from "../components/counter";
import global from "../store/global";


export const Settings = () => {
    const [settings, setSettings] = useState(global.settings)
    const [hostName, setHostName] = useState(settings["Connection Details"]["Host name"])
    const [port, setPOrt] = useState(settings["Connection Details"]["Port"])
    const [clietId, setClientId] = useState(settings["Connection Details"]["Client ID"])
    const [keepAlive, setKeepAlive] = useState(Number(settings["Connection Details"]["Keep Alive"]))
    const [cleanSession, setCleanSession] = useState(settings["Connection Details"]["Clean Session"])

    const [userName, setUserName] = useState(settings["Credentials"]["User name"])
    const [password, setPassword] = useState(settings["Credentials"]["Password"])

    const [LWTopic, setLWTopic] = useState(settings["Last-Will"]["Last-Will Topic"])
    const [LWMessage, setLWMessage] = useState(settings["Last-Will"]["Last-Will Message"])
    const [LWQos, setLWQos] = useState(settings["Last-Will"]["Last-Will Qos"])
    const [LWRetain, setLWRetain] = useState(settings["Last-Will"]["Last-Will Retain"])

    return (
        <Page header = "Settings" subHeader = "Настройки" header2="Настройки подключения по MQTT"
            elem = {
            
            <form>
                <h3>Connection Details</h3>
                <section className="connedtion-details">
                    <label>
                        <h5>Host Name</h5>
                        <input type = "text" value={hostName} onChange={(e) => {setHostName(e.target.value)}}></input>
                    </label>    

                    <label>
                        <h5>Port</h5>
                        <input type="number" value={port} onChange={(e) => {setPOrt(e.target.value)}}></input>
                    </label> 

                    <label>
                        <h5>Client ID</h5>
                        <input type="number" value={clietId} onChange={(e) => {setClientId(e.target.value)}}></input>
                    </label>   
                    <div className="label-replacer">
                        <h5>Clean Session</h5> <CheckBox checked = {cleanSession}/>
                    </div>
                    <label>
                        <h5>Keep Alive</h5>
                        <Counter
                                count={keepAlive}
                                newCount={(val) => setKeepAlive(((val)>=0) ? val : keepAlive)}
                                setCount={(val) => setKeepAlive(((keepAlive + val)>=0) ? keepAlive + val:0)}
                            />

                    </label>                    
                </section>

                <h3>Credentials</h3>
                <section className="Credentials">
                    <label>
                        <h5>User name</h5>
                        <input type = "text" value={userName} onChange={(e) => {setUserName(e.target.value)}}></input>
                    </label>    

                    <label>
                        <h5>Password</h5>
                        <input type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
                    </label>                  
                </section>

                <h3>Last-Will</h3>
                <section className="Last-Will">
                    <label>
                        <h5>Last-Will Topic</h5>
                        <input type = "text" value={LWTopic} onChange={(e) => {setLWTopic(e.target.value)}}></input>
                    </label>    

                    <label>
                        <h5>Last-Will Message</h5>
                        <input type="text" value={LWMessage} onChange={(e) => {setLWMessage(e.target.value)}}></input>
                    </label>    
 
                    <label>
                        <h5>Last-Will Qos</h5>
                        <select onChange={(e) => setLWQos(e.target.value)}>
                            <option 
                                value={0}
                                selected = {LWQos == 0}>
                                    0 - at most once
                                
                            </option>
                            <option 
                                value={1}
                                selected = {LWQos == 1}>
                                    1 - at last once
                            </option>
                            <option 
                                value={2}
                                selected = {LWQos == 2}>
                                2 - exactly once
                            </option>
                        </select>
                    </label> 

                    <div className="label-replacer">
                        <h5>Last-Will Retain</h5> <CheckBox checked = {LWRetain}/>
                    </div>
                </section>
                <button>Применить</button>
            </form>
            }
        />
    )
}