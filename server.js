const express = require("express")
const axios = require("axios")
const cors = require("cors")

const PORT = 3001;

const urlencodedParser = express.urlencoded({extended: false});
const app = express()

app.use(cors())

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

app.get('/cat/proc/cpuinfo', (req, res) => {
    res.status(200).json({
            "model_name": "ARMv7 Processor rev 2 (v7l)",
            "BogoMIPS": 994.30,
            "Features": "half thumb fastmult vfp edsp neon vfpv3 tls vfpd32",
            "CPU_implementer": "0x41",
            "CPU_architecture": 7,
            "CPU_variant": "0x3",
            "CPU_part": "0xc08",
            "CPU_revision": 2,
            "Hardware": "Generic AM33XX (Flattened Device Tree)",
            "Revision": "0000",
            "Serial": "80:f5:b5:d8:8b:93"
        }
    )
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

app.listen(PORT, () => console.log("server started at port " + PORT))