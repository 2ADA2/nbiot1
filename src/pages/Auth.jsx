import React, {useState} from 'react'
import global from '../store/global'
import "../styles/pages/auth.css"
import {observer} from 'mobx-react-lite'

export const Auth = observer(() => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState()

    async function auth(e) {
        e.preventDefault()
        if (!name || !password) {
            setErr(false)
            setTimeout(() => setErr(true), 10)
            return
        }
        global.authorizate({name, password})
            .then(isAuth => {
                if (!isAuth) {
                    setErr(false)
                    setTimeout(() => setErr(true), 10)
                }
            })

    }

    return (<>
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
                        {(err) ? <span className='auth-error'>Неверно введён логин или пароль</span> : <span/>}
                        <button onClick={(e) => auth(e)}>Войти</button>
                    </div>

                </form>
            </main>
        </>

    )
})