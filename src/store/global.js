import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";
import {errorAnalyze} from "../functions/error";
import axios from "axios";

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
    deviceList = (localStorage.getItem("deviceList")) ? JSON.parse(localStorage.getItem("devList")) : [];
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
            axios.get(this.shWay + "/protocol type", {headers: {token: this.token}})
                .then(res => {
                    if (this.progType !== res.data["Protocol type"]) this.setType()
                }).then(() => this.updateAll())

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
                if (this.userName === "admin") {
                    this.isAdmin = true;
                    localStorage.setItem("isAdmin", "true")
                }
            }).then(() => setTimeout(() => this.updateAll(), 500))
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

    updateConnection() {
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
                const interval = setInterval(() => {
                    if (newDevs.length === this.deviceList.length && this.settings) {
                        res(newDevs)
                        clearInterval(interval)
                    }
                }, 20)
            })
                .then(res => this.devices = sortDevs(res))
                .then(() => this.updateConnection())
                .then(() => localStorage.setItem("devices", JSON.stringify(this.devices)))
                .catch((e) => errorAnalyze(e))

        })
            .then(() => localStorage.setItem("devList", JSON.stringify(this.deviceList)))
            .then(() => this.isAuth = true)
            .then(() => localStorage.setItem("devices", JSON.stringify(this.devices)))
            .then(() => this.isLoading = false)
            .catch(() => this.updateToken())
    }

    updateAll() {
        this.progType === "mqtt" ?

            this.updateProcessor()
                .then(() => this.updateSettings()) // auto-check prog type
                .then(() => this.updateDevices())
                .then(() => this.updateConnection())
                .catch(() => this.updateToken())
            :

            this.updateProcessor()
                .then(() => this.updateSettings()) // auto-check prog type
                .then(() => this.updateDevicesSub())
                .catch(() => this.updateToken())
    }

    async updateProcessor() {
        connect(
            http.http + "cat/proc/cpuinfo", this.token).then(
            (res) => this.processor = res.data,
        )
    }

    async updateSettings() {
        connect((this.progType === "mqtt") ? this.way + "/settings" : this.subWay + "/gw settings", this.token).then(
            (settings) => this.settings = settings.data
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
            .catch(() => {
                this.updateToken()
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