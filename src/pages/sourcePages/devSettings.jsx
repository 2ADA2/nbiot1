import {CheckBox} from "../../components/checkbox";
import {Counter} from "../../components/counter";
import {Page} from "../../components/page"
import global from "../../store/global";
import {useEffect, useState} from "react"
import "../../styles/pages/sourcePages/devSettings.css"
import {InputDate} from "../../components/inputDate";
import {useDevice} from "../../hooks/useDevice";
import {observer} from "mobx-react-lite";
import {clear, setUTC, startMeasure, startMeasureImit} from "../../functions/requests";
import axios from "axios";
import {convertTime} from "../../functions/convrtTime";
import {errorAnalyze} from "../../functions/error";
import {createList} from "../../functions/createList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { measureStates } from "../../utils/measureStatus";

export const DevSettings = observer(() => {
    const device = useDevice()
    const [date, setDate] = useState(convertTime(new Date()));

    const [target, setTarget] = useState("загрузка...")
    const [fullFilled, setFullFilled] = useState("загрузка...")
    const [started, setStarted] = useState({"meas add status" : null})

    const [time, setTime] = useState(0);
    const [repeat, setRepeat] = useState(0)
    const [mode, setMode] = useState("measurement")
    const [filter, setFilter] = useState(1)

    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [artist, setArtist] = useState("");

    //состояние для таблицы
    const [SignA1, setSignA1] = useState(0);
    const [SignA2, setSignA2] = useState(0);
    const [SignA3, setSignA3] = useState(0);
    const [SignB1, setSignB1] = useState(0);
    const [SignB2, setSignB2] = useState(0);
    const [SignB3, setSignB3] = useState(0);
    const [SignC1, setSignC1] = useState(0);
    const [SignC2, setSignC2] = useState(0);
    const [SignC3, setSignC3] = useState(0);
    const [Noise, setNoise] = useState(0);

    function getState() {
        axios.post(global.way + "/list measure/" + device.Device.DevId, {
            "MeasList": "target"
        }, {headers: {"Authorization": global.token}})
            .then((res) => {
                if(typeof (res.data) === "object"){
                    setTarget(createList(res.data))
                    return
                }
                setTarget(res.data)
            })
            .catch((err) => errorAnalyze(err))

        axios.post(global.way + "/list measure/" + device.Device.DevId, {
            "MeasList":"fulfilled "
        }, {headers: {"Authorization": global.token}})
            .then((res) => {
                if (typeof (res.data) === "object") {
                    setFullFilled(createList(res.data))
                    return
                }
                setFullFilled(res.data)
            })
            .catch((err) => errorAnalyze(err))
    }


    useEffect(() => {
        if (device.empty) global.setLocation("/sources")
        getState()

        const interval = setInterval(() => {
            getState()
        }, 20000)

        return () => {
            clearInterval(interval)
        }        
    }, []);

    function utcSet() {
        setUTC(global.way + "/utc set/" + device.Device.DevId, !device.utc, global.token)
            .then(() => global.updateDevices())
    }

    function start(e) {
        e.preventDefault()
        if(started["meas add status"] === "connect") return
        setStarted({"meas add status" : "connect"})
        if (mode === "imitatorMode") {
            const res = startMeasureImit(global.way + "/measure/" + device.Device.DevId, {
                date,
                time,
                repeat,
                filter,
                title,
                comment,
                artist,
                SignA1,
                SignB1,
                SignC1,
                SignA2,
                SignB2,
                SignC2,
                SignA3,
                SignB3,
                SignC3,
                Noise,
            }, global.token, (data) => setStarted(data)).then(() => getState())
            setStarted(res)
        } else {
            startMeasure(global.way + "/measure/" + device.Device.DevId, {
                date,
                time,
                repeat,
                filter,
                title,
                comment,
                artist
            }, global.token, (data) => setStarted(data)).then(() => getState()).catch(() => global.updateToken())
        }
    }

    function clearMeasure(e, measure) {
        e.preventDefault()
        clear(global.way + '/clear measure/' + device.Device.DevId, global.token, measure)
            .then(() => getState())
    }

    return <Page
        header="Настройки устройства"
        header2="Настройки устройства"
        elem={
            <form className="devSettings">
                <h3>Настройки замера</h3>
                <section className="measurement">
                    <section className="counters">
                        <div>
                            <h5>Произвести измерение в</h5>
                            <InputDate
                                date={date}
                                newDate={(newDate) => setDate(newDate)}
                            />
                        </div>
                        <div>
                            <h5>Время замера, сек</h5>
                            <Counter
                                count={time}
                                newCount={(newTime) => setTime((newTime >= 0) ? newTime : time)}
                                setCount={(newTime) => setTime((newTime + time >= 0) ? newTime + time : time)}
                            />
                        </div>
                        <div>
                            <h5>Повторять измерение каждые, сек</h5>
                            <Counter
                                count={repeat}
                                newCount={(newRepeat) => setRepeat((newRepeat >= 0) ? newRepeat : repeat)}
                                setCount={(newRepeat) => setRepeat((newRepeat + repeat >= 0) ? newRepeat + repeat : repeat)}
                            />
                        </div>
                    </section>
                    <section className="inputs">
                        <div>
                            <h5>UTC</h5><CheckBox checked={device.utc} setValue={utcSet}/>
                        </div>
                        <div>
                            <h5>Режим измерения</h5>
                            <select onChange={(e) => {
                                setMode(e.target.value)
                            }}>
                                <option value="measurementMode">режим измерений</option>
                                <option value="imitatorMode">режим имитатора</option>
                            </select>
                        </div>
                        <div>
                            <h5>Режим фильтра</h5>
                            <select onChange={(e) => {
                                setFilter(e.target.value)
                            }}>
                                <option value={"FIRmod1"}>FIRmod1</option>
                                <option value={"FIRmod2"}>FIRmod2</option>
                                <option value={"FIRmod3"}>FIRmod3</option>
                                <option value={"FIRmod4"}>FIRmod4</option>
                            </select>
                        </div>
                    </section>
                </section>

                {/* настройки имитатора */}
                <h3 style={{display: (mode === "imitatorMode") ? "block" : "none"}}>Настройки имитатора</h3>
                <section className="imitator-settings" style={{display: (mode === "imitatorMode") ? "block" : "none"}}>
                    <table style={{cursor:"default"}}>
                        <thead>
                        <tr>
                            <td></td>
                            <td>Амплитуда</td>
                            <td>Частота</td>
                            <td>Фаза</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Сигнал А</td>
                            <td>
                                <Counter
                                    count={SignA1}
                                    newCount={(val) => setSignA1(((val) >= 0) ? val : SignA1)}
                                    setCount={(val) => setSignA1(((SignA1 + val) >= 0) ? SignA1 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignA2}
                                    newCount={(val) => setSignA2(((val) >= 0) ? val : SignA2)}
                                    setCount={(val) => setSignA2(((SignA2 + val) >= 0) ? SignA2 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignA3}
                                    newCount={(val) => setSignA3(((val) >= 0) ? val : SignA3)}
                                    setCount={(val) => setSignA3(((SignA3 + val) >= 0) ? SignA3 + val : 0)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Сигнал B</td>
                            <td>
                                <Counter
                                    count={SignB1}
                                    newCount={(val) => setSignB1(((val) >= 0) ? val : SignB1)}
                                    setCount={(val) => setSignB1(((SignB1 + val) >= 0) ? SignB1 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignB2}
                                    newCount={(val) => setSignB2(((val) >= 0) ? val : SignB2)}
                                    setCount={(val) => setSignB2(((SignB2 + val) >= 0) ? SignB2 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignB3}
                                    newCount={(val) => setSignB3(((val) >= 0) ? val : SignB3)}
                                    setCount={(val) => setSignB3(((SignB3 + val) >= 0) ? SignB3 + val : 0)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Сигнал C</td>
                            <td>
                                <Counter
                                    count={SignC1}
                                    newCount={(val) => setSignC1(((val) >= 0) ? val : SignC1)}
                                    setCount={(val) => setSignC1(((SignC1 + val) >= 0) ? SignC1 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignC2}
                                    newCount={(val) => setSignC2(((val) >= 0) ? val : SignC2)}
                                    setCount={(val) => setSignC2(((SignC2 + val) >= 0) ? SignC2 + val : 0)}
                                />
                            </td>
                            <td>
                                <Counter
                                    count={SignC3}
                                    newCount={(val) => setSignC3(((val) >= 0) ? val : SignC3)}
                                    setCount={(val) => setSignC3(((SignC3 + val) >= 0) ? SignC3 + val : 0)}
                                />
                            </td>
                        </tr>
                        <tr className="Noise">
                            <td>Шум</td>
                            <td>
                                <Counter
                                    count={Noise}
                                    newCount={(val) => setNoise(((val) >= 0) ? val : Noise)}
                                    setCount={(val) => setNoise(((Noise + val) >= 0) ? Noise + val : 0)}
                                />
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <h3>Замеры</h3>
                <section className="measurements">
                    <div className="console">
                        <h5>Действующие замеры</h5>
                        <textarea className="measurement-now" value={target}></textarea>
                        <button className="clear-measure" onClick={(e) => clearMeasure(e, "target")}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                    </div>
                    <div className="console">
                        <h5>Выполненные замеры</h5>
                        <textarea value={fullFilled}></textarea>
                        <button className="clear-measure" onClick={(e) => clearMeasure(e, "fulfilled")}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                    </div>
                </section>

                <h3>Комментарий</h3>
                <section className="comments">
                    <label>
                        <h5>Заголовок</h5>
                        <input type="text" value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }}></input>
                    </label>
                    <label>
                        <h5>Комментарий</h5>
                        <input type="text" value={comment} onChange={(e) => {
                            setComment(e.target.value)
                        }}></input>
                    </label>
                    <label>
                        <h5>Автор</h5>
                        <input type="text" value={artist} onChange={(e) => {
                            setArtist(e.target.value)
                        }}></input>
                    </label>
                </section>

                <span className="buttons" style={{position:"relative"}}>
                    <div 
                        className="meas-started" 
                        style={{top:-20, position:"absolute", display: (started["meas add status"] === 0 || (started["meas add status"] && started["meas add status"] !== 'connect')) ? "block" : "none"}}
                    >
                        {measureStates [started["meas add status"]]}
                    </div>

                    <div 
                        className="meas-started meas-started-connect" 
                        style={{top:-20, position:"absolute", display: (started["meas add status"] === 'connect') ? "block" : "none"}}
                    >
                        подключение...
                    </div>

                    <button onClick={(e) => start(e)} className={started["meas add status"] === "connect" ? "activated-button" : ""}>
                        Отправить
                    </button>
                    <button onClick={(e) => clearMeasure(e, "all")}>
                        Очистить списки
                    </button>
                </span>
            </form>
        }
    />
})