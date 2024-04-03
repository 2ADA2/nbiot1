export const convertTime = (time, date, newDate = (newTime) =>{}) =>{
    try {
        const newTime = new Date(time).toISOString().split(".")[0]
        newDate(newTime)
    } catch (error) {
        newDate(date)
    }
}