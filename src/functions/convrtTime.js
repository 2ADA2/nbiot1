import {dataToString} from "./dataToString";

export const convertTime = (time, date, newDate = (newTime) =>{}) =>{
    try {
        newDate(dataToString(time))
        return dataToString(time)
    } catch (error) {
        newDate(date)
    }
}