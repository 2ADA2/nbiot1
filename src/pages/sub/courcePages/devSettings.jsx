import {Page} from "../../../components/page"
import "../../../styles/pages/sourcePages/devSettings.css"
import {observer} from "mobx-react-lite";
import {FormattedMessage} from "react-intl/lib";
export const DevSettingsSub = observer(() => {

    return <Page
        header={<FormattedMessage id = "deviceSettings.header"/>}
        header2={<FormattedMessage id = "deviceSettings.subheader"/>}
        elem={
        <>sub settings</>
        }
    />
})