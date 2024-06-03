export const dataToString = (data) => {
    if(isNaN(data.getMonth())) return dataToString(new Date())
    return (
        (data.getFullYear()>1999) ? data.getMonth() : "2024" +
        "-" +
        ((data.getMonth()>9) ? data.getMonth() : "0" + data.getMonth()) +
        "-" +
        ((data.getDate()>9) ? data.getDate() : "0" + data.getDate()) +
        "T" +
        ((data.getHours()>9) ? data.getHours() : "0" + data.getHours()) +
        ":" +
        ((data.getMinutes()>9) ? data.getMinutes() : "0" + data.getMinutes()) +
        ":" +
        ((data.getSeconds()>9) ? data.getSeconds() : "0" + data.getSeconds())
    )
}