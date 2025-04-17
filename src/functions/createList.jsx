

export const CreateList = (mass) => {
    return (
        <>
            {
                mass.map((e, i) => {
                    return (
                        <>
                            <div key={i} className={"measurements-list-item"} onClick={() => console.log(true)}>
                                <span>{e}</span>
                                <span style={{fontSize: "16px", gridColumn: "2/4"}}>Имя автора: Заголовок</span>
                                <span style={{opacity: 0.7, gridColumn: "1"}}>В ожидании</span>
                                <span style={{gridColumn: "2/4"}}>Какой-нибудь комментарий</span>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}
