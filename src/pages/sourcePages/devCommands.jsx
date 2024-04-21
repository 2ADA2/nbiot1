import {useEffect, useState} from "react"
import {Page} from "../../components/page"
import global from "../../store/global";
import "../../styles/pages/sourcePages/devCommands.css"
import {Counter} from "../../components/counter";
import {CheckBox} from "../../components/checkbox";
import {useDevice} from "../../hooks/useDevice";
import {sendCommand} from "../../functions/requests";
import axios from "axios";

export const DevCommands = () => {
    const device = useDevice();
    const [command, setCommand] = useState("register")
    const [commandStatus, setCommandStatus] = useState(localStorage.getItem("commandStatus") ? localStorage.getItem("commandStatus") : "")

    const [registaerState, setRegistaerState] = useState(localStorage.getItem("registerState"))
    const [devState, setDevState] = useState(localStorage.getItem("devState"))
    const [period, setPeriod] = useState(localStorage.getItem("period"))
    const [updateLocation, setUpdateLocation] = useState(localStorage.getItem("updateLocation"))
    const [getLocation, setLocation] = useState(localStorage.getItem("getLocation"))
    const [setParams, setSetParams] = useState(localStorage.getItem("setParams"))
    const [getParams, setGetParams] = useState(localStorage.getItem("getParams"))
    const [onData, setOnData] = useState(localStorage.getItem("onData"))
    const [reboot, setReboot] = useState(localStorage.getItem("reboot"));
    const [updateSertificate, setUpdateSertificate] = useState(localStorage.getItem("updateSertificate"));
    const [updateUI, setUpdateUI] = useState(localStorage.getItem("updateUI"));
    const [onLoad, setOnLoad] = useState(false)

    //состояния для комманд
    const [trepeat, setTrepeat] = useState(30);
    const [netDelay, setNetDelay] = useState(0);
    const [timeZone, setTimeZone] = useState(0);
    const [type, setType] = useState(1);
    const [timeout, setTimeout] = useState(300);

    const [kval, setKval] = useState(100);
    const [tprepare, setTprepare] = useState(10);
    const [senseCheck, setSenseCheck] = useState(false);

    const [UIName, setUIName] = useState(device.Device["SoftVer."])

    useEffect(() => {
        if (device.empty) global.setLocation("/sources")
    }, [])

    useEffect(() => {
        let interval
        if (commandStatus) {
            setTimeout(() =>{
                axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    if (!res.data.Info) {
                        getCommandStatus("", JSON.stringify(res.data["USER_CMD_RESP"]))
                    }
                })
            },1000)
            interval = setInterval(() => {
                axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    if (!res.data.Info) {
                        getCommandStatus("", JSON.stringify(res.data["USER_CMD_RESP"]))
                    }
                })
            }, 30000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [commandStatus]);

    function cmd(e) {
        e.preventDefault()
        setOnLoad(true)
        setCommandStatus(true)

        sendCommand(global.way + "/cmd/" + device.Device.DevId, {
            command,
            trepeat,
            timeZone,
            netDelay,
            type,
            timeout,
            kval,
            tprepare,
            senseCheck,
            UIName
        }, global.token).then((res) => {
            setOnLoad(false)
            getCommandStatus(res.data.Info)
        })
    }

    function getCommandStatus(info = "", res = "") {
        switch (command) {
            case "register":
                setRegistaerState((info || res))
                localStorage.setItem("registerState", (info || res))
                break;
            case "setPeriod":
                setPeriod((info || res))
                localStorage.setItem("period", (info || res))
                break;
            case "getLocation":
                setLocation((info || res))
                localStorage.setItem("getLocation", (info || res))
                break;
            case "updateLocation":
                setUpdateLocation((info || res))
                localStorage.setItem("updateLocation", (info || res))
                break;
            case "setParams":
                setSetParams((info || res))
                localStorage.setItem("setParams", (info || res))
                break;
            case "getParams":
                setGetParams((info || res))
                localStorage.setItem("getParams", (info || res))
                break;
            case "onData":
                setOnData((info || res))
                localStorage.setItem("onData", (info || res))
                break;
            case "reboot":
                setReboot((info || res))
                localStorage.setItem("reboot", (info || res))
                break;
            case "updateSertificate":
                setUpdateSertificate((info || res))
                localStorage.setItem("updateSertificate", (info || res))
                break;
            case "devState":
                setDevState((info || res))
                localStorage.setItem("devState", (info || res))
                break;
            default:
                setUpdateUI((info || res))
                localStorage.setItem("updateUI", (info || res))
                break;
        }
        if(info){
            setCommandStatus(true)
        } else{
            setCommandStatus(false)
        }

    }

    return <Page header="Device Settings" subHeader="Настройки устройства" header2="Команды устройству" elem={<form>
        <section className="commands">
            <h5>Команда</h5>
            <select
                className="command"
                onChange={(e) => setCommand(e.target.value)}
                disabled={commandStatus}
                style={{ cursor: commandStatus ? "default" : "pointer" }}
            >
                <option
                    value="register">
                    Зарегистрировать устройство
                </option>
                <option
                    value="devState">
                    Запросить состояние устройства
                </option>
                <option
                    value="setPeriod">
                    Устаноить период TU пакетов
                </option>
                <option
                    value="updateLocation">
                    Обновить координаты устройства
                </option>
                <option
                    value="getLocation">
                    Запросить местоположение
                </option>
                <option
                    value="setParams">
                    Устаноить параметры датчика
                </option>
                <option
                    value="getParams">
                    Запросить параметры датчика
                </option>
                <option
                    value="onData">
                    Включить отладочные данные
                </option>
                <option
                    value="reboot">
                    Перезагрузить устройство
                </option>
                <option
                    value="updateSertificate">
                    Обновить сертификат
                </option>
                <option
                    value="updateUI">
                    Обновить встроенное ПО
                </option>
            </select>

        </section>
        {(command === "getParams") ? <>
                <div className={(!onLoad) ? "status" : "status loading-status"}>
                    <h5>Статус исполнения:</h5><h5>{getParams || "no command"}</h5>
                </div>
                <section className="command-settings">
                    <div>
                        <h5>Kval</h5>
                        <h5>{kval}</h5>
                    </div>
                    <div>
                        <h5>Tprepare</h5>
                        <h5>{tprepare}</h5>
                    </div>
                </section>
            </>

            : (command === "setParams") ? <>
                    <div className={(!onLoad) ? "status" : "status loading-status"}>
                        <h5>Статус исполнения:</h5><h5>{setParams || "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Kval</h5>
                            <Counter
                                count={kval}
                                newCount={(val) => setKval(((val) >= 0) ? val : kval)}
                                setCount={(val) => setKval(((kval + val) >= 0) ? kval + val : 0)}
                            />
                        </div>
                        <div>
                            <h5>Tprepare</h5>
                            <Counter
                                count={tprepare}
                                newCount={(val) => setTprepare(((val) >= 0) ? val : tprepare)}
                                setCount={(val) => setTprepare(((tprepare + val) >= 0) ? tprepare + val : 0)}
                            />
                        </div>
                        <div>
                            <h5>Sense check</h5>
                            <CheckBox
                                checked={senseCheck}
                                setValue={() => setSenseCheck(!senseCheck)}
                            />
                        </div>
                    </section>
                </>

                : (command === "setPeriod") ? <>
                        <div className={(!onLoad) ? "status" : "status loading-status"}>
                            <h5>Статус исполнения:</h5><h5>{period || "no command"}</h5>
                        </div>
                        <section className="command-settings">
                            <div>
                                <h5>Trepeat</h5>
                                <Counter
                                    count={trepeat}
                                    newCount={(val) => setTrepeat(((val) >= 0) ? val : trepeat)}
                                    setCount={(val) => setTrepeat(((trepeat + val) >= 0) ? trepeat + val : 0)}
                                />
                            </div>
                            <div>
                                <h5>Net Delay</h5>
                                <Counter
                                    count={netDelay}
                                    newCount={(val) => setNetDelay(((val) >= 0) ? val : netDelay)}
                                    setCount={(val) => setNetDelay(((netDelay + val) >= 0) ? netDelay + val : 0)}
                                />
                            </div>
                            <div>
                                <h5>Time Zone</h5>
                                <Counter
                                    count={timeZone}
                                    newCount={(val) => setTimeZone(((val) >= 0) ? val : timeZone)}
                                    setCount={(val) => setTimeZone(((timeZone + val) >= 0) ? timeZone + val : 0)}
                                />
                            </div>
                        </section>
                    </>

                    : (command === "updateLocation") ? <>
                            <div className={(!onLoad) ? "status" : "status loading-status"}>
                                <h5>Статус исполнения:</h5><h5>{updateLocation || "no command"}</h5>
                            </div>
                            <section className="command-settings">
                                <div>
                                    <h5>GNSS Type</h5>
                                    <Counter
                                        count={type}
                                        newCount={(val) => setType(((val) >= 0) ? val : type)}
                                        setCount={(val) => setType(((type + val) >= 0) ? type + val : 0)}
                                    />
                                </div>
                                <div>
                                    <h5>GNSS Timeout</h5>
                                    <Counter
                                        count={timeout}
                                        newCount={(val) => setTimeout(((val) >= 0) ? val : timeout)}
                                        setCount={(val) => setTimeout(((timeout + val) >= 0) ? timeout + val : 0)}
                                    />
                                </div>
                            </section>
                        </>

                        : (command === "register") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{registaerState || "no command"}</h5>
                                </div>
                            </>

                            : (command === "devState") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{devState || "no command"}</h5>
                                </div>
                            </> : (command === "getLocation") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{getLocation || "no command"}</h5>
                                </div>
                            </> : (command === "onData") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{onData || "no command"}</h5>
                                </div>
                            </> : (command === "reboot") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{reboot || "no command"}</h5>
                                </div>
                            </> : (command === "updateSertificate") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{updateSertificate || "no command"}</h5>
                                </div>
                            </> : (command === "updateUI") ? <>
                                <div className={(!onLoad) ? "status" : "status loading-status"}>
                                    <h5>Статус исполнения:</h5><h5>{updateUI || "no command"}</h5>
                                </div>
                                <section className="command-settings">
                                    <div>
                                        <h5>Название</h5>
                                        <input value={UIName} onChange={(e) => setUIName(e.target.value)}/>
                                    </div>
                                </section>
                            </> : <></>
            // сюда новые страницы
        }
        <div className="button-container">
            <button onClick={(e) => cmd(e)}>Отправить</button>
        </div>
    </form>}/>
}