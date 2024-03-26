import { useEffect, useState } from "react"
import { Page } from "../../components/page"
import { checkDevice } from "../../functions/checkDevice";
import global from "../../store/global";
import "../../styles/pages/sourcePages/devCommands.css"
import { Counter } from "../../components/counter";

export const DevCommands = () => {
    const [command, setCommand] = useState("params")

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
                <select className="command">
                    <option>Зарегистрировать устройство</option>
                    <option>Запросить состояние устройства</option>
                    <option>Устаноить период TU пакетов</option>
                    <option>Обновить координаты устройства</option>
                    <option>Запросить местоположение</option>
                    <option>Устаноить параметры датчика</option>
                    <option>Запросить параметры датчика</option>
                    <option>Включить отладочные данные</option>
                    <option>Перезагрузить устройство</option>
                    <option>Обновить сертификат</option>
                    <option>Обновить встроенное ПО</option>
                </select>
                
            </section>
            <div className="status">
                <h5>Статус исполнения:</h5><h5>OK</h5>
            </div>
            <section className="command-settings">
                {(command == "params") ? <>
                    <div>
                        <h5>Kval</h5><Counter></Counter>
                    </div>
                    <div>
                        <h5>Tprepare</h5><Counter></Counter>
                    </div>
                </> : <></>}
            </section>
            <div className="button-container">
                <button>Отправить</button>
            </div>
        </form>
    }/>
}