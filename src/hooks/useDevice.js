import { useParams } from "react-router"
import global from "../store/global"

export const useDevice = () => {
    const params = useParams()
    
    for(let device of global.devices.List){
        console.log(params)
        console.log(device.Device.DevId)
        if (device.Device.DevId == params.id) {
            console.log(device)
            return device
        }
    }

    return ({
            "empty" : true,
            "Device": {
                "DevId": "no data",
                "DevName": "no data",
                "SoftVer.": "no data",
                "BoardRev.": "no data",
                "ProtoVer.": "no data"
            },
            "DeviceAttr": {
                "localTime": "no data",
                "LinkRepeat": "no data",
                "Configured": "no data",
                "State": "no data",
                "Registered": "no data",
                "Metrics": {
                    "Battery": "no data",
                    "Mode": "no data",
                    "GSM siglevel": "no data",
                    "Temperature": "no data",
                    "StatusBitMask": "no data"
                }
            }
        });
}