import axios from "axios";

export const setSettings = async (url, data = {}, token) => {
    const res = await axios.post(url,
        {
            "ConnectionDetails": {
                "CleanSession": data.cleanSession,
                "ClientID": data.clientId,
                "HostName": data.hostName,
                "KeepAlive": data.keepAlive,
                "Port": Number(data.port)
            },
            "Credentials": {
                "Password": data.password,
                "UserName": data.userName
            },
            "LastWill": {
                "LastWillMessage": data.LWMessage,
                "LastWillQos": Number(data.LWQos),
                "LastWillRetain": data.LWRetain,
                "LastWillTopic": data.LWTopic
            }
        }
        , {headers: {"Authorization": token}})

    return res
}

export const setAdvSettings = async (url, data = "", token) => {
    const res = await axios.post(url, data, {headers: {"Authorization": token}})
    return res;
}

export const setUTC = async (url, utc = "", token) => {
    const res = await axios.post(url, {
        "Utc": utc
    }, {headers: {"Authorization": token}})
    return res;
}

export const setDBSettings = async (url, state, num, token) => {
    const res = await axios.post(url, {
        "DBSettings": {
            "State": state,
            "Dev_numDB": num
        }
    },{headers: {"Authorization": token}})

    return res
}