import {dataToString} from "./dataToString";

export const convertTime = (time, date, newDate = (newTime) =>{}) =>{
    try {
        return(dataToString(time))
    } catch (error) {
        newDate(date)
    }
}