import {useState} from "react";
import {FormattedMessage} from "react-intl/lib";

export const CreateList = ({mass, type, states}) => {
    const [modal, setModal] = useState("");


    return (<>
        {mass.map((e, i) => {
            const comments = e.MeasComment
            const state = states[i]
            const isOk = state.toLowerCase() === "ok"
            const Tstart = e.MeasSchedule.Tstart.split("")
            const date = Tstart.slice(0, Tstart.indexOf("T"))
            const time = Tstart.slice(Tstart.indexOf("T") + 1, e.length)
            const isImit = e.MeasSchedule.MeasType === "Imit"

            return (<>
                {(modal === e.MeasSchedule.Tstart) && <>
                    <div className="UI-settings-page-back" onClick={() => {
                        if(!e.isPlanning) setModal()
                    }}/>
                    <section className={"UI-settings-page meas-modal"}>
                        {(isImit) ? <>
                            <div className="modal-row">
                                <h3 style={{gridColumn:"1/3"}}>{e.MeasComment.Artist || "Без автора"}:{e.MeasComment.Titel || "Без названия"}</h3>
                                <span style={{gridColumn:"1/3"}}>{e.MeasComment.Comment}</span>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время измерения </h5>
                                <h5> {e.MeasSchedule.Tmeas} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Повторять каждые </h5>
                                <h5> {e.MeasSchedule.Trepeat} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время исполнения </h5>
                                <h5> {e.MeasSchedule.Tstart} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Тип </h5>
                                <h5> {e.MeasSchedule.MeasType} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> FIRmode </h5>
                                <h5> {e.MeasSchedule.FIRmode} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Амплитуда шума (КЕ) </h5>
                                <h5> {e.MeasSchedule.Nois} </h5>
                                <table style={{cursor: "default", marginTop: 20}}>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <FormattedMessage id="imitatorSettings.amplitude"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="imitatorSettings.frequency"/>
                                        </th>
                                        <th>
                                            <FormattedMessage id="imitatorSettings.phase"/>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <FormattedMessage id="imitatorSettings.signalA"/>
                                        </td>
                                        <td>{e.MeasSchedule.Sig1[0]}</td>
                                        <td>{e.MeasSchedule.Sig1[1]}</td>
                                        <td>{e.MeasSchedule.Sig1[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FormattedMessage id="imitatorSettings.signalB"/>
                                        </td>
                                        <td>{e.MeasSchedule.Sig2[0]}</td>
                                        <td>{e.MeasSchedule.Sig2[1]}</td>
                                        <td>{e.MeasSchedule.Sig2[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <FormattedMessage id="imitatorSettings.signalC"/>
                                        </td>
                                        <td>{e.MeasSchedule.Sig3[0]}</td>
                                        <td>{e.MeasSchedule.Sig3[1]}</td>
                                        <td>{e.MeasSchedule.Sig3[2]}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </> : <>
                            <h3>{e.MeasComment.Artist || "Без автора"}:{e.MeasComment.Titel || "Без названия"}</h3>
                            <span>{e.MeasComment.Comment}</span>
                            <div className="modal-row">
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время измерения </h5>
                                <h5> {e.MeasSchedule.Tmeas} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Повторять каждые </h5>
                                <h5> {e.MeasSchedule.Trepeat} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время исполнения </h5>
                                <h5> {e.MeasSchedule.Tstart} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Тип </h5>
                                <h5> {e.MeasSchedule.MeasType} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> FIRmode </h5>
                                <h5> {e.MeasSchedule.FIRmode} </h5>
                            </div>
                        </>
                        }

                        <button onClick={() => setModal()}>
                            <FormattedMessage id="UISettings.button"/>
                        </button>
                    </section>
                </>}
                <div key={i} className={"measurements-list-item " + (isImit && "imit")}
                     onClick={() => {
                         if(!e.isPlanning) setModal(e.MeasSchedule.Tstart)
                     }}>
                    <div className={"item-time"}>
                        <span>
                            <span style={{marginRight: 4}}>
                                {time}
                            </span>
                            <span style={{gridColumn: "1", lineHeight: "26px"}} className={"secondary"}>
                                {date}</span>
                        </span>

                        <span style={{gridColumn: "1"}} className={"secondary"}>
                            {
                                (!isOk) ? "Ошибка: " + state :
                                    e.isPlanning ? "принято планировщиком":
                                        (type === "target") ? "Принято устройством" :
                                            "выполнено устройством"
                            }
                        </span>
                    </div>

                    <div>
                        <span style={{gridColumn: "2/4"}}>
                            {comments.Artist || "Без автора"}: {comments.Titel || "Без названия"}
                        </span>
                        <span style={{gridColumn: "2/4"}} className={"secondary"}>
                            {comments.Comment}
                        </span>
                    </div>
                </div>
            </>)
        })}
    </>)
}
