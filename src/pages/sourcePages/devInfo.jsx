import { Page } from "../../components/page"
import { checkDevice } from "../../functions/checkDevice";
import global from "../../store/global";
import { useEffect } from "react";
import "../../styles/pages/sourcePages/devInfo.css"
import { CheckBox } from "../../components/checkbox";
import DBState from "../../asks/DBState.json"

export const DevInfo = () => { 
    useEffect(() => {
        checkDevice(global.device, "/sources" )
    },[]);
    if(!Object.keys(global.device).length){
        return <></>
    }
    const device = global.device
    return <Page header = "Device Settings" subHeader="Настройки устройства" header2 = "Информация об устройстве" elem={
        <>
            <section className="devInfo">
                <h3>Информация</h3>
                <div> <h5>Идентификационный номер</h5> <h5>{device.Device.DevId}</h5> </div>
                <div> <h5>Модель</h5> <h5>{device.Device.DevName}</h5> </div>
                <div> <h5>Версия программного обеспечения</h5> <h5>{device.Device["SoftVer."]}</h5> </div>
                <div> <h5>Версия платы</h5> <h5>{device.Device["BoardRev."]}</h5> </div>
                <div> <h5>Версия протокла</h5> <h5>{device.Device["ProtoVer."]}</h5> </div>
                <div> <h5>Местоположение устройства</h5> <h5>empty?</h5> </div>
                <div> <h5>Режим работы сети</h5> <h5>{device.DeviceAttr.Metrics.Mode}</h5> </div>
                <div> <h5>Интервал ТУ пакетов, сек</h5> <h5>{device.DeviceAttr.LinkRepeat}</h5> </div>
                <div> <h5>Контроль подключенности датчика</h5> <h5>empty?</h5> </div>
                <div> <h5>Запись данных в БД</h5> <CheckBox checked = {DBState.PutDBState}/> </div>
                <section className="devStatus">
                    <h5>Статус устройства</h5>
                    <textarea></textarea>
                </section>
            </section>

            <section className="devInfo">
                <h3>Состояние устройства</h3>
                <div> <h5>Состояние конфигурирования</h5> <h5>{(device.DeviceAttr.Configured) ? "Сконфигурированно" : "Не сконфигурированно"}</h5> </div>
                <div> <h5>Состояние регистрации</h5> <h5>{(device.DeviceAttr.Registered) ? "Зарегестрированно" : "Не Зарегестрированно"}</h5> </div>
                <div> <h5>Время на устройстве</h5> <h5>{device.DeviceAttr.localTime}</h5> </div>
                <div> <h5>Заряд батареи</h5> <h5>{device.DeviceAttr.Metrics.Battery}</h5> </div>
                <div> <h5>Уровень приема соты(RSII)</h5> <h5>{device.DeviceAttr.Metrics["GSM siglevel"]}</h5> </div>
                <div> <h5>Температура</h5> <h5>{device.DeviceAttr.Metrics.Temperature}</h5> </div>
            </section>            
        </>

    }/>
}