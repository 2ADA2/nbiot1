import { Page } from "../../components/page"
import { checkDevice } from "../../functions/checkDevice";
import global from "../../store/global";
import { useEffect } from "react"

export const DevSettings = () => {
    useEffect(() => {
        checkDevice(global.device, "/sources" )
    },[]);
    if(!Object.keys(global.device).length){
        return <></>
    }
    return <Page header1 = "Device Settings" subHeader="Настройки устройства" header2 = "Настройки устройства"/>
}