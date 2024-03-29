import { Page } from "../components/page"
import { CreateRows } from "../functions/createRows"
import "../styles/pages/sources.css"
import { useEffect, useState } from "react"
import global from "../store/global"
import { observer } from "mobx-react-lite"

export const Sources = observer(() => {

    useEffect(() => {
        const interval = setInterval(() => {
            global.updateDevList()
        }, 5000);
        return () => {
            clearInterval(interval)
        };
    },[]);

    return (
        //страница с источниками: таблица, установка соединения по mqtt
        <Page header="Sources" subHeader="Устройства" header2="Список устройств" elem ={

                <div className="table-container">
                    {/* установка соединения по mqtt */}
                    <form>
                        <h3>Connection state</h3>
                        <section className="state">
                            <h5>Connection:</h5>
                            <h6>True</h6>
                        </section>
                        <button>Set State</button>
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
                        <CreateRows devices={global.deviceList} devInfo={global.devices}/>
                        </tbody>
                    </table>
                </div>
        }/>
    )
})