const express = require("express")
const axios = require("axios")
const cors = require("cors")

const PORT = 3001;

const urlencodedParser = express.urlencoded({extended: false});
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}));

function createTime() {
    return new Date().toISOString().split(".")[0]

}

let devs = {
    "Sources": [
        "10:19:19:31:11:51"
    ]
}
app.get('/mqtt/sources', (req, res) => {
    res.status(200).json(devs)
})

app.post("/mqtt/Authorization", (req, res, next) => {
    res.json({"Token": "123"})
})

app.get("/mqtt/settings", (req, res) => {
    res.status(200).json({
        "ConnectionDetails": {
            "CleanSession": true,
            "ClientID": "2599807",
            "HostName": "93.84.87.22",
            "KeepAlive": 60,
            "Port": 1883
        },
        "Credentials": {
            "Password": "Predikta",
            "User name": "admin"
        },
        "LastWill": {
            "LastWillMessage": "",
            "LastWillQos": 0,
            "LastWillRetain": false,
            "LastWillTopic": ""
        }
    })
})
app.get('/mqtt/DBState/10:19:19:31:11:51', (req, res) => {
    res.status(200).json({
        "DBState": false
    })
})

app.post('/mqtt/DB/10:19:19:31:11:51', (req, res) => {
    res.status(200).json({
        "Dev_NumDB": 300000
    })
})


app.get('/mqtt/utc%20state/10:19:19:31:11:51', (req, res) => {
    res.status(200).json({
        "UTC": true
    })
})

app.get('/mqtt/dev%20info/10:19:19:31:11:51', (req, res) => {
    res.status(200).json({
        "Device": {
            "DevId": "10:19:19:31:11:51",
            "DevName": "MM133.2",
            "SoftVer.": "1.0.0.a",
            "BoardRev.": "1.2",
            "ProtoVer.": "1.2"
        },
        "DeviceAttr": {
            "localTime": createTime(),
            "LinkRepeat": 30,
            "Configured": 0,
            "State": 0,
            "Registered": 0,
            "Metrics": {
                "Battery": 11,
                "Mode": "NBIoT",
                "GSM siglevel": -50,
                "Temperature": 29,
                "StatusBitMask": "0x00006000",
                "Online": true,
            }
        }
    })
})

app.get('/sub/dev%20info/10:19:19:31:11:51', (req, res) => {
    res.status(200).json({
        "Device": {
            "DevId": "10:19:19:31:11:51",
            "DevName": "MM133.2",
            "SoftVer.": "1.0.0.a",
            "BoardRev.": "1.2",
            "ProtoVer.": "1.2"
        },
        "DeviceAttr": {
            "NumChannel": 30,
            "Window": 0,
            "Metrics": {
                "Battery": 11,
                "RSSI level": -50,
                "Temperature": 29,
                "StatusBitMask": "0x00006000",
                "Online": true,
            },

        }
    })
})

let state = false
app.get("/mqtt/state", (req, res) => {
    res.status(200).json({
            "ConnectionState": state
        }
    )
})

app.post("/mqtt/set%20state", (req, res, next) => {
    state = !state
    res.status(200).json({"state": state})
    if (state) {

    }
})
app.get("/mqtt/Advanced%20settings", function (req, res) {
    res.send(`HostBroker=93.84.87.22
PortBroker=1883
GuardInterval=3
AllPackages=1
RawDataSave=1
PSflag=true
MqttPassword=1\\x10\\x17\\x12\\b\a\\x1fP
MqttUserName=admin

AddRawDataUrl=http://192.168.0.201:5101/api/v2.1/rawdata/addv2
LastParamInfoUrl="http://192.168.0.201:5101/api/v2.1/RawData/latest-param-info?source="
LoginUrl=http://192.168.0.201:9109/api/v2.1/user/login
Password=gateway
RefreshTokenUrl=http://192.168.0.201:9109/api/v2.1/user/refresh-token
UserInfoUrl=http://192.168.0.201:9109/api/v2.1/User/user-info
UserName=gateway-3-11

MAC04_09_19_86_11_50=5896`);
});
app.get("/sub/Advanced%20settings", function (req, res) {
    res.send(`advanced sub`);
});

app.post("/sh219%20info/cmd_get", function (req, res) {
    if (req.body.CMD === "cat /proc/cpuinfo") {
        res.status(200).send("model name      : ARMv7 Processor rev 2 (v7l)\n" +
            "BogoMIPS        : 994.30\n" +
            "Features        : half thumb fastmult vfp edsp neon vfpv3 tls vfpd32\n" +
            "CPU implementer : 0x41\n" +
            "CPU architecture: 7\n" +
            "CPU variant     : 0x3\n" +
            "CPU part        : 0xc08\n" +
            "CPU revision    : 2\n" +
            "\n" +
            "Hardware        : Generic AM33XX (Flattened Device Tree)\n" +
            "Revision        : 0000\n" +
            "Serial          : 80:f5:b5:d8:8b:93")
    } else res.status(200).send("pong")

});

app.get("/sh219%20info/protocol%20type", function (req, res) {
    res.status(200).send({"Protocol type": "sub"});
});

app.get("/sub/gw%20settings", function (req, res) {
    res.status(200).json({
        GW_Settings: {
            State: "123"
        }
    });
});
app.post("/sub/gw%20settings", function (req, res) {
    res.status(200).json("accepted to execution")
});
app.post("/sub/cmd/", function (req, res) {
    if (req.body.USER_CMD === "GET SUB SHEDULE") {
        res.status(200).json({
            "Quantity": 2,
            "Shedul": [[1, 1, 3],[1, 5, 0]],
        })
    } else {
        res.status(200).send("ok")
    }
});

app.get("/sub/cmd%20execution%20state", function (req, res) {
    res.status(200).json("ok");
});

app.get("/sub/sources", function (req, res) {
    res.status(200).json(devs);
});

app.post("/sub/clear%20RX%20FIFO", function (req, res) {
    res.status(200).json(devs);
});
app.post("/sub/clear%20TX%20FIFO", function (req, res) {
    res.status(200).json(devs);
});
app.post("/sub/Synchronize%20time", function (req, res) {
    res.status(200).json(devs);
});


app.post("/api/auth/register", (req, res, next) => {
    res.json({"access_token": "123"})
})

app.post("/api/auth/jwt/login", (req, res, next) => {
    res.json({"access_token": "123"})
})


app.post("/api/stats/add_stats", (req, res, next) => {
    res.status(200)
})

app.post("/api/profiles/update", (req, res, next) => {
    res.status(200)
})
app.post("/api/setUserInfo", (req, res, next) => {
    res.status(200)
})

app.get("/api/profiles/get_info", (req, res, next) => {
    res.status(200).json({
        name: "ada22",
        keyboard_type: "bloody Q135",
        touchTyping: true,
        profession: "программист",
        location: "Беларусь/Гомель",
        register_date: "01.07.2024",
        user_info: "какая-то другая инфа про меня",
        achievements: {
            forty_characters_per_minute: true
        }
    })
})

app.get("/api/stats/get_modes_stats_data", (req, res, next) => {
    res.status(200).json({
            "symbols_per_minute_stats": {
                "standard_mode": [64, 61, 78, 68, 77, 76, 71, 72, 64, 61, 74, 79, 75, 70, 80, 64, 66, 63,
                    62, 76, 77, 67, 69, 79, 62, 61, 62, 78, 62, 76, 61, 64, 78, 62, 70, 74,
                    69, 68, 69, 78, 65, 77, 67, 60, 79, 66, 76, 73, 68, 77, 74, 60, 80, 60,
                    69, 61, 67, 61, 64, 70, 72, 72, 67, 76, 73, 67, 73, 75, 80, 66, 64, 66,
                    71, 70, 69, 71, 66, 79, 72, 79, 75, 62, 73, 72, 74, 69, 74, 80, 78, 68],
                "extended_mode": [
                    76, 71, 70, 69, 71, 66, 79, 72, 79, 75, 62, 73, 72, 74, 69, 74, 80, 78, 68
                ],
                "text_mode": [
                    76, 72, 67, 76, 73, 67, 73, 75, 80, 66, 64, 66,
                ],
                "extreme_mode": [
                    76, 69, 79, 62, 61, 62, 78, 62,
                ],
                "english_mode": [
                    76, 71, 72, 64, 61
                ],
                "user_mode": [
                    76, 75, 70, 80, 64, 66, 63,
                ]
            },
            "average_accuracy_stats": {
                "standard_mode": 100,
                "extended_mode": 13,
                "text_mode": 32,
                "extreme_mode": 1,
                "english_mode": 17,
                "user_mode": 52
            },
            "number_training_sessions_stats": {
                "standard_mode": 94,
                "extended_mode": 74,
                "text_mode": 84,
                "extreme_mode": 53,
                "english_mode": 89,
                "user_mode": 90
            },
        }
    )
})

app.get("/api/stats/get_last_sessions_stats", (req, res, next) => {
    res.status(200).json({
        "symbols_per_minute_values": [50, 50, 22, 34, 26, 66, 42, 56, 62, 61],
        "modes_types": ["english_mode", "english_mode", "text_mode", "custom_mode", "extreme_mode", "extended_mode", "extended_mode", "extended_mode", "extended_mode", "standard_mode"],
        "symbols_per_minute_stats": {"the_best_result": 66, "the_worst_result": 22, "average_result": 46.9},
        "accuracy_stats": {"the_best_result": 100.0, "the_worst_result": 57.14, "average_result": 80.74},
        "the_most_popular_mode": "extended_mode",
        "smp_best_mode": "extended_mode",
        "accuracy_best_mode": "english_mode"
    })
})


app.listen(PORT, () => console.log("server started at port " + PORT))