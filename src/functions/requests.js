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

export const startMeasureImit = async (url, data, token, func) => {
    axios.post(url, {
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
    }, {headers: {"Authorization": token}}).then((res) => func(res.data))
}
export const startMeasure = async (url, data, token, func) => {
    axios.post(url, {
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
    }, {headers: {"Authorization": token}}).then((res) => func(res.data))
}

export const clear = async (url, token, measure) => {
    const res = await axios.post(url, {
            "MeasClear": measure + " measure list"
        },
        {headers: {"Authorization": token}})
    return res;
}

export const sendCommand = async (url, data, token) => {
    let body;
    switch (data.command) {
        case "register":
            body = {
                "USER_CMD": "REGISTRATION",
                "USER_ARG": {
                    "reg_id": 123456
                }
            }
            break;
        case "setChos" :
            body = {
                "USER_CMD": "LINKSCHEDULE",
                "USER_ARG":{
                    "Trepeat": data.trepeat
                }
            }
            break;

        case "getLocation" :
            body = {
                "USER_CMD": "UPD_LOCATION"
            }

            break;
        case "updateLocation" :
            body = {
                "USER_CMD": "GET_LOCATION",
                "USER_ARG": {
                    "GNNS_TYPE": data.type,
                    "GNNS_TIMEOUT_S": data.timeout
                }
            }

            break;
        case "setParams" :
            body = {
                "USER_CMD": "SET_SENS_ATTR",
                "USER_ARG": {
                    "Kv_val": data.kval,
                    "Tprepare": data.tprepare
                }
            }

            break;
        case "getParams" :
            body = {
                "USER_CMD": "GET_SENS_ATTR",
            }

            break;
        case "onData" :
            body = {
                "USER_CMD": "DEBUG_ON"
            }

            break;
        case "reboot" :
            body = {
                "USER_CMD": "DEV_REBOOT"
            }

            break;
        case "updateSertificate" :
            body = {
                "USER_CMD": "FTP_СERT_UPD"
            }

            break;
        case "clearAll" :
            body = {
                "USER_CMD": "GET_EXT_INFO"
            }
            break;
        default :
            body = {
                "USER_CMD": "FTP_FW_UPD",
                "USER_ARG": {
                    "fw_name": data.UIName
                }
            }
    }
    return axios.post(url, body, {
        headers: {"Authorization": token}
    })
}
