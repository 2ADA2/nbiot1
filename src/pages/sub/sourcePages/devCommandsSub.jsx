import {useEffect, useState} from "react"
import {Page} from "../../../components/page"
import global from "../../../store/global";
import "../../../styles/pages/sourcePages/devCommands.css"
import {useDevice} from "../../../hooks/useDevice";
import axios from "axios";
import {errorAnalyze} from "../../../functions/error";
import {FormattedMessage} from "react-intl/lib";
import {sendCommand} from "../../../functions/requests";
import {sendSubCommand} from "../../../functions/subRequests";
import {CheckBox} from "../../../components/checkbox";
import {Counter} from "../../../components/counter";

export const DevCommandsSub = () => {
    const device = useDevice();
    const [command, setCommand] = useState(localStorage.getItem(device.Device.DevId + "cmdName") || "addPackage")
    const [commandStatus, setCommandStatus] = useState(localStorage.getItem(device.Device.DevId + "commandStatus") ? localStorage.getItem(device.Device.DevId + "commandStatus") : "")

    const [addPackage, setAddPackage] = useState(localStorage.getItem(device.Device.DevId + "addPackage") ? JSON.parse(localStorage.getItem(device.Device.DevId + "addPackage")) : {})
    const [clearAll, setClearAll] = useState(localStorage.getItem(device.Device.DevId + "clearAll") ? JSON.parse(localStorage.getItem(device.Device.DevId + "clearAll")) : {})
    const [chos, setChos] = useState(localStorage.getItem(device.Device.DevId + "chos") ? JSON.parse(localStorage.getItem(device.Device.DevId + "chos")) : {})
    const [reset, setReset] = useState(localStorage.getItem(device.Device.DevId + "reset") ? JSON.parse(localStorage.getItem(device.Device.DevId + "reset")) : {})
    const [ble, setBle] = useState(localStorage.getItem(device.Device.DevId + "ble") ? JSON.parse(localStorage.getItem(device.Device.DevId + "ble")) : {})
    const [gain, setGain] = useState(localStorage.getItem(device.Device.DevId + "gain") ? JSON.parse(localStorage.getItem(device.Device.DevId + "gain")) : {})
    const [battery, setBattery] = useState(localStorage.getItem(device.Device.DevId + "battery") ? JSON.parse(localStorage.getItem(device.Device.DevId + "battery")) : {})
    const [rf, setRf] = useState(localStorage.getItem(device.Device.DevId + "rf") ? JSON.parse(localStorage.getItem(device.Device.DevId + "rf")) : {})
    const [sub, setSub] = useState(localStorage.getItem(device.Device.DevId + "sub") ? JSON.parse(localStorage.getItem(device.Device.DevId + "sub")) : {});
    const [shedule, setShedule] = useState(localStorage.getItem(device.Device.DevId + "shedule") ? JSON.parse(localStorage.getItem(device.Device.DevId + "shedule")) : {});
    const [mode, setMode] = useState(localStorage.getItem(device.Device.DevId + "mode") ? JSON.parse(localStorage.getItem(device.Device.DevId + "mode")) : {});
    const [vibro, setVibro] = useState(localStorage.getItem(device.Device.DevId + "vibro") ? JSON.parse(localStorage.getItem(device.Device.DevId + "vibro")) : {});
    const [launch, setLaunch] = useState(localStorage.getItem(device.Device.DevId + "launch") ? JSON.parse(localStorage.getItem(device.Device.DevId + "launch")) : {});
    const [sleep, setSleep] = useState(localStorage.getItem(device.Device.DevId + "sleep") ? JSON.parse(localStorage.getItem(device.Device.DevId + "sleep")) : {});
    const [settingsSleep, setSettingsSleep] = useState(localStorage.getItem(device.Device.DevId + "settingsSleep") ? JSON.parse(localStorage.getItem(device.Device.DevId + "settingsSleep")) : {});
    const [imit, setImit] = useState(localStorage.getItem(device.Device.DevId + "imit") ? JSON.parse(localStorage.getItem(device.Device.DevId + "imit")) : {});

    const cmds = [addPackage, clearAll, chos, reset, ble, gain, battery, rf, sub, shedule, mode, vibro, launch, sleep, settingsSleep, imit]
    const setCmds = [
        (val) => setAddPackage(val),
        (val) => setClearAll(val),
        (val) => setChos(val),
        (val) => setReset(val),
        (val) => setBle(val),
        (val) => setGain(val),
        (val) => setBattery(val),
        (val) => setRf(val),
        (val) => setSub(val),
        (val) => setShedule(val),
        (val) => setMode(val),
        (val) => setVibro(val),
        (val) => setLaunch(val),
        (val) => setImit(val),
        (val) => setSettingsSleep(val),
        (val) => setSleep(val),

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
        let interval
        if (commandStatus) {
            setTimeout(() => {
                axios.get(global.subWay + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
                })
                    .catch((err) => errorAnalyze(err, () => setCommandStatus()))
            }, 1000)
            interval = setInterval(() => {
                axios.get(global.subWay + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
                })
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

        await sendSubCommand(global.subWay + "/cmd/" + device.Device.DevId, {command}, global.token).then((res) => {
            localStorage.setItem(device.Device.DevId + "onLoad", "")
            getCommandStatus(res.data.Info)
        }).catch((err) => global.catchError(err))
    }

    function getCommandStatus(info = "", res = "") {
        switch (command) {
            case "addPackage":
                setAddPackage((info || res))
                localStorage.setItem(device.Device.DevId + "addPackage", JSON.stringify((info || res)))
                break;
            case "setChos":
                setChos((info || res))
                localStorage.setItem(device.Device.DevId + "chos", JSON.stringify((info || res)))
                break;
            case "ble":
                setBle((info || res))
                localStorage.setItem(device.Device.DevId + "ble", JSON.stringify((info || res)))
                break;
            case "reset":
                setReset((info || res))
                localStorage.setItem(device.Device.DevId + "reset", JSON.stringify((info || res)))
                break;
            case "gain":
                setGain((info || res))
                localStorage.setItem(device.Device.DevId + "gain", JSON.stringify((info || res)))
                break;
            case "battery":
                setBattery((info || res))
                localStorage.setItem(device.Device.DevId + "battery", JSON.stringify((info || res)))
                break;
            case "rf":
                setRf((info || res))
                localStorage.setItem(device.Device.DevId + "rf", JSON.stringify((info || res)))
                break;
            case "sub":
                setSub((info || res))
                localStorage.setItem(device.Device.DevId + "sub", JSON.stringify((info || res)))
                break;
            case "shedule":
                setShedule((info || res))
                localStorage.setItem(device.Device.DevId + "shedule", JSON.stringify((info || res)))
                break;
            case "vibro":
                setVibro((info || res))
                localStorage.setItem(device.Device.DevId + "vibro", JSON.stringify((info || res)))
                break;
            case "sleep":
                setSleep((info || res))
                localStorage.setItem(device.Device.DevId + "sleep", JSON.stringify((info || res)))
                break;
            case "settingsSleep":
                setSettingsSleep((info || res))
                localStorage.setItem(device.Device.DevId + "settingsSleep", JSON.stringify((info || res)))
                break;
            case "imit":
                setImit((info || res))
                localStorage.setItem(device.Device.DevId + "imit", JSON.stringify((info || res)))
                break;
            case "launch":
                setLaunch((info || res))
                localStorage.setItem(device.Device.DevId + "launch", JSON.stringify((info || res)))
                break;
            case "clearAll":
                setClearAll((info || res))
                localStorage.setItem(device.Device.DevId + "clearAll", JSON.stringify((info || res)))
                break;
            default:
                setMode((info || res))
                localStorage.setItem(device.Device.DevId + "mode", JSON.stringify((info || res)))
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
                            value="addPackage">
                            <FormattedMessage id="commands.options.package"/>
                        </option>
                        <option
                            value="clearAll">
                            <FormattedMessage id="commands.options.clearAllSub"/>
                        </option>
                        <option
                            value="setChos">
                            <FormattedMessage id="commands.options.setChosSub"/>
                        </option>
                        <option
                            value="ble">
                            <FormattedMessage id="commands.options.ble"/>
                        </option>
                        <option
                            value="reset">
                            <FormattedMessage id="commands.options.reset"/>
                        </option>
                        <option
                            value="gain">
                            <FormattedMessage id="commands.options.gain"/>
                        </option>
                        <option
                            value="battery">
                            <FormattedMessage id="commands.options.battery"/>
                        </option>
                        <option
                            value="rf">
                            <FormattedMessage id="commands.options.rf"/>
                        </option>
                        <option
                            value="sub">
                            <FormattedMessage id="commands.options.sub"/>
                        </option>
                        <option
                            value="shedule">
                            <FormattedMessage id="commands.options.shedule"/>
                        </option>
                        <option
                            value="mode">
                            <FormattedMessage id="commands.options.mode"/>
                        </option>
                        <option
                            value="vibro">
                            <FormattedMessage id="commands.options.vibro"/>
                        </option>
                        <option
                            value="launch">
                            <FormattedMessage id="commands.options.launch"/>
                        </option>
                        <option
                            value="sleep">
                            <FormattedMessage id="commands.options.sleep"/>
                        </option>
                        <option
                            value="settingsSleep">
                            <FormattedMessage id="commands.options.settingsSleep"/>
                        </option>
                        <option
                            value="imit">
                            <FormattedMessage id="commands.options.imit"/>
                        </option>
                    </select>
                    {/*battery.GET_SENS_ATTR*/}
                </section>
                {(command === "battery") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (battery) === "string") ? battery : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>GET BLE ADV TIME</h5>
                            <CheckBox/>
                        </div>
                        <div>
                            <h5>Capaсity</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Threshold voltage</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Threshold percent</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "gain") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/></h5>
                        <h5>{(typeof (battery) === "string") ? battery : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>M</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>X</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Y</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Z</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "setChos") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (chos) === "string") ? chos : "no command"}</h5>
                    </div>
                </> : (command === "reset") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (reset) === "string") ? reset : "no command"}</h5>
                    </div>
                </> : (command === "addPackage") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (addPackage) === "string" && addPackage) ? addPackage : "no command"}</h5>
                    </div>
                </> : (command === "clearAll") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (clearAll) === "string") ? clearAll : "no command"}</h5>
                    </div>
                </> : (command === "ble") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (ble) === "string") ? ble : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>TIME</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "rf") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (rf) === "string") ? rf : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Chanal</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Power</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Word</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Speed</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "sub") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (sub) === "string") ? sub : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Gw id</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Dev id</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Win</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "shedule") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (shedule) === "string") ? shedule : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Quantity</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Shedul</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Reserv</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "mode") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (mode) === "string") ? mode : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Mode</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "vibro") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (vibro) === "string") ? vibro : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Scale</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "launch") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (launch) === "string") ? launch : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Threshold </h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Settings</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Time</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "sleep") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (sleep) === "string") ? sleep : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Mode</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "settingsSleep") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (settingsSleep) === "string") ? settingsSleep : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Settings</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : (command === "imit") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (imit) === "string") ? imit : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Mode</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Phase</h5>
                            <Counter/>
                        </div>
                        <div>
                            <h5>Ampli</h5>
                            <Counter/>
                        </div>
                    </section>
                </> : <>{command}</>
                }

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
                    >
                        <FormattedMessage id="commands.buttons.submit"/>
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setCommandStatus("")
                            localStorage.setItem(device.Device.DevId + "commandStatus", "")
                        }}
                        style={{display: commandStatus ? "block" : "none"}}>
                        <FormattedMessage id="commands.buttons.cancel.text"/>
                    </button>
                </div>
            </form>}/>
}