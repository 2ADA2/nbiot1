import {Page} from "../../../components/page"
import {useEffect, useState} from "react";
import "../../../styles/pages/sourcePages/devInfo.css"
import {useDevice} from "../../../hooks/useDevice";
import global from "../../../store/global";
import {observer} from "mobx-react-lite";
import {setDBSettings} from "../../../functions/requests";
import {FormattedMessage} from "react-intl/lib";

export const DevInfoSub = observer(() => {
    const device = useDevice(global.devices)
    const [inDB, setInDB] = useState(device.inDB);
    const [DBNum, setDBNum] = useState(Number(localStorage.getItem(device.Device.DevId + "DBNum")) || 133000);
    const [already, setAlready] = useState();
    const [clearAll, setClearAll] = useState("state:" + device.DeviceAttr.State)


    // useEffect(() => {
    //     if (device.empty) {
    //         global.setBle("/sources")
    //     }
    // }, []);

    useEffect(() => {
        if (!inDB) {
            setDBSettings(global.way + '/DB/' + device.Device.DevId, inDB, DBNum, global.token)
            setAlready(false)
            global.updateDevicesSub()
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

        }).then(() => global.updateDevicesSub()).catch(() => global.updateToken())
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