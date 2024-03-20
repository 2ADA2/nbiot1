import "../styles/components/page.css"
import { useState } from "react";

export const Page = ({header = "Header", subHeader = "", header2 = "Header2", elem = ""}) => {

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