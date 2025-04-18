import {useState} from "react";
import {FormattedMessage} from "react-intl/lib";

export const CreateList = ({mass}) => {
    const [modal, setModal] = useState();

    return (
        <>
            {
                mass.map((e, i) => {
                    const time = e.split("")
                    time.splice(time.indexOf("T"), 1, " ").join("")
                    return (
                        <>
                            {modal && <>
                                <div className="UI-settings-page-back" onClick={() => setModal()}/>
                                <section className={"UI-settings-page"}>
                                    <button onClick={() => setModal()}>
                                        <h5></h5>
                                        <FormattedMessage id="UISettings.button"/>
                                    </button>
                                </section>
                            </>
                            }
                            <div key={i} className={"measurements-list-item"} onClick={() => setModal(true)}>
                                <span>{time}</span>
                                <span style={{fontSize: "16px", gridColumn: "2/4"}}>Имя автора: Заголовок</span>
                                <span style={{opacity: 0.7, gridColumn: "1"}}>Принято обработчиком</span>
                                <span style={{gridColumn: "2/4"}}>Какой-нибудь комментарий</span>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
