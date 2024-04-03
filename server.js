const express = require("express")
const axios = require("axios")
const cors = require("cors")

const PORT = 3001;

const urlencodedParser = express.urlencoded({extended: false});
const app = express()

app.use(cors())
function createTime(){
    return new Date().toISOString().split(".")[0]

}
app.get('/mqtt/sources', (req, res) => {
    res.status(200).json({
        "Sources": [
            "10:19:19:31:11:51",
            "04:09:19:86:11:50",
            "11:20:90:13:73:50"
        ]
    })
})

app.post("/mqtt/Authorization", (req, res, next) => {
    res.json({"Token": "123"})
})

app.get("/mqtt/settings", (req, res) => {
    res.status(200).json({
        "Connection Details": {
            "Clean Session": true,
            "Client ID": "2599807",
            "Host name": "93.84.87.22",
            "Keep Alive": 60,
            "Port": 1883
        },
        "Credentials": {
            "Password": "Predikta",
            "User name": "admin"
        },
        "Last-Will": {
            "Last-Will Message": "",
            "Last-Will Qos": 0,
            "Last-Will Retain": false,
            "Last-Will Topic": ""
        }
    })
})

app.get('/mqtt/dev%20info/04:09:19:86:11:50', (req, res) => {
    res.status(200).json({
        "Device": {
            "DevId": "04:09:19:86:11:50",
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
                "StatusBitMask": "0x00006000"
            }
        }
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
                "Battery": 46,
                "Mode": "NBIoT",
                "GSM siglevel": -55,
                "Temperature": 32,
                "StatusBitMask": "0x00006000"
            }
        }
    })
})
app.get('/mqtt/dev%20info/64', (req, res) => {
    res.status(200).json({
        "Device": {
            "DevId": "11:20:90:13:73:59",
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
                "Battery": 46,
                "Mode": "NBIoT",
                "GSM siglevel": -55,
                "Temperature": 32,
                "StatusBitMask": "0x00006000"
            }
        }
    })
})
app.get('/mqtt/dev%20info/11:20:90:13:73:50', (req, res) => {
    res.status(200).json({
        "Device": {
            "DevId": "11:20:90:13:73:50",
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
                "Battery": 25,
                "Mode": "NBIoT",
                "GSM siglevel": -45,
                "Temperature": 27,
                "StatusBitMask": "0x00006000"
            }
        }
    })
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

app.listen(PORT, () => console.log("server started at port " + PORT))