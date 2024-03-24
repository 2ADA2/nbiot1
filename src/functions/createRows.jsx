import { Link } from "react-router-dom"
import Global from "../store/global"

export const CreateRows = ({devices = [], devInfo = {}}) => {
    //Пустая таблица
    if (!devices.length) return (
        <>
            <tr className="empty-row" >
                <td colspan="6">
                    No sources
                </td>
            </tr>
        </>
    )
    function changeLocation(device) {
        Global.setLocation()
        Global.setDevice(device)
    }
    //сборка рядов
    let rows = []
    for (let device of devInfo){
        rows.push(
            <tr key = {device.Device.DevId} onClick={() => changeLocation(device)}>
                    <td> 
                        <Link to = "devInfo">
                            {device.Device.DevId}
                        </Link>    
                    </td>
                    <td>
                        <Link to="devInfo">
                            {device.DeviceAttr.localTime}
                        </Link>
                        
                    </td>
                    <td>
                        <Link to="devInfo">
                            {device.DeviceAttr.Metrics["GSM siglevel"]}
                        </Link>
                        
                    </td>
                    <td>
                        <Link to="devInfo">
                            {device.DeviceAttr.Metrics.Battery}
                        </Link>
                        
                    </td>
                    <td>
                        <Link to="devInfo">
                            {device.DeviceAttr.Metrics.Temperature}
                        </Link>
                    </td>
                </tr>    
             
        )
    }

    return <>{rows}</>

}