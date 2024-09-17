import {Page} from "../../../components/page"
import "../../../styles/pages/sourcePages/devInfo.css"
import {useDevice} from "../../../hooks/useDevice";
import global from "../../../store/global";
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";

export const DevInfoSub = observer(() => {
    const device = useDevice(global.devices)

    return <Page
        header={<FormattedMessage id = "deviceSettings.header"/>}
        header2={<FormattedMessage id = "deviceInfo.title"/>}
        elem={
            <div>
                {JSON.stringify(device)}
            </div>

        }/>
})