import "../styles/components/checkbox.css";
export const CheckBox = () => {
    //шаблон переключателя(1баг?)
    return (
        <div className="checkbox-container">
            <label className="switch">
                <input type = "checkbox" className="checkbox"></input>
                <span className="switch-slider"></span>
            </label>
        </div>
    )
}