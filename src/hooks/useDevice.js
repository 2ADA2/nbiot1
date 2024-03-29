import { useParams } from "react-router"
import global from "../store/global"

const empty = {
    "empty": true,
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
}

export const useDevice = () => {
    const params = useParams()
    try {
        for(let device of global.devices){
            if (device.Device.DevId == params.id) {
                return device
            }
        }
        
    } catch  {
        return empty
    }

    return empty;
}