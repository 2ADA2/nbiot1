import {Page} from "../components/page"
import {CreateRows} from "../functions/createRows"
import "../styles/pages/sources.css"
import {useEffect, useState} from "react"
import global from "../store/global"
import {observer} from "mobx-react-lite"

export const Sources = observer(() => {

    function updateState(e) {
        e.preventDefault()
        global.setConnection()
    }

    useEffect(() => {
        setTimeout(() => {
            global.updateDevices()
        }, 5000)
        const interval = setInterval(() => {
            global.updateDevices()
        }, 60000);
        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        //страница с источниками: таблица, установка соединения по mqtt
        <Page header="Sources" subHeader="Устройства" header2="Список устройств" elem={

            <div className="table-container">
                {/* установка соединения по mqtt */}
                <form>
                    <h3>Connection state</h3>
                    <section className="state">
                        <h5>Connection:</h5>
                        <h6>{String(global.state)}</h6>
                    </section>
                    {(typeof (global.state) === "boolean") ?
                        <button onClick={(e) => updateState(e)}>Set State</button> :
                        <button onClick={(e) => e.preventDefault()} className="activated-button">Set State</button>
                    }

                </form>

                {/* список источников, краткий обзор */}
                <h3>List of sources</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Device Id</th>
                        <th>Local Time</th>
                        <th>GSM Signal Level</th>
                        <th>Battery</th>
                        <th>Temperature</th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* генерация таблицы */}
                    <CreateRows/>
                    </tbody>
                </table>
            </div>
        }/>
    )
})