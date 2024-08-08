import "../styles/pages/home.css"
import {Page} from "../components/page";
import {FormattedMessage} from "react-intl/lib";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import global from "../store/global";
import {CheckBox} from "../components/checkbox";
import {observer} from "mobx-react-lite";
import {sendCmd} from "../functions/cmd";

export const Home = observer(() => {
    const [page, setPage] = useState(0);
    const [consoleVal, setConsoleVal] = useState(localStorage.getItem("consoleVal") || "");
    const [inputVal, setInputVal] = useState("");

    const consoleRef = useRef(null);

    const updateHistory = (value) => {
        if (!consoleVal) {
            localStorage.setItem("consoleVal", value);
            setConsoleVal(value);
            console.log(consoleVal)
            return;
        }
        localStorage.setItem("consoleVal", consoleVal + "\n" + value);
        setConsoleVal(consoleVal + "\n" + value);
        setTimeout(() => consoleRef.current.scrollTo(0, consoleRef.current.scrollHeight), 100);
    }

    const clearHistory = () => {
        localStorage.setItem("consoleVal", "");
        setConsoleVal("");
    }

    const cmd = () => {
        updateHistory(inputVal)
        sendCmd(global.shWay + "/cmd_get", global.token, inputVal).then(res => {
            res.data ? updateHistory( inputVal + `\n` + res.data) :
                updateHistory( inputVal + `\n` + "no responce")
        }).catch(() => updateHistory( inputVal + `\n` + "no responce"))
        setInputVal("")
    }


    return (
        <Page
            header={<FormattedMessage id="home.header"/>}
            header2={<FormattedMessage id="home.header2"/>}
            elem={
                <>
                    <div className={"sh-219"}>
                        <nav className="panel-header">
                            <button onClick={() => setPage(0)} className={(page === 0) ? "panel-active" : ""}>
                                <FormattedMessage id="home.panel.home"/>
                            </button>
                            <button onClick={() => setPage(1)} className={(page === 1) ? "panel-active" : ""}>
                                <FormattedMessage id="home.panel.info"/>
                            </button>
                            <button onClick={() => setPage(2)} className={(page === 2) ? "panel-active" : ""}>
                                разработка
                            </button>
                        </nav>

                        {(page === 0) ?
                            <section>
                                <h3><FormattedMessage id="home.console"/></h3>
                                <div className="console">
                                <textarea value={consoleVal} ref={consoleRef}/>
                                    <button
                                        className="clear-measure"
                                        onClick={(e) => clearHistory()}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </button>

                                    <input
                                        value={inputVal}
                                        onChange={(e) => setInputVal(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.code === "Enter") {
                                                if (inputVal) cmd()
                                            }
                                        }}
                                    />
                                    <button onClick={cmd}>Enter</button>
                                </div>
                            </section>
                            : (page === 1) ?
                                <section style={{marginTop: 20}}>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Модель:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.model_name}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Скорость процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.BogoMIPS}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Особенности:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.Features}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Производитель процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.CPU_implementer}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Архитектура процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.CPU_architecture}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Вариант процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.CPU_variant}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Часть процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.CPU_part}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Ревизия процессора:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.CPU_revision}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Оборудование:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.Hardware}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Ревизия оборудования:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.Revision}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Серийный номер:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.processor.Serial}</h5>
                                    </div>
                                </section>
                                :
                                <section>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>Программа:</h5>
                                        <h5 style={{textAlign: "start"}}>{global.progType}</h5>
                                    </div>
                                    <div style={{flexDirection: "row", gap: 100}}>
                                        <h5>
                                            (временно) сменить программу:
                                        </h5>
                                        <h5 style={{
                                            display: "flex",
                                            gap: 40,
                                            height: 50,
                                            alignItems: "center",
                                            textAlign: "start"
                                        }}>
                                        <span>
                                            mqtt
                                        </span>

                                            <CheckBox checked={global.progType === "sub"}
                                                      setValue={() => global.setType()}/>
                                            <span>
                                            sub
                                        </span>
                                        </h5>
                                    </div>
                                </section>
                        }
                    </div>
                </>
            }
        />
    )
})