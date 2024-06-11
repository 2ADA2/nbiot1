import "../styles/components/UISettings.css"
import {observer} from "mobx-react-lite";
import settings from "../store/settings";

export const UISettings = observer(({setModal}) => {
    return (
        <>
            <div className="UI-settings-page-back" onClick={() => setModal()}>
            </div>
            <section className={"UI-settings-page"}>
                <h3>Настройки ПО</h3>
                <div className="label-replacer">
                    <h5>Язык приложения</h5>
                    <select value={settings.lang} onChange={(e)=> settings.setLang(e.target.value)}>
                        <option value='ru'>Русский</option>
                        <option value='en'>English</option>
                    </select>
                </div>
                {/*<div className="label-replacer" style={{marginTop: "40px"}}>*/}
                {/*    <h5>Внешний вид</h5>*/}
                {/*    <select value={"light"}>*/}
                {/*        <option value='light'>светлая</option>*/}
                {/*        <option value='dark'>тёмная</option>*/}
                {/*        <option value='universe'>universe</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className="label-replacer" style={{marginTop: "40px"}}>*/}
                {/*    <h5>Масштаб</h5>*/}
                {/*    <select value={"default"}>*/}
                {/*        <option value='ultra'>150%</option>*/}
                {/*        <option value='default'>100%</option>*/}
                {/*        <option value='mini'>50%</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <button onClick={() => setModal()}>Выход</button>
            </section>
        </>

    )
})