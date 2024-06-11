import "../styles/components/UISettings.css"
import {observer} from "mobx-react-lite";
import settings from "../store/settings";
import {FormattedMessage} from "react-intl/lib";

export const UISettings = observer(({setModal}) => {
    return (
        <>
            <div className="UI-settings-page-back" onClick={() => setModal()}>
            </div>
            <section className={"UI-settings-page"}>
                <h3>
                    <FormattedMessage id = "UISettings.header"/>
                </h3>
                <div className="label-replacer">
                    <h5>
                        <FormattedMessage id = "UISettings.lang"/>
                    </h5>
                    <select value={settings.lang} onChange={(e)=> settings.setLang(e.target.value)}>
                        <option value='ru'>Русский</option>
                        <option value='en'>English</option>
                    </select>
                </div>
                <div className="label-replacer" >
                    <h5>
                        <FormattedMessage id = "UISettings.theme"/>
                    </h5>
                    <select value={settings.theme} onChange={(e)=> settings.setTheme(e.target.value)}>
                        <option value='light'>
                            <FormattedMessage id = "UISettings.theme.light"/>
                        </option>
                        <option value='dark'>
                            <FormattedMessage id = "UISettings.theme.dark"/>
                        </option>
                    </select>
                </div>
                {/*<div className="label-replacer" style={{marginTop: "40px"}}>*/}
                {/*    <h5>Масштаб</h5>*/}
                {/*    <select value={"default"}>*/}
                {/*        <option value='ultra'>150%</option>*/}
                {/*        <option value='default'>100%</option>*/}
                {/*        <option value='mini'>50%</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <button onClick={() => setModal()}>
                    <FormattedMessage id = "UISettings.button"/>
                </button>
            </section>
        </>

    )
})