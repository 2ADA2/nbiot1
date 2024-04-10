import { Page } from "../../components/page"
import { useEffect, useState } from "react";
import "../../styles/pages/sourcePages/devInfo.css"
import { CheckBox } from "../../components/checkbox";
import { Counter } from "../../components/counter";
import { useDevice } from "../../hooks/useDevice";
import global from "../../store/global";
import {observer} from "mobx-react-lite";
import {setDBSettings} from "../../functions/requests";

export const DevInfo = observer(() => {
    const device = useDevice(global.devices)
    const [inDB, setInDB] = useState(device.inDB);
    const [DBNum, setDBNum] = useState(133000);
    const [already, setAlready] = useState()


    useEffect(() => {
        if(device.empty) global.setLocation("/sources")
    },[]);

    useEffect(() => {
        if(!inDB){
            setDBSettings(global.way + '/DB/' + device.Device.DevId, inDB, DBNum, global.token)
            setAlready(false)
            global.updateDevices()
        }
    }, [inDB])

    
    function handleClick(e) {
        e.preventDefault()
        setDBSettings(global.way + '/DB/' + device.Device.DevId, inDB, DBNum, global.token).then((res) => {
            if(res.data.Info !== "ok") {
                setAlready(true)
            } else setAlready(false)

        }).then(() => global.updateDevices()).catch(() => global.updateToken())
    }
    
    return <Page header = "Device Settings" subHeader="Настройки устройства" header2 = "Информация об устройстве" elem={
        <>
            <section className="devInfo">
                <h3>Информация</h3>
                <div>
                    <h5>Идентификационный номер</h5>
                    <h5>{device.Device.DevId}</h5>
                </div>
                <div>
                    <h5>Модель</h5>
                    <h5>{device.Device.DevName}</h5>
                </div>
                <div>
                    <h5>Версия программного обеспечения</h5>
                    <h5>{device.Device["SoftVer."]}</h5>
                </div>
                <div>
                    <h5>Версия платы</h5>
                    <h5>{device.Device["BoardRev."]}</h5>
                </div>
                <div>
                    <h5>Версия протокла</h5>
                    <h5>{device.Device["ProtoVer."]}</h5>
                </div>
                <div>
                    <h5>Местоположение устройства</h5>
                    <h5>empty?</h5>
                </div>
                <div>
                    <h5>Режим работы сети</h5>
                    <h5>{device.DeviceAttr.Metrics.Mode}</h5>
                </div>
                <div>
                    <h5>Интервал ТУ пакетов, сек</h5>
                    <h5>{device.DeviceAttr.LinkRepeat}</h5>
                </div>
                <div>
                    <h5>Контроль подключенности датчика</h5>
                    <h5>empty?</h5>
                </div>
                <div>
                    <h5>Запись данных в БД</h5>
                    <CheckBox checked = {inDB} setValue = {() => setInDB(!inDB)}/>
                </div>
                <section className="DB" style={{display: (inDB) ? "flex" : "none"}}>
                    <div>
                        <h5>Укажите номер для отображения в БД:</h5>
                        <Counter
                            count={DBNum}
                            setCount={(val) => setDBNum(((DBNum + Number(val)) > 0) ? DBNum + Number(val) : 1)}
                            newCount={(val) => setDBNum(((Number(parseInt(val))) > 0) ? Number(parseInt(val)) : 1)}
                        />
                    </div>
                    <h5 hidden={!already}>MAC already exists</h5>
                    <button onClick={(e) => handleClick(e)}>Сохранить</button>
                </section>
                <section className="devStatus">
                    <h5>Статус устройства</h5>
                    <textarea></textarea>
                </section>
            </section>

            <section className="devInfo">
                <h3>Состояние устройства</h3>
                <div>
                    <h5>Состояние конфигурирования</h5>
                    <h5>{(device.DeviceAttr.Configured) ? "Сконфигурированно" : "Не сконфигурированно"}</h5>
                </div>
                <div>
                    <h5>Состояние регистрации</h5>
                    <h5>{(device.DeviceAttr.Registered) ? "Зарегестрированно" : "Не Зарегестрированно"}</h5>
                </div>
                <div>
                    <h5>Время на устройстве</h5>
                    <h5>{device.DeviceAttr.localTime}</h5> </div>
                <div>
                    <h5>Заряд батареи</h5>
                    <h5>{device.DeviceAttr.Metrics.Battery}</h5>
                </div>
                <div>
                    <h5>Уровень приема соты(RSII)</h5>
                    <h5>{device.DeviceAttr.Metrics["GSM siglevel"]}</h5>
                </div>
                <div>
                    <h5>Температура</h5>
                    <h5>{device.DeviceAttr.Metrics.Temperature}</h5>
                </div>
            </section>
        </>

    }/>
})