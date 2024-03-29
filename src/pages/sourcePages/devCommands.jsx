import { useEffect, useState } from "react"
import { Page } from "../../components/page"
import { checkDevice } from "../../functions/checkDevice";
import global from "../../store/global";
import "../../styles/pages/sourcePages/devCommands.css"
import { Counter } from "../../components/counter";
import { CheckBox } from "../../components/checkbox";

export const DevCommands = () => {
    const [command, setCommand] = useState("register")
    const [status, setStatus] = useState("no command")

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
        checkDevice(global.device, "/sources" )
    },[]);
    if(!Object.keys(global.device).length){
        return <></>
    }

    return <Page header = "Device Settings" subHeader="Настройки устройства" header2 = "Команды устройству" elem={
        <form>
            <section className="commands">
                <h5>Команда</h5>
                <select className="command" onChange={(e) => setCommand(e.target.value)}>
                    <option 
                        value = "register">
                            Зарегистрировать устройство
                    </option>
                    <option 
                        value = "register">
                            Запросить состояние устройства
                    </option>
                    <option 
                        value = "setPeriod">
                            Устаноить период TU пакетов
                    </option>
                    <option 
                        value = "updateLocation">
                            Обновить координаты устройства
                    </option>
                    <option 
                        value = "getLocation">
                            Запросить местоположение
                    </option>
                    <option 
                        value = "setParams">
                            Устаноить параметры датчика
                    </option>
                    <option 
                        value = "getParams">
                            Запросить параметры датчика
                    </option>
                    <option 
                        value = "onData">
                            Включить отладочные данные
                    </option>
                    <option 
                        value = "reboot">
                            Перезагрузить устройство</option>
                    <option 
                        value = "updateSertificate">
                            Обновить сертификат
                    </option>
                    <option 
                        value = "updateUI">
                            Обновить встроенное ПО
                    </option>
                </select>
                
            </section>
            <div className="status">
                <h5>Статус исполнения:</h5><h5>{status}</h5>
            </div>
                {   (command == "getParams") ? 
                    <section className="command-settings">
                        <div>
                            <h5>Kval</h5>
                            <Counter
                                count={getKval}
                                newCount={(val) => setGetKval(((val)>=0) ? val : getKval)}
                                setCount={(val) => setGetKval(((getKval + val)>=0) ? getKval + val:0)}
                            />
                        </div>
                        <div>
                            <h5>Tprepare</h5>
                            <Counter
                                count={getTprepare}
                                newCount={(val) => setGetTprepare(((val)>=0) ? val : getTprepare)}
                                setCount={(val) => setGetTprepare(((getTprepare + val)>=0) ? getTprepare + val:0)}
                            />
                        </div>
                    </section>
                    : (command == "setParams") ? 
                    <section className="command-settings">
                        <div>
                            <h5>Kval</h5>
                            <Counter
                                count={kval}
                                newCount={(val) => setKval(((val)>=0) ? val : kval)}
                                setCount={(val) => setKval(((kval + val)>=0) ? kval + val:0)}
                            />
                        </div>
                        <div>
                            <h5>Tprepare</h5>
                            <Counter
                                count={tprepare}
                                newCount={(val) => setTprepare(((val)>=0) ? val : tprepare)}
                                setCount={(val) => setTprepare(((tprepare + val)>=0) ? tprepare + val:0)}
                            />
                        </div>
                        <div>
                            <h5>Sense check</h5>
                            <CheckBox
                                checked = {senseCheck}
                                setValue={() => setSenseCheck(!senseCheck)}
                            />
                        </div>
                    </section> 
                    : (command == "setPeriod") ? 
                    <section className="command-settings">
                        <div>
                            <h5>Trepeat</h5>
                            <Counter
                                count={trepeat}
                                newCount={(val) => setTrepeat(((val)>=0) ? val : trepeat)}
                                setCount={(val) => setTrepeat(((trepeat + val)>=0) ? trepeat + val:0)}
                            />
                        </div>
                        <div>
                            <h5>Net Delay</h5>
                            <Counter
                                count={netDelay}
                                newCount={(val) => setNetDelay(((val)>=0) ? val : netDelay)}
                                setCount={(val) => setNetDelay(((netDelay + val)>=0) ? netDelay + val:0)}
                            />
                        </div>
                        <div>
                            <h5>Time Zone</h5>
                            <Counter
                                count={timeZone}
                                newCount={(val) => setTimeZone(((val)>=0) ? val : timeZone)}
                                setCount={(val) => setTimeZone(((timeZone + val)>=0) ? timeZone + val:0)}
                            />
                        </div>
                    </section> 
                    :(command == "updateLocation") ?
                    <section className="command-settings">
                        <div>
                            <h5>GNSS Type</h5>
                            <Counter
                                count={type}
                                newCount={(val) => setType(((val)>=0) ? val : type)}
                                setCount={(val) => setType(((type + val)>=0) ? type + val:0)}
                            />
                        </div>
                        <div>
                            <h5>GNSS Timeout</h5>
                            <Counter
                                count={timeout}
                                newCount={(val) => setTimeout(((val)>=0) ? val : timeout)}
                                setCount={(val) => setTimeout(((timeout + val)>=0) ? timeout + val:0)}
                            />
                        </div>
                    </section>
                    :<></>
                    // сюда новые страницы
                }
            <div className="button-container">
                <button>Отправить</button>
            </div>
        </form>
    }/>
}