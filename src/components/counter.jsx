export const Counter = ({ count = 0, setCount = () => { }, newCount = () => { } }) => {
    return(
        <div className="counter-container">
            <input
                type="number"
                value={count}
                style={{"-webkit-appearance": "textfield"}}
                
                onChange={(e) => {
                    if (e.target.value === "-0"){
                        newCount(0)
                        e.target.value = 0
                    } else{
                        newCount(Number(e.target.value))
                        e.target.value = Number(e.target.value)
                    }
                }}>

            </input>
            <div className="counter" style={{userSelect : "none"}}>
                <button onClick={(e) => { 
                    e.preventDefault()
                    setCount(1)
                    }}>+</button>

                <button onClick={(e) => { 
                    e.preventDefault()
                    setCount(-1)
                    }}>-</button>
            </div>
        </div>
    )
}