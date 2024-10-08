import {Page} from "../../components/page"
import {CreateRows} from "../../functions/createRows"
import "../../styles/pages/sources.css"
import global from "../../store/global"
import {observer} from "mobx-react-lite"
import {useState} from "react"
import {CheckBox} from "../../components/checkbox"
import CreateListRows from "../../functions/createListRows"
import {FormattedMessage} from "react-intl/lib";

export const Sources = observer(() => {

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
                <form>
                    <h3><FormattedMessage id={"devs.section1"}/></h3>
                    <section className="state">
                        <h5><FormattedMessage id={"devs.connect"}/></h5>
                        <h6>{
                            (global.state === 3) ?
                                <FormattedMessage id={"devs.connect.status3"}/> :
                                (global.state === 4) ? <FormattedMessage id={"devs.connect.status4"}/> :
                                    (global.state) ? <FormattedMessage id={"devs.connect.status1"}/>
                                        : <FormattedMessage id={"devs.connect.status2"}/>
                        }
                        </h6>
                    </section>
                    {(typeof (global.state) === "boolean") ?
                        <button onClick={(e) => updateState(e)}>
                            {global.state ? <FormattedMessage id={"devs.button.status1"}/> :
                                <FormattedMessage id={"devs.button.status2"}/>}
                        </button> :
                        <button onClick={(e) => e.preventDefault()} className="activated-button">
                            {<FormattedMessage id={"devs.button.status3"}/>}
                        </button>
                    }

                </form>

                {/* список источников, краткий обзор */}
                <h3><FormattedMessage id={"devs.section2"}/></h3>

                <div style={{display:"flex",flexDirection: "row", gap: "20px", marginBottom: 20, alignItems: "center"}}>
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