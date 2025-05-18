import {useState} from "react";
import {FormattedMessage} from "react-intl/lib";
import {DotsAnim} from "./dotsAnim";

export const CreateListFulfilled = ({mass, states, errors, sheduls}) => {
    const [modal, setModal] = useState("");
    return (<>
        {mass.map((e, i) => {
            const comments = e.MeasComment
            let state = states[i]
            const error = errors[i]
            const shedul = sheduls[i]
            let isOk = true
            if (state) {
                isOk = !error
            }
            const Tstart = e.MeasSchedule.Tstart.split("")
            const date = Tstart.slice(0, Tstart.indexOf("T"))
            const time = Tstart.slice(Tstart.indexOf("T") + 1, e.length)
            const isImit = e.MeasSchedule.MeasType === "Imit"
            return (<>
                {(modal === e.MeasSchedule.Tstart) && <>
                    <div className="UI-settings-page-back" onClick={() => {
                        if (!e.isPlanning) setModal()
                    }}/>
                    <section className={"UI-settings-page meas-modal"} key={i}>
                        {(isImit) ? <>
                            <div className="modal-row">
                                <h3 style={{gridColumn: "1/3"}}>{e.MeasComment.Artist || "Без автора"}:{" " + (e.MeasComment.Titel || "Без названия")}</h3>
                                <span style={{gridColumn: "1/3"}}>Комментарий: {e.MeasComment.Comment}</span>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время измерения </h5>
                                <h5> {e.MeasSchedule.Tmeas} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Повторять каждые </h5>
                                <h5> {e.MeasSchedule.Trepeat} сек </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Время исполнения </h5>
                                <h5> {e.MeasSchedule.Tstart} </h5>
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Статус </h5>
                                <h5> {state} </h5>
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
                                <h5 style={{display: "flex", justifyContent: "flex-end"}}> Статус </h5>
                                <h5> {state} </h5>
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
                <div key={i}
                     className={"measurements-list-item " + (!isOk ? "err":"real")}
                     onClick={() => {
                         if (!e.isPlanning) setModal(e.MeasSchedule.Tstart)
                     }}>
                    <div className={"item-about"}>
                        <span>{comments.Artist || "Без автора"}</span>
                        <span>
                            <span style={{marginRight: 4}}>
                                {time}
                            </span>
                            <span style={{gridColumn: "1", lineHeight: "26px"}} className={"secondary"}>
                                {date}</span>
                        </span>
                        <ul className={"secondary"}>
                            <li className={shedul&&"ok"}>
                                {shedul}
                            </li>
                            <li className={state&&"ok"}>
                                {state}
                            </li>
                            {!isOk &&
                                <li className={"error-text"}>
                                    {error}
                                </li>
                            }
                        </ul>
                    </div>

                    <div className={"item-comments"}>
                        <span style={{gridColumn: "2/4"}} className={"meas-item-header"}>
                            {comments.Titel || "Без названия"}
                        </span>
                        <span style={{gridColumn: "2/4"}} className={"secondary"}>
                            {comments.Comment || "-"}
                        </span>
                    </div>
                </div>
            </>)
        })}
    </>)
}
