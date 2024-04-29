import {useEffect, useState} from "react"
import {Page} from "../../components/page"
import global from "../../store/global";
import "../../styles/pages/sourcePages/devCommands.css"
import {Counter} from "../../components/counter";
import {CheckBox} from "../../components/checkbox";
import {useDevice} from "../../hooks/useDevice";
import {sendCommand} from "../../functions/requests";
import axios from "axios";
import {errorAnalyze} from "../../functions/error";

export const DevCommands = () => {
    const device = useDevice();
    const [command, setCommand] = useState("register")
    const [commandStatus, setCommandStatus] = useState(localStorage.getItem("commandStatus") ? localStorage.getItem("commandStatus") : "")
    const [onLoad, setOnLoad] = useState(false)

    const [registaerState, setRegistaerState] = useState(localStorage.getItem("registerState") ? JSON.parse(localStorage.getItem("registerState")) : "")
    const [devState, setDevState] = useState(localStorage.getItem("devState") ? JSON.parse(localStorage.getItem("devState")) : {})
    const [period, setPeriod] = useState(localStorage.getItem("period") ? JSON.parse(localStorage.getItem("period")) : {})
    const [updateLocation, setUpdateLocation] = useState(localStorage.getItem("updateLocation") ? JSON.parse(localStorage.getItem("updateLocation")) : {})
    const [getLocation, setLocation] = useState(localStorage.getItem("getLocation") ? JSON.parse(localStorage.getItem("getLocation")) : {})
    const [setParams, setSetParams] = useState(localStorage.getItem("setParams") ? JSON.parse(localStorage.getItem("setParams")) : {})
    const [getParams, setGetParams] = useState(localStorage.getItem("getParams") ? JSON.parse(localStorage.getItem("getParams")) : {})
    const [onData, setOnData] = useState(localStorage.getItem("onData") ? JSON.parse(localStorage.getItem("onData")) : {})
    const [reboot, setReboot] = useState(localStorage.getItem("reboot") ? JSON.parse(localStorage.getItem("reboot")) : {});
    const [updateSertificate, setUpdateSertificate] = useState(localStorage.getItem("updateSertificate") ? JSON.parse(localStorage.getItem("updateSertificate")) : {});
    const [updateUI, setUpdateUI] = useState(localStorage.getItem("updateUI") ? JSON.parse(localStorage.getItem("updateUI")) : {});

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
            setTimeout(() => {
                axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    if (!res.data.Info) {
                        getCommandStatus("", res.data["USER_CMD_RESP"])
                    }
                })
                    .catch((err) => errorAnalyze(err, () => setCommandStatus()))
            }, 1000)
            interval = setInterval(() => {
                axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    if (!res.data.Info) {
                        getCommandStatus("", res.data["USER_CMD_RESP"])
                    }
                })
            }, 5000)
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
            command, trepeat, timeZone, netDelay, type, timeout, kval, tprepare, senseCheck, UIName
        }, global.token).then((res) => {
            setOnLoad(false)
            getCommandStatus(res.data.Info)
        })
    }

    function getCommandStatus(info = "", res = "") {
        switch (command) {
            case "register":
                setRegistaerState((info || res))
                localStorage.setItem("registerState", JSON.stringify((info || res)))
                break;
            case "setPeriod":
                setPeriod((info || res))
                localStorage.setItem("period", JSON.stringify((info || res)))
                break;
            case "getLocation":
                setLocation((info || res))
                localStorage.setItem("getLocation", JSON.stringify((info || res)))
                break;
            case "updateLocation":
                setUpdateLocation((info || res))
                localStorage.setItem("updateLocation", JSON.stringify((info || res)))
                break;
            case "setParams":
                setSetParams((info || res))
                localStorage.setItem("setParams", JSON.stringify((info || res)))
                break;
            case "getParams":
                setGetParams((info || res))
                localStorage.setItem("getParams", JSON.stringify((info || res)))
                break;
            case "onData":
                setOnData((info || res))
                localStorage.setItem("onData", JSON.stringify((info || res)))
                break;
            case "reboot":
                setReboot((info || res))
                localStorage.setItem("reboot", JSON.stringify((info || res)))
                break;
            case "updateSertificate":
                setUpdateSertificate((info || res))
                localStorage.setItem("updateSertificate", JSON.stringify((info || res)))
                break;
            case "devState":
                setDevState((info || res))
                localStorage.setItem("devState", JSON.stringify((info || res)))
                break;
            default:
                setUpdateUI((info || res))
                localStorage.setItem("updateUI", JSON.stringify((info || res)))
                break;
        }

        if (info) {
            setCommandStatus(true)
        } else {
            if (res.USER_CMD_RESP) {
                if (info.USER_CMD_RESP.UPD_LOCATION === "CMD_RUN") return
            } else if (res.USER_CMD_RESP) {
                if (res.USER_CMD_RESP.state !== "complete") return
            }
            setCommandStatus(false)
        }

    }

    return <Page header="Настройки устройства" header2="Команды устройству" elem={<form>
        <section className="commands">
            <h5>Команда</h5>
            <select
                className="command"
                onChange={(e) => setCommand(e.target.value)}
                disabled={commandStatus}
                style={{cursor: commandStatus ? "default" : "pointer"}}
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
                    Запросить местоположение
                </option>
                <option
                    value="getLocation">
                    Обновить координаты устройства
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
            {/*getParams.GET_SENS_ATTR*/}
        </section>
        {(command === "getParams") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>{(getParams.GET_SENS_ATTR && !commandStatus) ? <section>
                <h5 style={{fontSize: "30px"}}>{getParams.GET_SENS_ATTR} </h5>
                <h3>Info</h3>
                <div>
                    <h5>Kv_val: </h5>
                    <h5>{getParams.Kv_val}</h5>
                </div>
                <div>
                    <h5>Tprepare: </h5>
                    <h5>{getParams.Tprepare}</h5>
                </div>
            </section> : <h5>{(typeof (getParams) === "string") ? getParams : "no command"}</h5>}
            </div>
        </> : (command === "setParams") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(getParams.GET_SENS_ATTR) ? getParams.GET_SENS_ATTR : (typeof (getParams) === "string") ? getParams : "no command"}</h5>
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
        </> : (command === "setPeriod") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(period.LINKSCHEDULE) ? period.LINKSCHEDULE : (typeof (period) === "string") ? period : "no command"}</h5>
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
        </> : (command === "updateLocation") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>{(updateLocation.GET_LOCATION && !commandStatus) ? <section>
                <h5 style={{fontSize: "30px"}}>{updateLocation.GET_LOCATION} </h5>
                <div>
                    <h5>COORD: </h5>
                    <h5>{updateLocation.COORD}</h5>
                </div>
            </section> : <h5>{(typeof (updateLocation) === "string") ? updateLocation : "no command"}</h5>}
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
        </> : (command === "register") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{registaerState.REGISTRATION || registaerState || "no command"}</h5>
            </div>
        </> : (command === "devState") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>{(devState.GET_EXT_INFO && !commandStatus) ? <section>
                <h5 style={{fontSize: "30px"}}>{devState.GET_EXT_INFO}</h5>
                <h3>Info</h3>
                <div>
                    <h5>MODEM_IMEI: </h5>
                    <h5>{devState.MODEM_IMEI}</h5>
                </div>
                <div>
                    <h5>MODEM_VER: </h5>
                    <h5>{devState.MODEM_VER}</h5>
                </div>
                <div>
                    <h5>REG_ID: </h5>
                    <h5>{devState.REG_ID}</h5>
                </div>
                <div>
                    <h5>SIM_ICCID: </h5>
                    <h5>{devState.SIM_ICCID}</h5>
                </div>
            </section> : <h5>{(typeof (devState) === "string") ? devState : "no command"}</h5>}
            </div>
        </> : (command === "getLocation") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>{(getLocation.GET_LOCATION && !commandStatus) ? <section>
                    <h5 style={{fontSize: "30px"}}>{getLocation.GET_LOCATION} </h5>
                    <div>
                        <h5>COORD: </h5>
                        <h5>updateLocation.COORD</h5>
                    </div>
                </section> :
                <h5>{(typeof (getLocation) === "string") ? getLocation : "no command"}</h5>}
            </div>
        </> : (command === "onData") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(onData.DEBUG_ON) ? onData.DEBUG_ON : (typeof (onData) === "string") ? onData : "no command"}</h5>
            </div>
        </> : (command === "reboot") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(reboot.DEV_REBOOT) ? reboot.DEV_REBOOT : (typeof (reboot) === "string") ? reboot : "no command"}</h5>
            </div>
        </> : (command === "updateSertificate") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(updateSertificate.FTP_СERT_UPD) ? updateSertificate.FTP_СERT_UPD : (typeof (updateSertificate) === "string") ? updateSertificate : "no command"}</h5>
            </div>
        </> : (command === "updateUI") ? <>
            <div className={(!onLoad) ? "status" : "status loading-status"}>
                <h5>Статус исполнения:</h5>
                <h5>{(updateUI.FTP_FW_UPD) ? updateUI.FTP_FW_UPD : (typeof (updateUI) === "string") ? updateUI : "no command"}</h5>
            </div>
            <section className="command-settings">
                <div>
                    <h5>Название</h5>
                    <input value={UIName} onChange={(e) => setUIName(e.target.value)}/>
                </div>
            </section>
        </> : <></>}

        <div className="button-container" style={{
            justifyContent: "start", alignItems: "end", flexDirection: "row"
        }}>
            <button onClick={(e) => {
                if (commandStatus) {
                    e.preventDefault()
                    return
                }
                cmd(e)
            }}
                    className={commandStatus ? "activated-button" : ""}
            >Отправить
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setCommandStatus("")
                }}
                style={{display: commandStatus ? "block" : "none"}}>Отменить
            </button>
        </div>
    </form>}/>
}