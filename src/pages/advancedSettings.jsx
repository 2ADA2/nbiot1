import {useState} from 'react'
import {Page} from '../components/page'
import "../styles/pages/advancedSettings.css"
import global from '../store/global'
import {postReq} from "../functions/requests";
import {observer} from "mobx-react-lite";

export const AdvancedSettings = observer(() => {
    const [settings, setSettings] = useState(localStorage.getItem("advSettings"));
    const [page, setPage] = useState(0)
    const deflt = `[AppSettings]
HostBroker=93.84.87.22
PortBroker=1883
GuardInterval=3
AllPackages=1
RawDataSave=1
PSflag=true
MqttPassword=1\\x10\\x17\\x12\\\\b\\\\a\\x1fP
MqttUserName=admin

[RemoteServices]
AddRawDataUrl=http://192.168.0.201:5101/api/v2.1/rawdata/addv2
LastParamInfoUrl="http://192.168.0.201:5101/api/v2.1/RawData/latest-param-info?source="
LoginUrl=http://192.168.0.201:9109/api/v2.1/user/login
Password=gateway
RefreshTokenUrl=http://192.168.0.201:9109/api/v2.1/user/refresh-token
UserInfoUrl=http://192.168.0.201:9109/api/v2.1/User/user-info
UserName=gateway-3-11

[TransferSource]
MAC04_09_19_86_11_50=5896`

    function updateWeb() {
        postReq(global.way + "/frontend update", "", global.token)
    }

    function updateClient() {
        postReq(global.way + "/backend update", "", global.token)
    }

    function handleChange(e) {
        setSettings(e.target.value)
        localStorage.setItem("advSettings", e.target.value)
    }

    function sendSettings() {
        postReq(global.way + "/Advanced settings", settings, global.token)
    }

    function toDefault() {
        let conf = window.confirm("вставить шаблон?")
        if (conf) {
            if (settings) {
                setSettings(settings + `\n\n` + deflt)
            } else {
                setSettings(settings + deflt)
                localStorage.setItem("advSettings", deflt)
            }
        }
    }

    return (
        <Page
            header='Advanced settings'
            subHeader='Расширенные настройки'
            header2='Настройки администратора'
            elem={
                <>
                    <nav className="panel-header">
                        <button onClick={() => setPage(0)} className={(page === 0) ? "panel-active" : ""}>Главная
                        </button>
                        <button onClick={() => setPage(1)} className={(page === 1) ? "panel-active" : ""}>Обновление
                            ПО
                        </button>
                    </nav>
                    {(page === 0) ?
                        <>
                            <h3 className="advanced-settings-header">Изменение настроек</h3>
                            <section className='advanced-settings'>
                                <textarea value={settings} onChange={(e) => handleChange(e)}/>
                            </section>
                            <button onClick={() => sendSettings()}>Сохранить</button>
                            <button onClick={() => toDefault()}>+ Шаблон</button>
                        </>
                        :
                        (page === 1) ?
                            <>
                                <h3 className="advanced-settings-header">Обновить</h3>
                                <section className='advanced-settings'>
                                    <button onClick={() => updateWeb()}>Обновить Web</button>
                                    <button onClick={() => updateClient()}>Обновить client</button>
                                </section>
                            </>
                            : <></>
                    }
                </>
            }/>
    )
})
