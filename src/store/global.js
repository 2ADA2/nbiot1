import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";
import {errorAnalyze} from "../functions/error";

class Global {

    isAuth = false;
    // isAdmin = (localStorage.getItem("isAdmin")) ? JSON.parse(localStorage.getItem("isAdmin")) : null;
    isAdmin = true;
    way = http.http + "mqtt";
    subWay = http.http + "sub";
    shWay = http.http + "sh219 info";
    progType = localStorage.getItem("progType") || "mqtt";
    processor = null

    user = localStorage.getItem("userName")
    password = localStorage.getItem("password")
    token = localStorage.getItem("token")

    state = (localStorage.getItem("state")) ? JSON.parse(localStorage.getItem("state")) : null;
    devices = (localStorage.getItem("devices")) ? JSON.parse(localStorage.getItem("devices")) : [];
    deviceList = (localStorage.getItem("deviceList")) ? JSON.parse(localStorage.getItem("deviceList")) : [];
    settings = null;
    err = false;
    isLoading = true;
    advSettings = null;

    constructor() {
        // this.token = ""
        // localStorage.setItem("token", "")
        makeAutoObservable(this)
        if (this.token) {
            this.isAuth = true;
            this.updateType()
            this.updateAll()
        }
    }

    setType() {
        if (this.progType === "mqtt") {
            this.progType = "sub"
            localStorage.setItem("progType", this.progType);
        } else {
            this.progType = "mqtt"
            localStorage.setItem("progType", this.progType);
        }
        this.updateAll()
    }

    updateType() {
        connect(this.shWay + "/protocol type", this.token)
            .then(res => {
                this.progType = res.data["Protocol type"]
                localStorage.setItem("progType", this.progType);
            }).then(() => this.updateAll()).catch((err) => {
            errorAnalyze(err, (err) => this.err = err, () => this.updateToken())
        })
    }

    intervalUpdate() {
        this.updateProcessor()
        switch (this.progType) {
            case "mqtt":
                this.updateDevices()
            case "sub":
                this.updateDevicesSub()
        }
    }

    async authorizate(data) {
        // localStorage.setItem("isAdmin", "false")
        // this.isAdmin = false;
        fetch(this.way + "/Authorization", {
            method: "POST", body: JSON.stringify({
                "AuthData": {
                    "Login": data.name, "Password": data.password
                }
            })

        }).then(res => res.json())
            .then(res => {
                this.token = res["Token"]
                if (!this.token) throw new Error()
                localStorage.setItem("token", res["Token"])
                this.userName = data.name;
                this.password = data.password;
                localStorage.setItem("userName", this.userName)
                localStorage.setItem("password", this.password)
                this.isAuth = true
                if (this.userName === "admin") {
                    this.isAdmin = true;
                    localStorage.setItem("isAdmin", "true")
                }
            }).then(() => {
            this.updateType()
        })
            .then(() => setTimeout(() => this.updateAll(), 500))
            .catch(err => this.err = err)
        return !this.err
    }

    async updateToken() {
        this.token = ""
        this.isAuth = false;
        localStorage.setItem("token", "")
    }

    async setConnection() {
        const oldState = this.state
        if (this.state) {
            this.state = 3
        } else {
            this.state = 4;
        }
        fetch(this.way + "/set state", {
            method: "POST", body: JSON.stringify({
                "MQTT_connect": !oldState
            }), headers: {
                "authorization": this.token
            }
        }).then((res) => {
            if (!res.ok) throw new Error()
        }).then(() => this.updateDevices())
            .catch(() => {
                this.isAuth = false
                this.updateToken()
            })
    }

    async updateConnection() {
        connect(this.way + "/state", this.token).then((res) => {
            this.state = res.data.ConnectionState
            if (typeof (this.state) !== 'string') localStorage.setItem("state", this.state)
        }).catch(() => this.isAuth = false)
    }

    setLocation(href = "") {
        if (href) {
            window.location.href = href
            this.location = href
            return;
        }
        if (this.location !== window.location.href) {
            window.scrollTo(0, 0)
        }
        this.location = window.location.href;
    }

    updateDevicesSub() {
        connect(this.subWay + "/sources", this.token).then((res) => {
            this.deviceList = res.data.Sources;
        }).then(() => {
            this.devices = []
            let ids = this.deviceList.slice()
            this.deviceList.forEach(d => {
                connect(this.subWay + "/dev info/" + d, this.token)
                    .then((res) => {
                        if(!this.devices.length || !ids.includes(res.data.Device.DevId)){
                            console.log(ids)
                            ids.splice(ids.indexOf(res.data.Device.DevId), 1)
                            this.devices = [...this.devices, res.data]
                        }
                    })
            })
        })
            .catch((err) => {
                errorAnalyze(err, (err) => this.err = err, () => this.updateToken())
            })
    }

    updateDevices() {
        connect(this.way + "/sources", this.token).then((res) => {
            this.deviceList = res.data.Sources;

            new Promise((res) => {
                let newDevs = [];
                for (let device of Array.from(this.deviceList)) {

                    connect(this.way + "/dev info/" + device, this.token).then((dev) => {
                        connect(this.way + "/DBState/" + device, this.token).then((res) => {
                            dev.inDB = res.data.PutDBState;
                            connect(this.way + "/utc state/" + device, this.token).then((res) => {
                                dev.utc = res.data.UtcState;
                                newDevs.push(dev.data)
                            })
                        })
                    })
                }
            })
                .then(() => this.updateConnection())
                .catch((e) => errorAnalyze(e))

        })
            .then(() => this.isAuth = true)
            .catch(() => this.updateToken())
    }

    async checkDevs() {

        const interval = setInterval(() => {
            if (this.devices.length === this.deviceList.length && this.settings) {
                this.isLoading = false
                this.devices = sortDevs(this.devices)
                localStorage.setItem("devices", JSON.stringify(this.devices))
                localStorage.setItem("deviceList", JSON.stringify(this.deviceList))
                clearInterval(interval)
                return
            }
        }, 100)
    }

    updateAll() {

        this.updateProcessor()
            .then(() => this.updateSettings())
            .then(() => {
                this.progType === "mqtt" ?
                    this.updateConnection()
                        .then(() => this.checkDevs())
                        .catch(() => this.updateToken())
                    :
                    this.checkDevs()
                        .catch(() => this.updateToken())
            })
    }

    async updateProcessor() {
        connect(
            http.http + "cat/proc/cpuinfo", this.token).then(
            (res) => this.processor = res.data,
        )
    }

    async updateSettings() {
        connect((this.progType === "mqtt") ? this.way + "/settings" : this.subWay + "/gw settings", this.token).then(
            (settings) => {
                this.settings = settings.data
                if (this.progType === "sub") this.settings = this.settings.GW_Settings
            }
        )
            .then(() => {
                if (this.isAdmin) {
                    if (this.progType === "mqtt") {
                        connect(this.way + "/Advanced settings", this.token).then(
                            (advSettings) => {
                                localStorage.setItem("advSettings", advSettings.data)
                                this.advSettings = advSettings.data
                            })
                    } else {
                        connect(this.subWay + "/Advanced settings", this.token).then(
                            (advSettings) => {
                                localStorage.setItem("advSettings", advSettings.data)
                                this.advSettings = advSettings.data
                            })
                    }

                } else {
                    localStorage.setItem("advSettings", "")
                }
            })
            .catch((err) => {
                this.catchError(err)
            })
    }

    setAdvSettings(adv) {
        this.advSettings = adv
        localStorage.setItem("advSettings", adv)
    }

    catchError(err) {
        errorAnalyze(err, (err) => this.err = err, () => this.updateToken())
    }
}

export default new Global();