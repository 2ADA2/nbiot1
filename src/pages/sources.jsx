import {Page} from "../components/page"
import {CreateRows} from "../functions/createRows"
import "../styles/pages/sources.css"
import global from "../store/global"
import {observer} from "mobx-react-lite"

export const Sources = observer(() => {

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
                        <h6>{global.state ? "установлено" : "не установлено"}</h6>
                    </section>
                    {(typeof (global.state) === "boolean") ?
                        <button onClick={(e) => updateState(e)}>{global.state ? "разорвать" : "установить"}</button> :
                        <button onClick={(e) => e.preventDefault()} className="activated-button">{"подождите..."}</button>
                    }

                </form>

                {/* список источников, краткий обзор */}
                <h3>Список всех устройств</h3>
                <table>
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
            </div>
        }/>
    )
})