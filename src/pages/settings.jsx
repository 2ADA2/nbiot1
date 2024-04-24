import {Page} from "../components/page"
import "../styles/pages/settings.css";
import {CheckBox} from "../components/checkbox";
import {useState} from "react";
import {Counter} from "../components/counter";
import global from "../store/global";
import {observer} from "mobx-react-lite";
import {setSettings} from "../functions/requests";


export const Settings = observer(() => {
    const [hostName, setHostName] = useState(global.settings["ConnectionDetails"]["HostName"])
    const [port, setPort] = useState(global.settings["ConnectionDetails"]["Port"])
    const [clientId, setClientId] = useState(global.settings["ConnectionDetails"]["ClientID"])
    const [keepAlive, setKeepAlive] = useState(Number(global.settings["ConnectionDetails"]["KeepAlive"]))
    const [cleanSession, setCleanSession] = useState(global.settings["ConnectionDetails"]["CleanSession"])

    const [userName, setUserName] = useState(global.settings["Credentials"]["UserName"])
    const [password, setPassword] = useState(global.settings["Credentials"]["Password"])

    const [LWTopic, setLWTopic] = useState(global.settings["LastWill"]["LastWillTopic"])
    const [LWMessage, setLWMessage] = useState(global.settings["LastWill"]["LastWillMessage"])
    const [LWQos, setLWQos] = useState(global.settings["LastWill"]["LastWillQos"])
    const [LWRetain, setLWRetain] = useState(global.settings["LastWill"]["LastWillRetain"])

    async function saveSettings(e) {
        e.preventDefault()
        setSettings(global.way + "/set settings",
            {
                hostName,
                port,
                clientId,
                keepAlive,
                cleanSession,
                userName,
                password,
                LWMessage,
                LWRetain,
                LWTopic,
                LWQos
            },
            global.token)
            .then(() => global.updateSettings())
            .catch(() => global.updateToken())
    }

    return (
        <Page header="Настройки" header2="Настройки подключения по MQTT"
              elem={
                  <form>
                      <h3>Connection Details</h3>
                      <section className="connedtion-details">
                          <label>
                              <h5>Host Name</h5>
                              <input type="text" value={hostName} onChange={(e) => {
                                  setHostName(e.target.value)
                              }}></input>
                          </label>

                          <label>
                              <h5>Port</h5>
                              <input type="number" value={port} onChange={(e) => {
                                  setPort(e.target.value)
                              }}></input>
                          </label>

                          <label>
                              <h5>Client ID</h5>
                              <input type="number" value={clientId} onChange={(e) => {
                                  setClientId(e.target.value)
                              }}></input>
                          </label>
                          <div className="label-replacer">
                              <h5>Clean Session</h5> <CheckBox checked={cleanSession} setValue={() => setCleanSession(!cleanSession)}/>
                          </div>
                          <label>
                              <h5>Keep Alive</h5>
                              <Counter
                                  count={keepAlive}
                                  newCount={(val) => setKeepAlive(((val) >= 0) ? val : keepAlive)}
                                  setCount={(val) => setKeepAlive(((keepAlive + val) >= 0) ? keepAlive + val : 0)}
                              />

                          </label>
                      </section>

                      <h3>Credentials</h3>
                      <section className="Credentials">
                          <label>
                              <h5>User name</h5>
                              <input type="text" value={userName} onChange={(e) => {
                                  setUserName(e.target.value)
                              }}></input>
                          </label>

                          <label>
                              <h5>Password</h5>
                              <input type="text" value={password} onChange={(e) => {
                                  setPassword(e.target.value)
                              }}></input>
                          </label>
                      </section>

                      <h3>Last-Will</h3>
                      <section className="Last-Will">
                          <label>
                              <h5>Last-Will Topic</h5>
                              <input type="text" value={LWTopic} onChange={(e) => {
                                  setLWTopic(e.target.value)
                              }}></input>
                          </label>

                          <label>
                              <h5>Last-Will Message</h5>
                              <input type="text" value={LWMessage} onChange={(e) => {
                                  setLWMessage(e.target.value)
                              }}></input>
                          </label>

                          <label>
                              <h5>Last-Will Qos</h5>
                              <select defaultValue={LWQos} onChange={(e) => setLWQos(e.target.value)}>
                                  <option
                                      value={0}>
                                      0 - at most once

                                  </option>
                                  <option
                                      value={1}>
                                      1 - at last once
                                  </option>
                                  <option
                                      value={2}>
                                      2 - exactly once
                                  </option>
                              </select>
                          </label>

                          <div className="label-replacer">
                              <h5>Last-Will Retain</h5> <CheckBox checked={LWRetain} setValue={() => setLWRetain(!LWRetain)}/>
                          </div>
                      </section>
                      <button onClick={(e) => saveSettings(e)}>Применить</button>
                  </form>
              }
        />
    )
})