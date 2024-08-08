import {Page} from "../../components/page"
import {CreateRows} from "../../functions/createRows"
import "../../styles/pages/sources.css"
import global from "../../store/global"
import {observer} from "mobx-react-lite"
import {useState} from "react"
import {CheckBox} from "../../components/checkbox"
import CreateListRows from "../../functions/createListRows"
import {FormattedMessage} from "react-intl/lib";

export const DevList = observer(() => {
    const [info, setInfo] = useState(localStorage.getItem("moreSourceInfo"))

    function updateState(e) {
        e.preventDefault()
        global.setConnection()
    }

    return (
        //страница с источниками: таблица, установка соединения по mqtt
        <Page header={<FormattedMessage id={"devs.header"}/>} header2={<FormattedMessage id={"devs.header2"}/>} elem={

            <div className="table-container">
                {/* установка соединения по mqtt */}

                {/* список источников, краткий обзор */}
                <h3><FormattedMessage id={"devs.section2"}/></h3>

                <div style={{flexDirection: "row", gap: "20px", marginBottom: 20, alignItems: "center"}}>
                    <FormattedMessage id={"devs.more"}/>
                    <CheckBox checked={info} setValue={() => {
                        localStorage.setItem("moreSourceInfo", info ? "" : true)
                        setInfo(!info)
                    }}/>
                    <FormattedMessage id={"devs.list"}/>
                </div>

                <table style={{display: info ? "none" : "table"}}>
                    <thead>
                    <tr>
                        <th><FormattedMessage id={"devs.id"}/></th>
                        <th><FormattedMessage id={"devs.time"}/></th>
                        <th><FormattedMessage id={"devs.signal"}/></th>
                        <th><FormattedMessage id={"devs.battery"}/></th>
                        <th><FormattedMessage id={"devs.temperature"}/></th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* генерация таблицы */}
                    <CreateRows/>
                    </tbody>
                </table>
                <table style={{display: info ? "table" : "none"}}>
                    <thead>
                    <tr>
                        <th><FormattedMessage id={"devs.id"}/></th>
                        <th><FormattedMessage id={"devs.id"}/></th>
                        <th><FormattedMessage id={"devs.id"}/></th>
                        <th><FormattedMessage id={"devs.id"}/></th>
                    </tr>
                    </thead>

                    <tbody>
                    {/* генерация таблицы */}
                    <CreateListRows/>
                    </tbody>
                </table>
            </div>
        }/>
    )
})