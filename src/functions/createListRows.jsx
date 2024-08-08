import {useNavigate} from "react-router-dom"
import {DEVINFO_ROUTE} from "../utils/consts"
import global from "../store/global"

export default function CreateListRows() {
    const navigate = useNavigate()

    if (!global.deviceList || !global.deviceList.length || !global.devices.length) return (
        <tr className="empty-row">
            <td colSpan="6">
                No sources
            </td>
        </tr>
    )


    function changeLocation(device) {
        navigate(DEVINFO_ROUTE + "/" + device.Device.DevId)
        global.setLocation()
    }

    //сборка рядов
    let tds = []
    for (let device of global.devices) {
        tds.push(
            <td
                key={device.Device.DevId}
                onClick={() => changeLocation(device)}
                className={(device.DeviceAttr.Metrics.Online) ? "online" : "offline"}>
                {device.Device.DevId || "no data"}
            </td>
        )
    }

    let rows = []
    for (let i = 0; i < tds.length; i += 4) {
        rows.push(<>
            <tr>
                {tds[i] || <td style={{cursor: "default"}}>no source</td>}
                {tds[i + 1] || <td style={{cursor: "default"}}>no source</td>}
                {tds[i + 2] || <td style={{cursor: "default"}}>no source</td>}
                {tds[i + 3] || <td style={{cursor: "default"}}>no source</td>}
            </tr>
        </>)
    }

    return <>{rows}</>
}
