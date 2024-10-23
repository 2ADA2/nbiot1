import {Page} from "../../../components/page"
import "../../../styles/pages/sourcePages/devInfo.css"
import {useDevice} from "../../../hooks/useDevice";
import global from "../../../store/global";
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";
import {getErrors} from "../../../functions/statusBitMask";

export const DevInfoSub = observer(() => {
    const device = useDevice(global.devices)

    return <Page
        header={<FormattedMessage id="deviceSettings.header"/>}
        header2={<FormattedMessage id="deviceInfo.title"/>}
        elem={
            <>
                <section className="devInfo">
                    <h3>
                        <FormattedMessage id="deviceInfo.header"/>
                    </h3>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.id"/> :
                        </h5>
                        <h5>{device.Device.DevId}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.model"/> :
                        </h5>
                        <h5>{device.Device.DevName}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.softwareVersion"/> :
                        </h5>
                        <h5>{device.Device["SoftVer"]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.battery"/> :
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Battery}</h5>
                    </div>
                    <div>
                        <h5>
                            RSSI level:
                        </h5>
                        <h5>{device.DeviceAttr.Metrics["RSSI level"]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.temperature"/> :
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Temperature}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.Window"/> :
                        </h5>
                        <h5>{device.DeviceAttr.Window}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.NumChannel"/> :
                        </h5>
                        <h5>{device.DeviceAttr.NumChanel}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.networkStatus"/> :
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Online ? "Online" : "Offline"}</h5>
                    </div>
                    <section className="devStatus">
                        <h5>
                            <FormattedMessage id="deviceInfo.statusTitle"/>
                        </h5>
                        <textarea value={getErrors(device.DeviceAttr.Metrics.StatusBitMask || 0).join(`\n`)}>

                        </textarea>
                    </section>
                </section>
            </>

        }/>
})