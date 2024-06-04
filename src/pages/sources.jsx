import {Page} from "../components/page"
import {CreateRows} from "../functions/createRows"
import "../styles/pages/sources.css"
import global from "../store/global"
import {observer} from "mobx-react-lite"
import { useState } from "react"
import { CheckBox } from "../components/checkbox"
import CreateListRows from "../functions/createListRows"

export const Sources = observer(() => {

    const [info, setInfo] = useState(localStorage.getItem("moreSourceInfo"))

    function updateState(e) {
        e.preventDefault()
        global.setConnection()
    }

    return (
        //страница с источниками: таблица, установка соединения по mqtt
        <Page header="Устройства"  header2="Список устройств" elem={

            <div className="table-container">
                {/* установка соединения по mqtt */}
                <form>
                    <h3>Статус подключения</h3>
                    <section className="state">
                        <h5>Подключение:</h5>
                        <h6>{(typeof (global.state) === "string") ? global.state : (global.state) ? "установлено" : "не установлено"}</h6>
                    </section>
                    {(typeof (global.state) === "boolean") ?
                        <button onClick={(e) => updateState(e)}>{global.state ? "разорвать" : "установить"}</button> :
                        <button onClick={(e) => e.preventDefault()} className="activated-button">{"подождите..."}</button>
                    }

                </form>

                {/* список источников, краткий обзор */}
                <h3>Список всех устройств</h3>

                <div style={{flexDirection:"row", gap:"20px", marginBottom:20, alignItems:"center"}}>
                    Подробно
                    <CheckBox checked={info} setValue={() => {
                        localStorage.setItem("moreSourceInfo", info?"":true)
                        setInfo(!info)
                    }}/>
                    Список
                </div>
                
                <table style={{display:info?"none":"table"}}>
                    <thead>
                    <tr>
                        <th>ID устройства</th>
                        <th>Время</th>
                        <th>уровень сигнала GSM</th>
                        <th>Заряд</th>
                        <th>Температура</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* генерация таблицы */}
                    <CreateRows/>
                    </tbody>
                </table>
                <table style={{display:info?"table":"none"}}>
                    <thead>
                    <tr>
                        <th>ID устройства</th>
                        <th>ID устройства</th>
                        <th>ID устройства</th>
                        <th>ID устройства</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* генерация таблицы */}
                    <CreateListRows/>
                    </tbody>
                </table>
            </div>
        }/>
    )
})