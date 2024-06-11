import React, {useState} from 'react'
import global from '../store/global'
import "../styles/pages/auth.css"
import {observer} from 'mobx-react-lite'
import {FormattedMessage} from "react-intl/lib";
import {IntlProvider} from "react-intl";
import RU from "../localization/ru.json";
import EN from "../localization/en.json";
import settings from "../store/settings";

const messages = {
    "ru": RU,
    "en": EN
}

export const Auth = observer(() => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState()
    const [started, setStarted] = useState()

    async function auth(e) {
        e.preventDefault()
        if (!name || !password) {
            setErr(false)
            setTimeout(() => setErr(true), 10)
            return
        }
        setStarted(true)
        global.authorizate({name, password})
            .then(isAuth => {
                if (!isAuth) {
                    setErr(false)
                    setTimeout(() => setErr(true), 10)
                }
            })
    }

    return (<IntlProvider locale={navigator.language} messages={messages[settings.lang]}>
            <header>
                <h1>NB-IoT collector</h1>
            </header>
            <main className='page container auth-page'>
                <form className='auth'>
                    <h1>Авторизация</h1>
                    <input
                        type='name'
                        placeholder='введите логин'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        {(err) ? <span className='auth-error'>
                            <FormattedMessage id={"incorrect"}/>
                        </span> : <span/>}
                        {(started)?
                            <button onClick={(e) => e.preventDefault()} className="activated-button">Вход</button> :
                            <button onClick={(e) => auth(e)}>
                                <FormattedMessage id={"enterButton"}/>
                            </button>
                        }

                    </div>

                </form>
            </main>
        </IntlProvider>

    )
})