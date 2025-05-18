import {useEffect, useState} from "react";

export const DotsAnim = () => {
    const [val, setVal] = useState("");
    useEffect(() => {
        let dots = ""
        const interval = setInterval(() => {
            dots +="."
            if(dots.length >3) dots = ""
            setVal(dots)
        },400)
        return () => {
            clearInterval(interval);
        }
    }, []);
    return <div>{val}</div>
}