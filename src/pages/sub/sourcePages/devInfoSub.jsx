import {Page} from "../../../components/page"
import "../../../styles/pages/sourcePages/devInfo.css"
import {useDevice} from "../../../hooks/useDevice";
import global from "../../../store/global";
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";

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
                            <FormattedMessage id="deviceInfo.id"/>
                        </h5>
                        <h5>{device.Device.DevId}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.model"/>
                        </h5>
                        <h5>{device.Device.DevName}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.softwareVersion"/>
                        </h5>
                        <h5>{device.Device["SoftVer."]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.hardwareVersion"/>
                        </h5>
                        <h5>{device.Device["BoardRev."]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.protocolVersion"/>
                        </h5>
                        <h5>{device.Device["ProtoVer."]}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.networkMode"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Mode}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.packetInterval"/>
                        </h5>
                        <h5>{device.DeviceAttr.LinkRepeat}</h5>
                    </div>
                    <div>
                        <h5>
                            <FormattedMessage id="deviceInfo.networkStatus"/>
                        </h5>
                        <h5>{device.DeviceAttr.Metrics.Online ? "Online" : "Offline"}</h5>
                    </div>
                </section>
            </>

        }/>
})