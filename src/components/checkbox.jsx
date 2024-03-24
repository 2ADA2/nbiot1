import { useState } from "react";
import "../styles/components/checkbox.css";
export const CheckBox = ({checked = false}) => {
    //шаблон переключателя(1баг?)
    const [check, setCheck] = useState(checked)
    return (
        <div className="checkbox-container">
            <label className="switch">
                <input type = "checkbox" className="checkbox" checked = {check} onClick={() => {setCheck(!check)}}></input>
                <span className="switch-slider"></span>
            </label>
        </div>
    )
}