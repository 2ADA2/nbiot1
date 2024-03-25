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
                    <option>Регистрация устройства</option>
                    <option>получить расширенный статус</option>
                    <option>устаноить период выдачи статуса устаноить</option>
                    <option>обноить координаты устройства</option>
                    <option>запрос координат устройства</option>
                    <option>устаноить параметры</option>
                    <option selected={true}>запросить параметры датчика</option>
                    <option>включить отладку</option>
                    <option>перезагрузка устройства</option>
                    <option>обновить сертификат</option>
                    <option>обновить встроенное ПО</option>
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