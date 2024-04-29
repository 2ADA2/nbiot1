export const dataToString = (data) => {
    if(isNaN(data.getMonth())) return dataToString(new Date())
    return (
        data.getFullYear() +
        "-" +
        (data.getMonth() + 1) +
        "-" +
        data.getDate() +
        "T" +
        ((data.getHours()>9) ? data.getHours() : "0" + data.getHours()) +
        ":" +
        ((data.getMinutes()>9) ? data.getMinutes() : "0" + data.getMinutes()) +
        ":" +
        ((data.getSeconds()>9) ? data.getSeconds() : "0" + data.getSeconds())
    )
}