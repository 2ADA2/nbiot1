import {useState} from 'react'
import {Page} from '../components/page'
import "../styles/pages/advancedSettings.css"
import global from '../store/global'
import {postReq} from "../functions/requests";
import {observer} from "mobx-react-lite";
import {errorAnalyze} from "../functions/error";

export const AdvancedSettings = observer(() => {
    const [settings, setSettings] = useState(global.advSettings || localStorage.getItem("advSettings"));
    const [page, setPage] = useState(0)
    const [invalidWeb, setInvalidWeb] = useState()
    const [invalidBack, setInvalidBack] = useState()

    const [back, setBack] = useState()
    const [web, setWeb] = useState()
    const [err, setErr] = useState()
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
        if (web && !invalidWeb) {
            setErr()
            postReq(global.way + "/frontend update", web, global.token).catch((err) => console.log(err))
                .then(res => {
                    if (!res) throw new Error()
                })
                .then(() => setErr())
                .catch((err) => errorAnalyze(err, (message) => setErr(message)))
        } else setInvalidWeb(true)

    }

    function updateClient() {
        if (back && !invalidBack) {
            setErr()
            postReq(global.way + "/backend update", back, global.token)
                .then(() => setErr())
                .catch((err) => errorAnalyze(err, (message) => setErr(message)))
        } else setInvalidBack(true)
    }

    function handleChange(e) {
        setSettings(e.target.value)
        global.setAdvSettings(e.target.value)
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

    function checkFile(e, name) {
        if (!e.target.files[0]) return
        const file = e.target.files[0]

        if (file.name.split(".")[1].includes(name)) {
            if(name === "zip"){
                setInvalidWeb(false)
            }else{
                setInvalidBack(false)
            }

            if (name === "zip") setWeb(file)
            else setBack(file)
            return true
        } else {
            if(name === "zip"){
                setInvalidWeb(true)
            }else{
                setInvalidBack(true)
            }
            return false
        }
    }

    return (
        <Page
            header='Расширенные настройки'
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
                                    <div>
                                        <button onClick={() => updateWeb()}>Обновить Web</button>
                                        <input className={"file"} type="file" onChange={(e) => checkFile(e, "zip")}/>
                                        {invalidWeb ?
                                            <span
                                                className='auth-error'
                                            >неверный файл(ZIP)</span>
                                            : <></>
                                        }
                                    </div>
                                    <div>
                                        <button onClick={() => updateClient()}>Обновить client</button>
                                        <input className={"file"} type="file" onChange={(e) => checkFile(e, "exe")}/>
                                        {invalidBack ?
                                            <span
                                                className='auth-error'
                                            >неверный файл(EXE)</span>
                                            : <></>
                                        }
                                    </div>
                                    {err ?
                                        <span
                                            className='auth-error'
                                            style={{
                                                display: "block",
                                                lineHeight: "50px",
                                                height: "50px",
                                                fontSize: "28px",
                                                marginTop:"40px"
                                            }}
                                        >{err}</span>
                                        : <></>
                                    }
                                </section>
                            </>
                            : <></>
                    }
                </>
            }/>
    )
})
