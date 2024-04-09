import { useParams } from "react-router"
import global from "../store/global"
import {EMPTY} from "../utils/consts";

export const useDevice = (devs = null) => {
    const params = useParams()
    try {
        for(let device of (devs || global.devices)){
            if (device.Device.DevId === params.id) {
                return device
            }
        }

    } catch  {
        return EMPTY
    }

    return EMPTY;
}