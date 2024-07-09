import {Page} from "../../../components/page"
import {useEffect, useState} from "react";
import "../../../styles/pages/sourcePages/devInfo.css"
import {CheckBox} from "../../../components/checkbox";
import {Counter} from "../../../components/counter";
import {useDevice} from "../../../hooks/useDevice";
import global from "../../../store/global";
import {observer} from "mobx-react-lite";
import {setDBSettings} from "../../../functions/requests";
import {getErrors} from "../../../functions/statusBitMask";
import {getDeviceState} from "../../../functions/deviceState";
import {FormattedMessage} from "react-intl/lib";

export const DevInfoSub = observer(() => {
    const device = useDevice(global.devices)
    const [inDB, setInDB] = useState(device.inDB);
    const [DBNum, setDBNum] = useState(Number(localStorage.getItem(device.Device.DevId + "DBNum")) || 133000);
    const [already, setAlready] = useState();
    const [devState, setDevState] = useState("state:" + device.DeviceAttr.State)


    useEffect(() => {
        if (device.empty) {
            global.setLocation("/sources")
        }
    }, []);

    useEffect(() => {
        if (!inDB) {
            setDBSettings(global.way + '/DB/' + device.Device.DevId, inDB, DBNum, global.token)
            setAlready(false)
            global.updateDevices()
        }
    }, [inDB])

    useEffect(() => {
        localStorage.setItem(device.Device.DevId + "DBNum", DBNum)
    }, [DBNum])


    function handleClick(e) {
        e.preventDefault()
        setDBSettings(global.way + '/DB/' + device.Device.DevId, inDB, DBNum, global.token).then((res) => {
            if (res.data.Info !== "ok") {
                setAlready(true)
            } else setAlready(false)

        }).then(() => global.updateDevices()).catch(() => global.updateToken())
    }

    return <Page
        header={<FormattedMessage id = "deviceSettings.header"/>}
        header2={<FormattedMessage id = "deviceInfo.title"/>}
        elem={
            <>
                sub devInfo
            </>

        }/>
})