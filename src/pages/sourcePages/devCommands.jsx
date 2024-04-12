import {useEffect, useState} from "react"
import {Page} from "../../components/page"
import {checkDevice} from "../../functions/checkDevice";
import global from "../../store/global";
import "../../styles/pages/sourcePages/devCommands.css"
import {Counter} from "../../components/counter";
import {CheckBox} from "../../components/checkbox";
import {useDevice} from "../../hooks/useDevice";
import {sendCommand} from "../../functions/requests";

export const DevCommands = () => {
    const device = useDevice();
    const [command, setCommand] = useState("register")

    const [registaerState, setRegistaerState] = useState(localStorage.getItem("registerState"))
    const [devState, setDevState] = useState(localStorage.getItem("devState"))
    const [period, setPeriod] = useState(localStorage.getItem("period"))
    const [updateLocation, setUpdateLocation] = useState(localStorage.getItem("updateLocation"))
    const [getLocation, setGetLocation] = useState(localStorage.getItem("getLocation"))
    const [setParams, setSetParams] = useState(localStorage.getItem("setParams"))
    const [getParams, setGetParams] = useState(localStorage.getItem("getParams"))
    const [onData, setOnData] = useState(localStorage.getItem("onData"))
    const [reboot, setReboot] = useState(localStorage.getItem("reboot"));
    const [updateSertificate, setUpdateSertificate] = useState(localStorage.getItem("updateSertificate"));
    const [updateUI, setUpdateUI] = useState(localStorage.getItem("updateUI"));

    //состояния для комманд
    const [trepeat, setTrepeat] = useState(30);
    const [netDelay, setNetDelay] = useState(0);
    const [timeZone, setTimeZone] = useState(0); //может быть < 0

    const [type, setType] = useState(0);
    const [timeout, setTimeout] = useState(0);

    const [getKval, setGetKval] = useState(100);
    const [getTprepare, setGetTprepare] = useState(10);

    const [kval, setKval] = useState(100);
    const [tprepare, setTprepare] = useState(10);
    const [senseCheck, setSenseCheck] = useState(false);

    useEffect(() => {
        if (device.empty) global.setLocation("/sources")
    }, [])

    function cmd(e){
        e.preventDefault()
        if(command === "period")
        sendCommand(global.way + "/cmd/" + device.Device.DevId, {
            command,
            trepeat,
            timeZone,
            netDelay,
            type,
            timeout,
            getKval,
            getTprepare,
            kval,
            tprepare,
            senseCheck
        }, global.token);
    }

    return <Page header="Device Settings" subHeader="Настройки устройства" header2="Команды устройству" elem={<form>
        <section className="commands">
            <h5>Команда</h5>
            <select className="command" onChange={(e) => setCommand(e.target.value)}>
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
                <div className="status">
                    <h5>Статус исполнения:</h5><h5>{getParams || "no command"}</h5>
                </div>
                <section className="command-settings">
                    <div>
                        <h5>Kval</h5>
                        <Counter
                            count={getKval}
                            newCount={(val) => setGetKval(((val) >= 0) ? val : getKval)}
                            setCount={(val) => setGetKval(((getKval + val) >= 0) ? getKval + val : 0)}
                        />
                    </div>
                    <div>
                        <h5>Tprepare</h5>
                        <Counter
                            count={getTprepare}
                            newCount={(val) => setGetTprepare(((val) >= 0) ? val : getTprepare)}
                            setCount={(val) => setGetTprepare(((getTprepare + val) >= 0) ? getTprepare + val : 0)}
                        />
                    </div>
                </section>
            </>

            : (command === "setParams") ? <>
                    <div className="status">
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
                        <div className="status">
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
                            <div className="status">
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
                                <div className="status">
                                    <h5>Статус исполнения:</h5><h5>{registaerState || "no command"}</h5>
                                </div>
                            </>

                            : (command === "devState") ? <>
                                <div className="status">
                                    <h5>Статус исполнения:</h5><h5>{devState || "no command"}</h5>
                                </div>
                            </> : (command === "getLocation") ? <>
                                <div className="status">
                                    <h5>Статус исполнения:</h5><h5>{getLocation || "no command"}</h5>
                                </div>
                            </> : (command === "onData") ? <>
                                <div className="status">
                                    <h5>Статус исполнения:</h5><h5>{onData || "no command"}</h5>
                                </div>
                            </> : (command === "reboot") ? <>
                                <div className="status">
                                    <h5>Статус исполнения:</h5><h5>{reboot || "no command"}</h5>
                                </div>
                            </> : (command === "updateSertificate") ? <>
                            <div className="status">
                                <h5>Статус исполнения:</h5><h5>{updateSertificate || "no command"}</h5>
                            </div>
                            </> : (command === "updateUI") ? <>
                            <div className="status">
                                <h5>Статус исполнения:</h5><h5>{updateUI || "no command"}</h5>
                            </div></>:<></>
            // сюда новые страницы
        }
        <div className="button-container">
            <button onClick={() =>  cmd()}>Отправить</button>
        </div>
    </form>}/>
}