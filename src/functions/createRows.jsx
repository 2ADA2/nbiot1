import { Link, useNavigate } from "react-router-dom"
import Global from "../store/global"
import { DEVINFO_ROUTE } from "../utils/consts"

export const CreateRows = ({devices = [], devInfo = []}) => {
    const navigate = useNavigate()
    //Пустая таблица
    if (!devices.length || !devInfo.length) return (
        <>
            <tr className="empty-row" >
                <td colspan="6">
                    No sources
                </td>
            </tr>
        </>
    )
    function changeLocation(device) {
        navigate(DEVINFO_ROUTE + "/" + device.Device.DevId)
        Global.setLocation()
    }
    //сборка рядов
    let rows = []
    for (let device of devInfo){
        rows.push(
            <tr key = {device.Device.DevId} onClick={() => changeLocation(device)}>
                    <td> 
                        {device.Device.DevId}
                    </td>
                    <td>
                        {device.DeviceAttr.localTime}
                    </td>
                    <td>
                        {device.DeviceAttr.Metrics["GSM siglevel"]}
                    </td>
                    <td>
                        {device.DeviceAttr.Metrics.Battery}
                    </td>
                    <td>
                        {device.DeviceAttr.Metrics.Temperature}
                    </td>
                </tr>    
             
        )
    }

    return <>{rows}</>

}