import {useEffect, useState} from "react"
import {Page} from "../../../components/page"
import global from "../../../store/global";
import "../../../styles/pages/sourcePages/devCommands.css"
import {useDevice} from "../../../hooks/useDevice";
import axios from "axios";
import {errorAnalyze} from "../../../functions/error";
import {FormattedMessage} from "react-intl/lib";
import {sendSubCommand} from "../../../functions/subRequests";
import {Counter} from "../../../components/counter";
import {CheckBox} from "../../../components/checkbox";

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
    const [type, setType] = useState(0);
    const [img, setImg] = useState(0);
    const [bleTime, setBleTime] = useState(0);
    const [m, setM] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    const [bleAdvTime, setBleAdvTime] = useState(false);
    const [bleAdvSettings, setBleAdvSettings] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const [thresholdVoltage, setThresholdVoltage] = useState(0);
    const [thresholdPrecent, setThresholdPrecent] = useState(0);
    const [chanal, setChanal] = useState(0);
    const [power, setPower] = useState(0);
    const [word, setWord] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [gwId, setGwId] = useState(0);
    const [devId, setDevId] = useState(0);
    const [win, setWin] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [shedul, setShedul] = useState(0);
    const [reserv, setReserv] = useState(0);
    const [modeVal, setModeVal] = useState(0);
    const [scale, setScale] = useState(0);
    const [threshold, setThreshold] = useState(0);
    const [launchSettings, setLaunchSettings] = useState(0);
    const [settings, setSettings] = useState(0);
    const [time, setTime] = useState(0);
    const [sleepMode, setSleepMode] = useState(0);
    const [mainMode, setMainMode] = useState(0);
    const [sleepSettings, setSleepSettings] = useState(0);
    const [imitMode, setImitMode] = useState(0);
    const [phase, setPhase] = useState(0);
    const [ampli, setAmpli] = useState(0);

    const values = {
        img,
        type,
        launchSettings,
        bleTime,
        m,
        x,
        y,
        z,
        bleAdvTime,
        capacity,
        thresholdVoltage,
        thresholdPrecent,
        chanal,
        power,
        word,
        speed,
        gwId,
        devId,
        win,
        quantity,
        shedul,
        reserv,
        modeVal,
        scale,
        threshold,
        settings,
        time,
        sleepMode,
        sleepSettings,
        mainMode,
        imitMode,
        phase,
        ampli
    }

    useEffect(() => {
        console.log(">", commandStatus)
        let interval
        if (commandStatus) {
            axios.get(global.subWay + "/cmd execution state/" + device.Device.DevId, {
                headers: {"Authorization": global.token}
            }).then((res) => {
                getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
            })
                .catch((err) => errorAnalyze(err, () => setCommandStatus(false)))

            interval = setInterval(() => {
                if (!commandStatus) clearInterval(interval)
                axios.get(global.subWay + "/cmd execution state/" + device.Device.DevId, {
                    headers: {"Authorization": global.token}
                }).then((res) => {
                    getCommandStatus(res.data.Info, res.data["USER_CMD_RESP"])
                })
            }, 5000)
        } else {
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

    const cmd = async (e) => {
        e.preventDefault()

        await sendSubCommand(global.subWay + "/cmd/" + device.Device.DevId, {...values, command}, global.token)
            .then((res) => {
                if (!res) return
                localStorage.setItem(device.Device.DevId + "onLoad", "")
                getCommandStatus(res.data.Info)
            }).catch((err) => global.catchError(err))
    }

    const getCommandStatus = (info = "", res = "") => {
        console.log(commandStatus)
        if (!commandStatus) return
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

        if (!info) {
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
                            {/*<FormattedMessage id="commands.options.package"/>*/}
                            Additional Package
                        </option>
                        <option
                            value="clearAll">
                            {/*<FormattedMessage id="commands.options.clearAllSub"/>*/}
                            Clear all
                        </option>
                        <option
                            value="setChos">
                            {/*<FormattedMessage id="commands.options.setChosSub"/>*/}
                            Set chos img valid
                        </option>
                        <option
                            value="ble">
                            {/*<FormattedMessage id="commands.options.ble"/>*/}
                            Set ble adv time
                        </option>
                        <option
                            value="reset">
                            {/*<FormattedMessage id="commands.options.reset"/>*/}
                            Reset
                        </option>
                        <option
                            value="gain">
                            {/*<FormattedMessage id="commands.options.gain"/>*/}
                            Set gain
                        </option>
                        <option
                            value="battery">
                            {/*<FormattedMessage id="commands.options.battery"/>*/}
                            Set battery param
                        </option>
                        <option
                            value="rf">
                            {/*<FormattedMessage id="commands.options.rf"/>*/}
                            Set sub rf param
                        </option>
                        <option
                            value="sub">
                            {/*<FormattedMessage id="commands.options.sub"/>*/}
                            Set sub param
                        </option>
                        <option
                            value="shedule">
                            {/*<FormattedMessage id="commands.options.shedule"/>*/}
                            Set sub shedule
                        </option>
                        <option
                            value="mode">
                            {/*<FormattedMessage id="commands.options.mode"/>*/}
                            Set mode
                        </option>
                        <option
                            value="vibro">
                            {/*<FormattedMessage id="commands.options.vibro"/>*/}
                            Vibro accel scale
                        </option>
                        <option
                            value="launch">
                            {/*<FormattedMessage id="commands.options.launch"/>*/}
                            Set trac launch
                        </option>
                        <option
                            value="sleep">
                            {/*<FormattedMessage id="commands.options.sleep"/>*/}
                            Set sleep mode
                        </option>
                        <option
                            value="settingsSleep">
                            {/*<FormattedMessage id="commands.options.settingsSleep"/>*/}
                            Set settings sleep mode
                        </option>
                        <option
                            value="imit">
                            {/*<FormattedMessage id="commands.options.imit"/>*/}
                            Set imit settings
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
                            <CheckBox checked={bleAdvTime} setValue={() => setBleAdvTime(!bleAdvTime)}/>
                        </div>
                        <div>
                            <h5>Capaсity</h5>
                            <Counter count={capacity}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setCapacity(0) : setCapacity(num)
                                     }}
                                     setCount={(num) => (capacity + num > 0) ? setCapacity(capacity + num) : setCapacity(0)}
                            />
                        </div>
                        <div>
                            <h5>Threshold voltage</h5>
                            <Counter count={thresholdVoltage}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setThresholdVoltage(0) : setThresholdVoltage(num)
                                     }}
                                     setCount={(num) => (thresholdVoltage + num > 0) ? setThresholdVoltage(thresholdVoltage + num) : setThresholdVoltage(0)}
                            />
                        </div>
                        <div>
                            <h5>Threshold percent</h5>
                            <Counter count={thresholdPrecent}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setThresholdPrecent(0) : setThresholdPrecent(num)
                                     }}
                                     setCount={(num) => (thresholdPrecent + num > 0) ? setThresholdPrecent(thresholdPrecent + num) : setThresholdPrecent(0)}
                            />
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
                            <Counter count={m}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setM(0) : (num > 254) ? setM(254) : setM(num)
                                     }}
                                     setCount={(num) => (m + num > 0 && m + num < 255) ? setM(m + num) : setM(m)}
                            />
                        </div>
                        <div>
                            <h5>X</h5>
                            <Counter count={x}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setX(0) : (num > 254) ? setX(254) : setX(num)
                                     }}
                                     setCount={(num) => (x + num > 0 && x + num < 255) ? setX(x + num) : setX(x)}
                            />
                        </div>
                        <div>
                            <h5>Y</h5>
                            <Counter count={y}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setY(0) : (num > 254) ? setY(254) : setY(num)
                                     }}
                                     setCount={(num) => (y + num > 0 && y + num < 255) ? setY(y + num) : setY(y)}
                            />
                        </div>
                        <div>
                            <h5>Z</h5>
                            <Counter count={z}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setZ(0) : (num > 254) ? setZ(254) : setZ(num)
                                     }}
                                     setCount={(num) => (z + num > 0 && z + num < 255) ? setZ(z + num) : setZ(z)}
                            />
                        </div>
                    </section>
                </> : (command === "setChos") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (chos) === "string") ? chos : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Img</h5>
                            <Counter count={img}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setImg(0) : setImg(num)
                                     }}
                                     setCount={(num) => (img + num > 0) ? setImg(img + num) : setImg(0)}
                            />
                        </div>
                    </section>
                </> : (command === "reset") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (reset) === "string") ? reset : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "addPackage") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (addPackage) === "string" && addPackage) ? addPackage : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>Type</h5>
                            <Counter count={type}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setType(0) : setType(num)
                                     }}
                                     setCount={(num) => (type + num > 0) ? setType(type + num) : setType(0)}
                            />
                        </div>
                    </section>
                </> : (command === "clearAll") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (clearAll) === "string") ? clearAll : "no command"}</h5>
                    </div>
                    <section className="command-settings"></section>
                </> : (command === "ble") ? <>
                    <div className={"status"}>
                        <h5><FormattedMessage id="commands.status"/>:</h5>
                        <h5>{(typeof (ble) === "string") ? ble : "no command"}</h5>
                    </div>
                    <section className="command-settings">
                        <div>
                            <h5>TIME</h5>
                            <Counter count={bleTime}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setBleTime(0) : (num > 10) ? setBleTime(10) : setBleTime(num)
                                     }}
                                     setCount={(num) => (bleTime + num > 0 && bleTime + num < 11) ? setBleTime(bleTime + num) : setBleTime(bleTime)}
                            />
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
                            <Counter count={chanal}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setChanal(0) : setChanal(num)
                                     }}
                                     setCount={(num) => (chanal + num > 0) ? setChanal(chanal + num) : setChanal(0)}
                            />
                        </div>
                        <div>
                            <h5>Power</h5>
                            <Counter count={power}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setPower(0) : setPower(num)
                                     }}
                                     setCount={(num) => (power + num > 0) ? setPower(power + num) : setPower(0)}
                            />
                        </div>
                        <div>
                            <h5>Word</h5>
                            <Counter count={word}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setWord(0) : setWord(num)
                                     }}
                                     setCount={(num) => (word + num > 0) ? setWord(word + num) : setWord(0)}
                            />
                        </div>
                        <div>
                            <h5>Speed</h5>
                            <Counter count={speed}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setSpeed(0) : setSpeed(num)
                                     }}
                                     setCount={(num) => (speed + num > 0) ? setSpeed(speed + num) : setSpeed(0)}
                            />
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
                            <Counter count={gwId}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setGwId(0) : setGwId(num)
                                     }}
                                     setCount={(num) => (gwId + num > 0) ? setGwId(gwId + num) : setGwId(0)}
                            />
                        </div>
                        <div>
                            <h5>Dev id</h5>
                            <Counter count={devId}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setDevId(0) : setDevId(num)
                                     }}
                                     setCount={(num) => (devId + num > 0) ? setDevId(devId + num) : setDevId(0)}
                            />
                        </div>
                        <div>
                            <h5>Win</h5>
                            <Counter count={win}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setWin(0) : setWin(num)
                                     }}
                                     setCount={(num) => (win + num > 0) ? setWin(win + num) : setWin(0)}
                            />
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
                            <Counter count={quantity}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setQuantity(0) : setQuantity(num)
                                     }}
                                     setCount={(num) => (quantity + num > 0) ? setQuantity(quantity + num) : setQuantity(0)}
                            />
                        </div>
                        <div>
                            <h5>Shedul</h5>
                            <Counter count={shedul}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setShedul(0) : setShedul(num)
                                     }}
                                     setCount={(num) => (shedul + num > 0) ? setShedul(shedul + num) : setShedul(0)}
                            />
                        </div>
                        <div>
                            <h5>Reserv</h5>
                            <Counter count={reserv}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setReserv(0) : setReserv(num)
                                     }}
                                     setCount={(num) => (reserv + num > 0) ? setReserv(reserv + num) : setReserv(0)}
                            />
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
                            <Counter count={mainMode}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setMainMode(0) : setMainMode(num)
                                     }}
                                     setCount={(num) => (mainMode + num > 0) ? setMainMode(mainMode + num) : setMainMode(0)}
                            />
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
                            <Counter count={scale}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setScale(0) : setScale(num)
                                     }}
                                     setCount={(num) => (scale + num > 0) ? setScale(scale + num) : setScale(0)}
                            />
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
                            <Counter count={threshold}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setThreshold(0) : setThreshold(num)
                                     }}
                                     setCount={(num) => (threshold + num > 0) ? setThreshold(threshold + num) : setThreshold(0)}
                            />
                        </div>
                        <div>
                            <h5>Settings</h5>
                            <Counter count={launchSettings}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setLaunchSettings(0) : setLaunchSettings(num)
                                     }}
                                     setCount={(num) => (launchSettings + num > 0) ? setLaunchSettings(launchSettings + num) : setLaunchSettings(0)}
                            />
                        </div>
                        <div>
                            <h5>Time</h5>
                            <Counter count={time}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setTime(0) : setTime(num)
                                     }}
                                     setCount={(num) => (time + num > 0) ? setTime(time + num) : setTime(0)}
                            />
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
                            <Counter count={sleepMode}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setSleepMode(0) : setSleepMode(num)
                                     }}
                                     setCount={(num) => (sleepMode + num > 0) ? setSleepMode(sleepMode + num) : setSleepMode(0)}
                            />
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
                            <Counter count={sleepSettings}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setSleepSettings(0) : setSleepSettings(num)
                                     }}
                                     setCount={(num) => (sleepSettings + num > 0) ? setSleepSettings(sleepSettings + num) : setSleepSettings(0)}
                            />
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
                            <Counter count={imitMode}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setImitMode(0) : setImitMode(num)
                                     }}
                                     setCount={(num) => (imitMode + num > 0) ? setImitMode(imitMode + num) : setImitMode(0)}
                            />
                        </div>
                        <div>
                            <h5>Phase</h5>
                            <Counter count={phase}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setPhase(0) : setPhase(num)
                                     }}
                                     setCount={(num) => (phase + num > 0) ? setPhase(phase + num) : setPhase(0)}
                            />
                        </div>
                        <div>
                            <h5>Ampli</h5>
                            <Counter count={ampli}
                                     newCount={(num) => {
                                         (num < 0) ?
                                             setAmpli(0) : setAmpli(num)
                                     }}
                                     setCount={(num) => (ampli + num > 0) ? setAmpli(ampli + num) : setAmpli(0)}
                            />
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
                        setCommandStatus(true)
                        localStorage.setItem(device.Device.DevId + "commandStatus", true)
                        cmd(e)
                    }}
                            className={commandStatus ? "activated-button" : ""}
                            style={{display: "inline-block"}}
                    >
                        <FormattedMessage id="commands.buttons.submit"/>
                    </button>
                    <button
                        onClick={(e) => {
                            console.log(false)
                            e.preventDefault();
                            setCommandStatus(false)
                            localStorage.setItem(device.Device.DevId + "commandStatus", "")
                        }}
                        style={{display: commandStatus ? "inline-block" : "none", margin: 0, marginLeft: 40}}>
                        <FormattedMessage id="commands.buttons.cancel.text"/>
                    </button>
                </div>
            </form>}/>
}