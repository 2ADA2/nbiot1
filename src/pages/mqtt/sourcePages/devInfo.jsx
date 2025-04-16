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

export const DevInfo = observer(() => {
    const device = useDevice(global.devices)
    const [inDB, setInDB] = useState(device.inDB);
    const [DBNum, setDBNum] = useState(Number(localStorage.getItem(device.Device.DevId + "DBNum")) || 133000);
    const [already, setAlready] = useState();
    const [clearAll, setClearAll] = useState("state:" + device.DeviceAttr.State)


    useEffect(() => {
        if (device.empty) {
            global.setLocation("/sources")
        }
        return
    }, []);

    useEffect(() => {
        if(!device.empty) localStorage.setItem(device.Device.DevId + "DBNum", DBNum)
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
                <section className="devInfo">
                    <h3>
                        <FormattedMessage id = "deviceInfo.header"/>
                    </h3>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.id"/>
                        </h5>
                        <h5>{device.Device.DevId}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.model"/>
                        </h5>
                        <h5>{device.Device.DevName}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.softwareVersion"/>
                        </h5>
                        <h5>{device.Device["SoftVer."]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.hardwareVersion"/>
                        </h5>
                        <h5>{device.Device["BoardRev."]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.protocolVersion"/>
                        </h5>
                        <h5>{device.Device["ProtoVer."]}</h5>
                    </div>
                    {/*<div>*/}
                    {/*    <h5>Местоположение устройства</h5>*/}
                    {/*    <h5>empty?</h5>*/}
                    {/*</div>*/}
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.networkMode"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Mode}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.packetInterval"/>
                        </h5>
                        <h5>{device.DeviceAttr.LinkRepeat}</h5>
                    </div>
                    {/*<div>*/}
                    {/*    <h5>Контроль подключенности датчика</h5>*/}
                    {/*    <h5>empty?</h5>*/}
                    {/*</div>*/}
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.networkStatus"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Online ? "Online" : "Offline"}</h5>
                    </div>

                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.databaseRecording"/>
                        </h5>
                        <CheckBox checked={inDB} setValue={() => setInDB(!inDB)}/>
                    </div>
                    <section className="DB" style={{display: (inDB) ? "flex" : "none"}}>
                        <div>
                            <h5>
                                <FormattedMessage id = "deviceInfo.enterNumber"/>
                            </h5>
                            <Counter
                                count={DBNum}
                                setCount={(val) => setDBNum(((DBNum + Number(val)) > 0) ? DBNum + Number(val) : 1)}
                                newCount={(val) => setDBNum(((Number(parseInt(val))) > 0) ? Number(parseInt(val)) : 1)}
                            />
                        </div>
                        <h5 hidden={!already} className="meas-started">MAC already exists</h5>
                        <button onClick={(e) => handleClick(e)}>
                            <FormattedMessage id = "deviceInfo.saveButton"/>
                        </button>
                    </section>
                    <section className="devStatus">
                        <h5>
                            <FormattedMessage id = "deviceInfo.statusTitle"/>
                        </h5>
                        <textarea
                            value={clearAll + getDeviceState(clearAll)
                                + `\n\n` + getErrors(device.DeviceAttr.Metrics.StatusBitMask || 0).join(`\n`)}
                        ></textarea>
                    </section>
                </section>

                <section className="devInfo">
                    <h3>
                        <FormattedMessage id = "deviceInfo.header2"/>
                    </h3>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.configurationStatus"/>
                        </h5>
                        <h5>{(device.DeviceAttr.Configured) ?
                            <FormattedMessage id = "deviceInfo.configurationStatus1"/> :
                            <FormattedMessage id = "deviceInfo.configurationStatus2"/>}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.registrationStatus"/>
                        </h5>
                        <h5>{(device.DeviceAttr.Registered) ?
                            <FormattedMessage id = "deviceInfo.registrationStatus1"/>:
                            <FormattedMessage id = "deviceInfo.registrationStatus2"/>}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.deviceTime"/>
                        </h5>
                        <h5>{device.DeviceAttr.localTime}</h5></div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.batteryLevel"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Battery}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.signalLevel"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics["GSM siglevel"]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id = "deviceInfo.temperature"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Temperature}</h5>
                    </div>
                </section>
            </>

        }/>
})