export const dataToString = (data) => {
    return (
        data.getFullYear() +
        "-" +
        (data.getMonth() + 1) +
        "-" +
        data.getDate() +
        "T" +
        data.getHours() +
        ":" +
        data.getMinutes() +
        ":" +
        data.getSeconds()
    )
}