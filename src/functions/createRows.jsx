import { Link, useNavigate } from "react-router-dom"
import { DEVINFO_ROUTE } from "../utils/consts"
import global from "../store/global"
import { observer } from "mobx-react-lite"



export const CreateRows = observer(() => {
    const navigate = useNavigate()
    //Пустая таблица
    if (!global.deviceList.length || !global.devices.length) return (
        <>
            <tr className="empty-row" >
                <td colSpan="6">
                    No sources
                </td>
            </tr>
        </>
    )
    function changeLocation(device) {
        navigate(DEVINFO_ROUTE + "/" + device.Device.DevId)
        global.setLocation()
    }
    //сборка рядов
    let rows = []
    for (let device of global.devices){
        rows.push(
            <tr
                key = {device.Device.DevId}
                onClick={() => changeLocation(device)}
                className={(device.DeviceAttr.Metrics.Online) ? "online" : "offline"}
            >
                <td> 
                    {device.Device.DevId || "no data"}
                </td>
                <td>
                    {device.DeviceAttr.localTime || "no data"}
                </td>
                <td>
                    {device.DeviceAttr.Metrics["GSM siglevel"] || "no data"}
                </td>
                <td>
                    {device.DeviceAttr.Metrics.Battery || "no data"}
                </td>
                <td>
                    {device.DeviceAttr.Metrics.Temperature || "no data"}
                </td>
            </tr>    
             
        )
    }

    return <>{rows}</>

})