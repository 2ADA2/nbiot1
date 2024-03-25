import { CheckBox } from "../../components/checkbox";
import { Counter } from "../../components/counter";
import { Page } from "../../components/page"
import { checkDevice } from "../../functions/checkDevice";
import global from "../../store/global";
import { useEffect, useState } from "react"
import "../../styles/pages/sourcePages/devSettings.css"

export const DevSettings = () => {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [artist, setArtist] = useState("");

    useEffect(() => {
        checkDevice(global.device, "/sources" )
    },[]);
    if(!Object.keys(global.device).length){
        return <></>
    }

    return <Page 
        header = "Device Settings" 
        subHeader="Настройки устройства" 
        header2 = "Настройки устройства"
        elem={
            <form className="devSettings">
                <h3>Настройки замера</h3>
                <section className="measurement">
                    <section className="counters">
                        <div>
                            <h5>Произвести измерение в</h5><Counter/>
                        </div>
                        <div>
                            <h5>Время замера, сек</h5><Counter />
                        </div>
                        <div>
                            <h5>Повторять измерение каждые, сек</h5><Counter />
                        </div>
                    </section>
                    <section className="inputs">
                        <div>
                            <h5>UTC</h5><CheckBox/>
                        </div>
                        <div>
                            <h5>Режим измерения</h5>
                            <select>
                                <option>режим измерений</option>
                            </select>
                        </div>
                        <div>
                            <h5>Режим фильтра</h5>
                            <select>
                                <option>FIRmod1</option>
                            </select>
                        </div>
                    </section>
                </section>

                <h3>Замеры</h3>
                <section className="measurements">
                    <div className="console">
                        <h5>Действующие замеры</h5>
                        <textarea className="measurement-now"></textarea>    
                    </div>
                    <div className="console">
                        <h5>Выполненные замеры</h5>
                        <textarea></textarea>
                    </div>
                </section>

                <h3>Комментарий</h3>
                <section className="comments">
                    <label>
                        <h5>Title</h5>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }}></input>
                    </label>  
                    <label>
                        <h5>Comment</h5>
                        <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }}></input>
                    </label>    

                    <label>
                        <h5>Artist</h5>
                        <input type="text" value={artist} onChange={(e) => { setArtist(e.target.value) }}></input>
                    </label>    


                </section>

                <duv className = "buttons">
                    <button>
                        Отправить
                    </button>
                    <button>
                        Очистить списки
                    </button>
                </duv>

            </form>
        }
        />
}