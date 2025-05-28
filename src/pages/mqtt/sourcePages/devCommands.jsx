import {useEffect, useState} from "react"
import {Page} from "../../../components/page"
import global from "../../../store/global";
import "../../../styles/pages/sourcePages/devCommands.css"
import {Counter} from "../../../components/counter";
import {CheckBox} from "../../../components/checkbox";
import {useDevice} from "../../../hooks/useDevice";
import {sendCommand} from "../../../functions/requests";
import axios from "axios";
import {FormattedMessage} from "react-intl/lib";

export const DevCommands = () => {
    const device = useDevice();
    const [command, setCommand] = useState(localStorage.getItem(device.Device.DevId + "cmdName") || "register")
    const [commandStatus, setCommandStatus] = useState(localStorage.getItem(device.Device.DevId + "commandStatus") ? localStorage.getItem(device.Device.DevId + "commandStatus") : "")

    const [addPacage, setAddPacage] = useState(localStorage.getItem(device.Device.DevId + "addPacage") ? JSON.parse(localStorage.getItem(device.Device.DevId + "addPacage")) : {})
    const [clearAll, setClearAll] = useState(localStorage.getItem(device.Device.DevId + "clearAll") ? JSON.parse(localStorage.getItem(device.Device.DevId + "clearAll")) : {})
    const [chos, setChos] = useState(localStorage.getItem(device.Device.DevId + "chos") ? JSON.parse(localStorage.getItem(device.Device.DevId + "chos")) : {})
    const [updateLocation, setUpdateLocation] = useState(localStorage.getItem(device.Device.DevId + "updateLocation") ? JSON.parse(localStorage.getItem(device.Device.DevId + "updateLocation")) : {})
    const [getLocation, setLocation] = useState(localStorage.getItem(device.Device.DevId + "getLocation") ? JSON.parse(localStorage.getItem(device.Device.DevId + "getLocation")) : {})
    const [setParams, setSetParams] = useState(localStorage.getItem(device.Device.DevId + "setParams") ? JSON.parse(localStorage.getItem(device.Device.DevId + "setParams")) : {})
    const [getParams, setGetParams] = useState({})
    const [onData, setOnData] = useState(localStorage.getItem(device.Device.DevId + "onData") ? JSON.parse(localStorage.getItem(device.Device.DevId + "onData")) : {})
    const [reboot, setReboot] = useState(localStorage.getItem(device.Device.DevId + "reboot") ? JSON.parse(localStorage.getItem(device.Device.DevId + "reboot")) : {});
    const [updateSertificate, setUpdateSertificate] = useState(localStorage.getItem(device.Device.DevId + "updateSertificate") ? JSON.parse(localStorage.getItem(device.Device.DevId + "updateSertificate")) : {});
    const [updateUI, setUpdateUI] = useState(localStorage.getItem(device.Device.DevId + "updateUI") ? JSON.parse(localStorage.getItem(device.Device.DevId + "updateUI")) : {});

    const cmds = [addPacage, clearAll, chos, updateLocation, getLocation, setParams, getParams, onData, reboot, updateSertificate, updateUI]
    const setCmds = [
        (val) => setAddPacage(val),
        (val) => setClearAll(val),
        (val) => setChos(val),
        (val) => setUpdateLocation(val),
        (val) => setLocation(val),
        (val) => setSetParams(val),
        (val) => setGetParams(val),
        (val) => setOnData(val),
        (val) => setReboot(val),
        (val) => setUpdateSertificate(val),
        (val) => setUpdateUI(val)
    ]

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
        if (command !== "getParams") {
            setGetParams({})
        }
    }, [command]);

    useEffect(() => {
        let interval
        if (commandStatus) {
            axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                headers: {"Authorization": global.token}
            }).then((res) => {
                getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
            })
                .catch((err) => global.catchError(err))

            interval = setInterval(() => {
                axios.get(global.way + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
                }).catch((err) => global.catchError(err))
            }, 5000)
        }

        if (!commandStatus) {
            for (let i = 0; i < cmds.length - 1; i++) {
                if (cmds[i] === "execution" || cmds[i] === "accepted for execution") {
                    if (i === 0) {
                        setCmds[i]("")
                        return
                    }
                    setCmds[i]({})
                }
            }
        }

        return () => {
            clearInterval(interval)
        }
    }, [commandStatus]);

    async function cmd(e) {
        e.preventDefault()
        setCommandStatus(true)

        localStorage.setItem(device.Device.DevId + "commandStatus", true)

        await sendCommand(global.way + "/cmd/" + device.Device.DevId, {
            command, trepeat, timeZone, netDelay, type, timeout, kval, tprepare, senseCheck, UIName
        }, global.token).then((res) => {
            getCommandStatus(res.data.Info)
        }).catch((err) => global.catchError(err))
    }

    function getCommandStatus(info = "", res = "") {
        switch (command) {
            case "register":
                setAddPacage((info || res))
                localStorage.setItem(device.Device.DevId + "addPacage", JSON.stringify((info || res)))
                break;
            case "setChos":
                setChos((info || res))
                localStorage.setItem(device.Device.DevId + "chos", JSON.stringify((info || res)))
                break;
            case "getLocation":
                setLocation((info || res))
                localStorage.setItem(device.Device.DevId + "getLocation", JSON.stringify((info || res)))
                break;
            case "updateLocation":
                setUpdateLocation((info || res))
                localStorage.setItem(device.Device.DevId + "updateLocation", JSON.stringify((info || res)))
                break;
            case "setParams":
                setSetParams((info || res))
                localStorage.setItem(device.Device.DevId + "setParams", JSON.stringify((info || res)))
                break;
            case "getParams":
                setGetParams((info || res))
                localStorage.setItem(device.Device.DevId + "getParams", JSON.stringify((info || res)))
                break;
            case "onData":
                setOnData((info || res))
                localStorage.setItem(device.Device.DevId + "onData", JSON.stringify((info || res)))
                break;
            case "reboot":
                setReboot((info || res))
                localStorage.setItem(device.Device.DevId + "reboot", JSON.stringify((info || res)))
                break;
            case "updateSertificate":
                setUpdateSertificate((info || res))
                localStorage.setItem(device.Device.DevId + "updateSertificate", JSON.stringify((info || res)))
                break;
            case "clearAll":
                setClearAll((info || res))
                localStorage.setItem(device.Device.DevId + "clearAll", JSON.stringify((info || res)))
                break;
            default:
                setUpdateUI((info || res))
                localStorage.setItem(device.Device.DevId + "updateUI", JSON.stringify((info || res)))
                break;
        }

        if (info) {
            setCommandStatus(true)

            localStorage.setItem(device.Device.DevId + "commandStatus", true)
        } else {
            if (res.USER_CMD_RESP) {
                if (info.USER_CMD_RESP.UPD_LOCATION === "CMD_RUN") return
            } else if (res.USER_CMD_RESP) {
                if (res.USER_CMD_RESP.state !== "complete") return
            }
            setCommandStatus(false)
            localStorage.setItem(device.Device.DevId + "commandStatus", "")
        }

    }

    return <Page
        header={<FormattedMessage id="commands.header"/>}
        header2={<FormattedMessage id="commands.subheader"/>}
        subHeader={device.Device.DevId}
        elem={
            <form>
                <section className="commands">
                    <h5>
                        <FormattedMessage id="commands.command"/>
                    </h5>
                    <select
                        className="command"
                        onChange={(e) => {
                            setCommand(e.target.value)
                            localStorage.setItem(device.Device.DevId + "cmdName", e.target.value)
                        }}
                        disabled={commandStatus}
                        style={{cursor: commandStatus ? "default" : "pointer"}}
                        value={command}
                    >
                        <option
                            value="register">
                            <FormattedMessage id="commands.options.register"/>
                        </option>
                        <option
                            value="clearAll">
                            <FormattedMessage id="commands.options.clearAll"/>
                        </option>
                        <option
                            value="setChos">
                            <FormattedMessage id="commands.options.setChos"/>
                        </option>
                        <option
                            value="getLocation">
                            <FormattedMessage id="commands.options.getLocation"/>
                        </option>
                        <option
                            value="updateLocation">
                            <FormattedMessage id="commands.options.updateLocation"/>
                        </option>
                        <option
                            value="setParams">
                            <FormattedMessage id="commands.options.setParams"/>
                        </option>
                        <option
                            value="getParams">
                            <FormattedMessage id="commands.options.getParams"/>
                        </option>
                        <option
                            value="onData">
                            <FormattedMessage id="commands.options.onData"/>
                        </option>
                        <option
                            value="reboot">
                            <FormattedMessage id="commands.options.reboot"/>
                        </option>
                        <option
                            value="updateSertificate">
                            <FormattedMessage id="commands.options.updateSertificate"/>
                        </option>
                        <option
                            value="updateUI">
                            <FormattedMessage id="commands.options.updateUI"/>
                        </option>
                    </select>
                    {/*getParams.GET_SENS_ATTR*/}
                </section>
                {(command === "getParams") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>{(getParams.GET_SENS_ATTR && !commandStatus) ?
                        <section>
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
                    <section className="command-settings"></section>
                </> : (command === "setParams") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/></h5>
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
                </> : (command === "setChos") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(chos.LINKSCHEDULE) ? chos.LINKSCHEDULE : (typeof (chos) === "string") ? chos : "no command"}</h5>
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
                                newCount={(val) => setTimeZone(((val) >= -12 && val <= 12) ? val : 0)}
                                setCount={(val) => setTimeZone(((timeZone + val) >= -12 && (timeZone + val)  <= 12) ? timeZone + val : timeZone)}
                            />
                        </div>
                    </section>
                </> : (command === "updateLocation") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:
                        </h5>{(updateLocation.GET_LOCATION && !commandStatus) ? <section>
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
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (addPacage) === "string" && addPacage) ? addPacage : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "clearAll") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>{(clearAll.GET_EXT_INFO && !commandStatus) ?
                        <section>
                            <h5 style={{fontSize: "30px"}}>{clearAll.GET_EXT_INFO}</h5>
                            <h3>Info</h3>
                            <div>
                                <h5>MODEM_IMEI: </h5>
                                <h5>{clearAll.MODEM_IMEI}</h5>
                            </div>
                            <div>
                                <h5>MODEM_VER: </h5>
                                <h5>{clearAll.MODEM_VER}</h5>
                            </div>
                            <div>
                                <h5>REG_ID: </h5>
                                <h5>{clearAll.REG_ID}</h5>
                            </div>
                            <div>
                                <h5>SIM_ICCID: </h5>
                                <h5>{clearAll.SIM_ICCID}</h5>
                            </div>
                        </section> : <h5>{(typeof (clearAll) === "string") ? clearAll : "no command"}</h5>}
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "getLocation") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:
                        </h5>{(getLocation.GET_LOCATION && !commandStatus) ? <section>
                            <h5 style={{fontSize: "30px"}}>{getLocation.GET_LOCATION} </h5>
                            <div>
                                <h5>COORD: </h5>
                                <h5>updateLocation.COORD</h5>
                            </div>
                        </section> :
                        <h5>{(typeof (getLocation) === "string") ? getLocation : "no command"}</h5>}
                        <section className="command-settings"></section>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "onData") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(onData.DEBUG_ON) ? onData.DEBUG_ON : (typeof (onData) === "string") ? onData : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "reboot") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(reboot.DEV_REBOOT) ? reboot.DEV_REBOOT : (typeof (reboot) === "string") ? reboot : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "updateSertificate") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(updateSertificate.FTP_СERT_UPD) ? updateSertificate.FTP_СERT_UPD : (typeof (updateSertificate) === "string") ? updateSertificate : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "updateUI") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
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
                            style={{display: "inline-block"}}
                    >
                        <FormattedMessage id="commands.buttons.submit"/>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setCommandStatus("")
                            localStorage.setItem(device.Device.DevId + "commandStatus", "")
                        }}
                        style={{display: commandStatus ? "inline-block" : "none", margin: 0, marginLeft: 40}}>
                        <FormattedMessage id="commands.buttons.cancel.text"/>
                    </button>
                </div>
            </form>}/>
}