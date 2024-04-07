import { useState } from 'react'
import { Page } from '../components/page'
import "../styles/pages/advancedSettings.css"
import global from '../store/global'

export default function AdvancedSettings() {
  const [settings, setSettings] = useState(localStorage.getItem("advSettings"));
  const deflt = global.advSettings

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
