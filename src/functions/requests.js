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

export const postReq = async (url, data = "", token) => {
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
            "Dev_numDB": Number(num)
        }
    }, {headers: {"Authorization": token}})

    return res
}

export const startMeasureImit = async (url, data, token) => {
    const res = await axios.post(url, {
        "MeasSchedule": {
            "Tmeas": data.time,
            "Trepeat": data.repeat,
            "Tstart": data.date,

            "MeasType": "Imit",
            "FIRmode": data.mode,
            "Nois": data.Noise,
            "Sig1": [data.SignA1, data.SignA2, data.SignA3],
            "Sig2": [data.SignB1, data.SignB2, data.SignB3],
            "Sig3": [data.SignC1, data.SignC2, data.SignC3]
        },
        "MeasComment": {
            "Titel": data.title,
            "Comment": data.comment,
            "Artist": data.artist

        }
    }, {headers: {"Authorization": token}})
    return res;
}
export const startMeasure = async (url, data, token) => {
    const res = await axios.post(url, {
        "MeasSchedule": {
            "Tmeas": data.time,
            "Trepeat": data.repeat,
            "Tstart": data.date,

            "MeasType": "Real",
            "FIRmode": data.mode
        },
        "MeasComment": {
            "Titel": data.title,
            "Comment": data.comment,
            "Artist": data.artist

        }
    }, {headers: {"Authorization": token}})
    return res;
}

export const clear = async(url, token) => {
    const res = await axios.post(url, {
            "MeasClear":"all measure list"
        },
        {headers: {"Authorization": token}})
    return res;
}

export const sendCommand = async(url, data, token) => {
    const res = await axios.post(url, {
        "MeasSchedule": {
            "Tmeas": data.time,
            "Trepeat": data.repeat,
            "Tstart": data.date,

            "MeasType": "Real",
            "FIRmode": data.mode
        },
        "MeasComment": {
            "Titel": data.title,
            "Comment": data.comment,
            "Artist": data.artist

        }
    }, {headers: {"Authorization": token}})
    return res;
}