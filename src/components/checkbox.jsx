import { useState } from "react";
import "../styles/components/checkbox.css";
export const CheckBox = ({checked = false, setValue = () => {}}) => {
    //шаблон переключателя(1баг?)
    const [check, setCheck] = useState(checked)
    return (
        <div className="checkbox-container">
            <label className="switch">
                <input 
                    type = "checkbox" 
                    className="checkbox" 
                    checked = {check}
                    onChange={() => {
                        setCheck(!check)
                        setValue()
                }}></input>
                <span className="switch-slider"></span>
            </label>
        </div>
    )
}