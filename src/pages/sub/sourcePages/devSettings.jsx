import {Page} from "../../../components/page"
import "../../../styles/pages/sourcePages/devSettings.css"
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Counter} from "../../../components/counter";
import settings from "../../../store/settings";
import axios from "axios";
import global from "../../../store/global"
import {devices as devs} from "../../../utils/devices";

const devices = devs

function checkFrame(e, style) {
    if (e.target.className === "frame") {
        e.target.style.boxShadow = style
    }
    if (e.target.parentNode.className === "frame") {
        e.target.parentNode.style.boxShadow = style
    }
    if (e.target.parentNode.parentNode.className === "frame") {
        e.target.parentNode.parentNode.style.boxShadow = style
    }
    if (e.target.parentNode.parentNode.parentNode.className === "frame") {
        e.target.parentNode.parentNode.parentNode.style.boxShadow = style
    }
}

function generateID(frameList) {
    let id = 0
    while (frameList.filter(e => e.id === id).length) {
        id += 1
    }
    return id
}

export const DevSettingsSub = observer(() => {
    const [frameList, setFrameList] = useState(localStorage.getItem("frameList") ? JSON.parse(localStorage.getItem("frameList")) : []);

    const [settingsStatus, setSettingsStatus] = useState();
    const [count, setCount] = useState(1);
    const [interval, setInterval] = useState(1);
    const [type, setType] = useState("MM101.1");
    const [settingsId, setSettingsId] = useState(null);
    const [settingsParams, setSettingsParams] = useState({});


    const [currentFrame, setCurrentFrame] = useState(null);
    const [mouseOn, setMouseOn] = useState(false);

    const [device, setDevice] = useState(null);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        localStorage.setItem("frameList", JSON.stringify(frameList));
        axios.post(global.subWay + "/cmd",
            {USER_CMD: "Set SUB SHEDULE",
                "USER_ARG":{
                    Quantity:frameList.length,
                    Shedule:frameList.map(e => [e.interval, e.count, types.indexOf(e.type)])
                }
            },
            {
                headers: {
                    "authorization": global.token
                }
            })
    }, [frameList]);

    useEffect(() => {
        axios.post(global.subWay + "/cmd",
            {USER_CMD: "GET SUB SHEDULE"},
            {
                headers: {
                    "authorization": global.token
                }
            })
        setDevice("MM101.1")
        setTypes(devices["MM101.1"])

    }, []);


    function handleChange(num, count, setter) {
        if ((count + num) > 0) {
            setter(num + count);
        }
    }

    function add() {
        clearSettings()
        setType("TU")
        setCount(1);
        setInterval(1);
        setSettingsStatus("settings");
        setSettingsId(null)
    }

    function newFrame() {
        setFrameList([...frameList, {count, interval, type, id: generateID(frameList), order: frameList.length}])
        setType()
        setCount(1);
        setInterval(1);
        setSettingsStatus(false);
    }

    function dragStartHandler(e, frame) {
        setCurrentFrame(frame)
    }

    function dragLeaveHandler(e) {
        checkFrame(e, "none")
    }

    function dragEndHandler(e) {
        setCurrentFrame(null)
    }

    function dragOverHandler(e) {
        e.preventDefault()
        checkFrame(e, (settings.theme === "dark") ? "0 1px white" : "0 1px #2c3642");

    }

    function dragDropHandler(e, frame) {
        e.preventDefault()
        checkFrame(e, "none")

        if (frame.id === currentFrame.id) {
            return
        }
        setFrameList(frameList.map((f) => {
            if (f.id === frame.id) {
                if (currentFrame.order < frame.order) {
                    return {...f, order: frame.order - 1}
                } else {
                    return {...f, order: frame.order}
                }
            }

            if (f.id === currentFrame.id) {
                if (currentFrame.order < frame.order) {
                    return {...f, order: frame.order}
                } else {
                    return {...f, order: frame.order + 1}
                }
            }

            if (currentFrame.order < f.order) {
                if (frame.order < f.order) {
                    return {...f, order: f.order}
                }
                return {...f, order: f.order - 1}
            } else {
                if (frame.order > f.order) {
                    return {...f, order: f.order}
                }
                return {...f, order: f.order + 1}
            }


        }).sort((a, b) => sortFrames(a, b)))


    }

    const sortFrames = (a, b) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    const clearSettings = () => {
        setSettingsStatus()
        setType()
        setSettingsId(null)
        setSettingsParams({});
    }

    const delFrame = () => {
        let count = -1
        let newFrameList = frameList.map((frame) => {
            if (frame.id !== settingsId) {
                count += 1
                return {...frame, order: count}
            }
            return null
        })

        setFrameList(newFrameList.filter(f => f !== null))
        clearSettings()
    }

    const updateFrame = () => {
        let newFrameList = frameList.slice()
        const oldFrame = frameList.filter(f => f.id === settingsId)[0]
        newFrameList.splice(oldFrame.order, 1, {
            count: settingsParams.count,
            interval: settingsParams.interval,
            type: type,
            id: oldFrame.id,
            order: oldFrame.order,
        })
        setFrameList(newFrameList)
        clearSettings()
    }

    return <Page
        header={<FormattedMessage id="deviceSettings.header"/>}
        header2={<>
            <FormattedMessage id="deviceSettings.subheader"/>
            <span style={{paddingLeft: "10px"}}>{device}</span>
        </>}
        elem={
            <div className={"devSettingsSub"}>
                <h3>Настройки frame</h3>
                <section style={{marginTop: 20}} className={"frame-settings"}>
                    {!settingsStatus ?
                        <>
                            <h1>
                                Не выбрано
                            </h1>
                            <h2>
                                Выберите нужный пункт в расписании для настройки
                            </h2>
                        </>
                        : (settingsStatus === "settings" && type) ?
                            <>
                                <h1 style={{fontSize: 40, marginBottom: 40}}>Новое расписание</h1>
                                <select onChange={(e) => {
                                    setType(e.target.value)
                                }}
                                        style={{marginBottom: 40}}>
                                    {
                                        types.map(e =>
                                            <option value={e}>
                                                {e}
                                            </option>
                                        )
                                    }
                                </select>
                                <div style={{display: "flex", flexDirection: "row", gap: 40}}>
                                    <h5 style={{
                                        width: "clamp(200px, 25vw, 300px)",
                                        lineHeight: "50px",
                                        textAlign: "start"
                                    }}>interval, min:</h5>
                                    <Counter
                                        count={interval}
                                        newCount={(count) => (count > 0) ? setInterval(count) : setInterval(1)}
                                        setCount={(num) => handleChange(num, interval, (num) => setInterval(num))}
                                    />
                                </div>

                                <div style={{display: "flex", flexDirection: "row", gap: 40, marginTop: 20}}>
                                    <h5 style={{
                                        width: "clamp(200px, 25vw, 300px)",
                                        lineHeight: "50px",
                                        textAlign: "start"
                                    }}>count:</h5>
                                    <Counter
                                        count={count}
                                        newCount={(count) => (count > 0) ? setCount(count) : setCount(1)}
                                        setCount={(num) => handleChange(num, count, (num) => setCount(num))}
                                    />
                                </div>

                                <div className="frame-buttons-container">
                                    <button onClick={() => newFrame()} style={{"margin-right": 20}}>
                                        Добавить
                                    </button>
                                    <button onClick={() => {
                                        clearSettings()
                                    }}>
                                        Отменить
                                    </button>
                                </div>
                            </>
                            :
                            <>
                                <h1 style={{fontSize: 40, marginBottom: 40}}>Изменение расписания</h1>
                                <select onChange={(e) => {
                                    setType(e.target.value)
                                }}
                                        style={{marginBottom: 40}}>
                                    {
                                        types.map(e =>
                                            <option value={e}>
                                                {e}
                                            </option>
                                        )
                                    }
                                </select>
                                <div style={{display: "flex", flexDirection: "row", gap: 40}}>
                                    <h5 style={{
                                        width: "clamp(200px, 25vw, 300px)",
                                        lineHeight: "50px",
                                        textAlign: "start"
                                    }}>interval, min:</h5>
                                    <Counter
                                        count={settingsParams.interval}
                                        newCount={(num) => (num > 0) ? setSettingsParams({
                                            ...settingsParams,
                                            interval: num
                                        }) : setSettingsParams({...settingsParams, interval: 1})}
                                        setCount={(num) => handleChange(num, settingsParams.interval, (num) => setSettingsParams({
                                            ...settingsParams,
                                            interval: num
                                        }))}
                                    />
                                </div>

                                <div style={{display: "flex", flexDirection: "row", gap: 40, marginTop: 20}}>
                                    <h5 style={{
                                        width: "clamp(200px, 25vw, 300px)",
                                        lineHeight: "50px",
                                        textAlign: "start"
                                    }}>count:</h5>
                                    <Counter
                                        count={settingsParams.count}
                                        newCount={(num) => (num > 0) ? setSettingsParams({
                                            ...settingsParams,
                                            count: num
                                        }) : setSettingsParams({...settingsParams, count: 1})}
                                        setCount={(num) => handleChange(num, settingsParams.count, (num) => setSettingsParams({
                                            ...settingsParams,
                                            count: num
                                        }))}
                                    />
                                </div>
                                <div className="frame-buttons-container">
                                    <button onClick={updateFrame} style={{marginRight: 20}}>
                                        Сохранить
                                    </button>
                                    <button onClick={() => {
                                        clearSettings()
                                    }} style={{marginRight: 20}}>
                                        Отменить
                                    </button>
                                    <button onClick={delFrame} style={{width: 70}}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                            </>
                    }
                </section>
                <h3>Расписание</h3>
                <section className={"frame-list"}>
                    <div className="frame-list-header">
                        <FontAwesomeIcon
                            onClick={add}
                            icon={faPlus}
                            style={{
                                cursor: "pointer",
                                display: "inline-block",
                                width: "20px",
                                "borderRadius": "5px"
                            }}/>
                    </div>
                    <div className="frame-list-body" style={{minHeight: 100}}>
                        {
                            frameList.map(frame =>
                                <div
                                    key={frame.id}

                                    onDragStart={(e) => dragStartHandler(e, frame)}
                                    onDragLeave={(e) => dragLeaveHandler(e)}
                                    onDragEnd={(e) => dragEndHandler(e)}
                                    onDragOver={(e) => dragOverHandler(e)}
                                    onDrop={(e) => dragDropHandler(e, frame)}


                                    draggable={mouseOn}
                                    className={"frame"}
                                    style={{flexDirection: "row", maxWidth:1000}}>
                                    <button
                                        onMouseEnter={() => setMouseOn(true)}
                                        onMouseLeave={() => setMouseOn(false)}
                                        style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                    >
                                        <FontAwesomeIcon icon={faBars}/>
                                    </button>

                                    <button
                                        style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                        onClick={() => {
                                            clearSettings()
                                            setSettingsId(frame.id)
                                            setSettingsStatus("edit")
                                            setSettingsParams({interval: frame.interval, count: frame.count})
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPencil}/>
                                    </button>
                                    <div>
                                        {frame.count} раз(а)
                                    </div>
                                    <div>
                                        {frame.interval} мин
                                    </div>
                                    <div
                                        style={{flex: "1 1 auto", display:"flex", justifyContent: "start", alignItems: "start"}}>
                                        {frame.type}
                                    </div>
                                    <div>
                                        ID : {frame.id}
                                    </div>
                                </div>
                            )}
                    </div>
                </section>
            </div>
        }
    />
})