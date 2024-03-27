import { useEffect } from "react"
import "../styles/pages/home.css"
import { useDevice } from "../hooks/useDevice"

export const Home = () => {
    const dev = useDevice()
    //домашняя страница
    return (
        <div className = "home">
            <h1>
                NB-IoT collector
            </h1>
        </div>
    )
}