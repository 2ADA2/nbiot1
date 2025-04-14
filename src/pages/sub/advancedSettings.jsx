import {useEffect, useState} from 'react'
import {Page} from '../../components/page'
import "../../styles/pages/advancedSettings.css"
import global from '../../store/global'
import {postReq} from "../../functions/requests";
import {observer} from "mobx-react-lite";
import {errorAnalyze} from "../../functions/error";
import {FormattedMessage} from "react-intl/lib";

export const AdvancedSettingsSub = observer(() => {
    const [settings, setSettings] = useState(global.advSettings || localStorage.getItem("advSettings"));
    const [page, setPage] = useState(0)
    const [invalidWeb, setInvalidWeb] = useState()
    const [invalidBack, setInvalidBack] = useState()

    const [message, setMessage] = useState();
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

    const [backFileName, setBackFileName] = useState();
    const [webFileName, setWebFileName] = useState();

    useEffect(() => {
        if (page === 0) {
            setInvalidWeb(null)
            setInvalidBack(null)
        }
    }, [page]);

    function updateWeb() {
        if (web && !invalidWeb) {
            setErr()
            postReq(global.way + "/frontend update", web, global.token)
                .then(res => {
                    setMessage("Frontend updated")
                    setWeb()
                    setTimeout(() => setMessage(), 2000)
                })
                .then(() => setErr())
                .catch((err) => errorAnalyze(err, (message) => setErr(message)))
        } else setInvalidWeb(true)

    }

    function updateClient() {
        if (back && !invalidBack) {
            setErr()
            postReq(global.way + "/backend update", back, global.token)
                .then(res => {
                    setMessage("Backend updated")
                    setBack()
                    setTimeout(() => setMessage(), 2000)
                })
                .then(() => setErr())
                .catch((err) => errorAnalyze(err, (message) => setErr(message)))
        } else setInvalidBack(true)
    }

    function handleChange(e) {
        setSettings(e.target.value)
        global.setAdvSettings(e.target.value)
    }

    function sendSettings() {
        postReq(global.subWay + "/Advanced settings", settings, global.token)
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

        if (file.name.split(".").at(-1).includes(name)) {
            if (name === "zip") {
                setInvalidWeb(false)
            } else {
                setInvalidBack(false)
            }

            if (name === "zip") {
                setWeb(file)
                setWebFileName(file.name)
                console.log(file.name)
            } else {
                setBack(file)
                setBackFileName(file.name)
            }
            return true
        } else {
            if (name === "zip") {
                setInvalidWeb(true)
            }
            return false
        }
    }

    function cancel() {
        global.updateSettings()
        setSettings(global.advSettings)
    }

    return (
        <Page
            header={<FormattedMessage id="advSettings.header"/>}
            header2={<FormattedMessage id="advSettings.header2"/>}
            elem={
                <>
                    {
                        (message) ? <div className={"modal"}>
                            {message + " <"}
                        </div> : <></>
                    }

                    <nav className="panel-header">
                        <button onClick={() => setPage(0)} className={(page === 0) ? "panel-active" : ""}>
                            <FormattedMessage id="advSettings.panel.main"/>
                        </button>
                        <button onClick={() => setPage(1)} className={(page === 1) ? "panel-active" : ""}>
                            <FormattedMessage id="advSettings.panel.update"/>
                        </button>
                    </nav>
                    {(page === 0) ?
                        <>
                            <h3 className="advanced-settings-header">
                                <FormattedMessage id="advSettings.main.header"/>
                            </h3>
                            <section className='advanced-settings'>
                                <textarea value={settings} onChange={(e) => handleChange(e)}/>
                                <button onClick={() => sendSettings()} className={"adv-button"}>
                                    <FormattedMessage id="advSettings.main.save"/>
                                </button>
                                <button onClick={() => toDefault()} className={"adv-button"}>
                                    <FormattedMessage id="advSettings.main.sample"/>
                                </button>
                                <button onClick={() => cancel()} className={"adv-button"}>
                                    <FormattedMessage id="advSettings.main.cancel"/>
                                </button>
                            </section>
                        </>
                        :
                        (page === 1) ?
                            <>
                                <h3 className="advanced-settings-header">
                                    <FormattedMessage id="advSettings.update.header"/>
                                </h3>
                                <section className='advanced-settings'>
                                    <div>
                                        <button onClick={() => updateWeb()}>
                                            <FormattedMessage id="advSettings.update.web"/>
                                        </button>
                                        <label className={"file-container"}>
                                            {webFileName || <FormattedMessage id={"advSettings.put"}/>}
                                            <input className={"file"} type="file"
                                                   onChange={(e) => checkFile(e, "zip")}/>
                                        </label>
                                        {invalidWeb ?
                                            <div
                                                className='auth-error'
                                            >
                                                <FormattedMessage id="advSettings.updateErr"/>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                    <div>
                                        <button onClick={() => updateClient()}>
                                            <FormattedMessage id="advSettings.update.client"/>
                                        </button>
                                        <label className={"file-container"}>
                                            {backFileName || <FormattedMessage id={"advSettings.put"}/>}
                                            <input className={"file"} type="file" onChange={(e) => checkFile(e, "")}/>
                                        </label>
                                        {invalidBack ?
                                            <div
                                                className='auth-error'
                                            >
                                                <FormattedMessage id="advSettings.updateErr2"/>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                    {err ?
                                        <h5
                                            className='auth-error'
                                            style={{
                                                display: "block",
                                                lineHeight: "50px",
                                                height: "50px",
                                                fontSize: "28px",
                                                marginTop: "40px"
                                            }}
                                        >{err}</h5>
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
