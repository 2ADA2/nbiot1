import React from 'react'
import { Page } from '../components/page'
import "../styles/pages/advancedSettings.css"

export default function advancedSettings() {
  return (
      <Page 
        header='Advanced settings' 
        subHeader='Расширенные настройки' 
        header2='Редактирование settings.ini'
        elem = {
          <>
            <h3>Изменение настроек</h3>
            <section className='advanced-settings'>
              <textarea/>
            </section>
            <button>Сохранить</button>
          </>
        }
        />
  )
}
