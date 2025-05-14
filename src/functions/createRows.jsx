import { useNavigate } from "react-router-dom"
import { DEVINFO_ROUTE } from "../utils/consts"
import global from "../store/global"
import { observer } from "mobx-react-lite"



export const CreateRows = observer(({isSub = false}) => {
    const navigate = useNavigate()

    //Пустая таблица
    try{
        if (!global.deviceList.length || !global.devices.length) {
            return (
                <>
                    <tr className="empty-row">
                        <td colSpan="6" style={{color: "#383838"}}>
                            -
                        </td>
                    </tr>
                </>
            )
        }
    } catch{
        return (
            <>
                <tr className="empty-row" >
                    <td colSpan="6" style={{color:"#383838"}}>
                        -
                    </td>
                </tr>
            </>
        )
    }

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
                    {device.Device.DevId || "-"}
                </td>
                {
                    (!isSub)?
                    <td>
                        {device.DeviceAttr.localTime || "-"}
                    </td>:<></>
                }
                {
                    (!isSub) ?
                    <td>
                        {device.DeviceAttr.Metrics["GSM siglevel"] || "-"}
                    </td>
                        :
                    <td>
                        {device.DeviceAttr.Metrics["RSSI level"] || "-"}
                    </td>
                }

                <td>
                    {device.DeviceAttr.Metrics.Battery || "-"}
                </td>
                <td>
                    {device.DeviceAttr.Metrics.Temperature || "-"}
                </td>
            </tr>    
             
        )
    }

    return rows

})