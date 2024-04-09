import axios from "axios";

export const setSettings = async (url, data = {}, token) => {
    const res = await axios.post(url, {
        "ConnectionDetails":{
            "HostName":data.hostName,
            "Port":data.port,
            "ClientID":data.clientId,
            "KeepAlive":data.keepAlive,
            "CleanSession":data.cleanSession
        },
        "Credentials":{
            "UserName":data.userName,
            "Password":data.password
        },
        "Last-Will":{
            "LastWillTopic":data.LWTopic,
            "LastWillMessage":data.LWMessage,
            "LastWillQos":data.LWQos,
            "LastWillRetain":data.LWRetain
        }
    },{headers: {"Authorization": token}})

    return res
}

export const setAdvSettings = async (url, data = "", token) => {
    const res = await axios.post(url, data,{headers: {"Authorization": token}})
    return res;
}