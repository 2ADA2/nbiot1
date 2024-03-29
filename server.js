const express = require ("express")
const cors = require("cors")

const PORT  = 3001;

const app = express()

app.use(cors())

app.get('/mqtt/sources', (req, res) => {
    res.status(200).json({
        "Sources": [
            "10:19:19:31:11:51",
            "04:09:19:86:11:50",
            "11:20:90:13:73:50"
        ]
    })
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
            "localTime": "2022-08-25T09:39:19",
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
            "localTime": "2022-08-25T09:39:19",
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
            "localTime": "2022-08-25T09:39:19",
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


app.listen(PORT, () => console.log("setver started at port " + PORT))