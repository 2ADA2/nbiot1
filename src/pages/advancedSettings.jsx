import { useState } from 'react'
import { Page } from '../components/page'
import "../styles/pages/advancedSettings.css"
import global from '../store/global'

const deflt = `HostBroker=93.84.87.22
PortBroker=1883
GuardInterval=3
AllPackages=1
RawDataSave=1
PSflag=true
MqttPassword=1\\x10\\x17\\x12\\b\a\\x1fP
MqttUserName=admin

AddRawDataUrl=http://192.168.0.201:5101/api/v2.1/rawdata/addv2
LastParamInfoUrl="http://192.168.0.201:5101/api/v2.1/RawData/latest-param-info?source="
LoginUrl=http://192.168.0.201:9109/api/v2.1/user/login
Password=gateway
RefreshTokenUrl=http://192.168.0.201:9109/api/v2.1/user/refresh-token
UserInfoUrl=http://192.168.0.201:9109/api/v2.1/User/user-info
UserName=gateway-3-11

MAC04_09_19_86_11_50=5896`

export default function AdvancedSettings() {
  const [settings, setSettings] = useState(localStorage.getItem("advSettings") || global.advSettings);

  function handleChange(e){
    setSettings(e.target.value)
    localStorage.setItem("advSettings", e.target.value)
  }

  function sendSettings() {
    console.log("send:\n" + settings)
  }

  function toDefault() {
    let conf = window.confirm("вы уверены что хотите сбросить?")
    if(conf){
      setSettings(deflt)
      localStorage.setItem("advSettings", deflt)
    }
  }

  return (
      <Page 
        header='Advanced settings' 
        subHeader='Расширенные настройки' 
        header2='Редактирование settings.ini'
        elem = {
          <>
            <h3>Изменение настроек</h3>
            <section className='advanced-settings'>
              <textarea value={settings} onChange={(e) => handleChange(e)}/>
            </section>
            <button onClick={() => sendSettings()}>Сохранить</button>
            <button onClick={() => toDefault()}>Сбросить</button>
          </>
        }
        />
  )
}
