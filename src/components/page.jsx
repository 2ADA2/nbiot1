import "../styles/components/page.css"

export const Page = ({header = "Header", subHeader = "", header2 = "Header2", elem = ""}) => {
    //шаблон страницы
    return (
        <section className = "container">
            
            <div className="page">
                <h1>{header}<span>{subHeader}</span></h1>
                <h2>{header2}</h2>

                <section className="section">
                    {elem}    
                </section>
            </div>
        </section>
    )
}