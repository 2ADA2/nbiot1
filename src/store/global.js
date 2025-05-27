import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {sortDevs} from "../functions/sortDevs";
import {errorAnalyze} from "../functions/error";
import {sendCmd} from "../functions/cmd";
import axios from "axios";

class Global {
    http = localStorage.getItem("http") ?? http.http

    isAuth = false;
    // isAdmin = (localStorage.getItem("isAdmin")) ? JSON.parse(localStorage.getItem("isAdmin")) : null;
    isAdmin = true;
    way = (this.http ?? window.location.origin + "/") + "mqtt";
    subWay = (this.http ?? window.location.origin + "/") + "sub";
    shWay = (this.http ?? window.location.origin + "/") + "sh219 info";
    progType = localStorage.getItem("progType") || "mqtt";
    processor = null
    os = ""

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
        if (this.http === "this" || !this.http) {
            this.way = window.location.origin + "/" + "mqtt";
            this.subWay = window.location.origin + "/" + "sub";
            this.shWay = window.location.origin + "/" + "sh219 info";
        }
        // this.token = ""
        // localStorage.setItem("token", "")
        makeAutoObservable(this)
        if (this.token) {
            this.isAuth = true;
            this.start()
        }
    }

    async start() {
        await this.updateType()
        const interval = setInterval(() => {
            if(!this.isAuth) {
                clearInterval(interval);
            }
            this.updateAll()

        },1000*60)
    }

    async updateAll() {
        if (this.os) {
            if (!this.processor && this.os === "linux") {
                this.updateProcessor()
            }
        } else {
            axios.get(this.shWay + "/operating system", {
                headers: {
                    Authorization: this.token
                }
            }).then((res) => {
                this.os = res.data["operating system"]
                if (res.data["operating system"] === "linux") this.updateProcessor()
            })
        }

        await this.updateSettings()
        await this.intervalUpdate()

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

    async updateType() {
        axios.get(this.shWay + "/protocol type", {headers: {"Authorization": this.token}})
            .then(res => {
                this.progType = res.data["Protocol type"]
                localStorage.setItem("progType", this.progType);
            }).then(() => this.updateAll()).catch((err) => {
            errorAnalyze(err, (err) => this.err = err, () => this.updateToken("upd type"))
        })
    }

    intervalUpdate() {
        switch (this.progType) {
            case "mqtt":
                this.updateDevices()
                break
            case "sub":
                this.updateDevicesSub()
                break
        }
    }

    async authorizate(data) {
        // localStorage.setItem("isAdmin", "false")
        // this.isAdmin = false;
        const res = await axios.post(this.way + "/Authorization", {
            "AuthData": {
                "Login": data.name, "Password": data.password
            }
        })
        this.token = res.data.Token
        if (!this.token) {
            this.updateToken("err")
            return
        }
        localStorage.clear()
        localStorage.setItem("token", res.data["Token"])
        this.userName = data.name;
        this.password = data.password;
        this.isAuth = true

        //admin?
        if (this.userName === "admin") {
            this.isAdmin = true;
        }

        this.start()
        return !this.err
    }

    async updateToken(context = "") {
        this.token = ""
        this.isAuth = false;
        localStorage.removeItem("token")
    }

    async setConnection() {
        const oldState = this.state
        if (this.state === 1) {
            this.state = 3
        } else {
            this.state = 4;
        }
        axios.post(this.way + "/set state", {
            "MQTT_connect": oldState !== 1
        }, {
            headers: {
                "authorization": this.token
            }
        }).then((res) => {
            if (res.status === 200) {
                this.state === 3 ?
                    this.state = 2
                    :
                    this.state = 1
                localStorage.setItem("state", this.state)
                this.updateDevices()
            } else throw new Error()
        }).catch((err) => {
                errorAnalyze(err, (err) => this.err = err, () => this.updateToken("err"))
            })
    }

    async updateConnection() {
        axios.get(this.way + "/state", {headers: {"Authorization": this.token}}).then((res) => {
            res.data.ConnectionState ?
                this.state = 1
                :
                this.state = 2
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
        axios.get(this.subWay + "/sources", {headers: {"Authorization": this.token}}).then((res) => {
            this.deviceList = res.data.Sources;
        }).then(() => {
            this.devices = []
            let ids = this.deviceList.slice()
            this.deviceList.forEach(d => {
                axios.get(this.subWay + "/dev info/" + d, {headers: {"Authorization": this.token}})
                    .then((res) => {
                        if (!this.devices.length || !ids.includes(res.data.Device.DevId)) {
                            ids.splice(ids.indexOf(res.data.Device.DevId), 1)
                            this.devices = [...this.devices, res.data]
                        }
                    })
            })
        })
            .then(() => this.checkDevs())
            .catch((err) => {
                errorAnalyze(err, (err) => this.err = err, () => this.updateToken("dev sub"))
            })
    }

    async updateDevices() {
        try{
            const sources = await axios.get(this.way + "/sources", {headers: {"Authorization": this.token}})

            const res = sources.data.Sources.slice();
            this.deviceList = res
            let newDevs = [];
            for (let device of Array.from(res)) {
                axios.get(this.way + "/dev info/" + device, {headers:{"Authorization": this.token}})
                    .then((res) => {
                        let dev = res.data
                        newDevs.push(dev)
                        if (newDevs.length === this.deviceList.length) {
                            this.devices = newDevs
                        }
                    })
            }
            if(!res.length){
                this.deviceList = []
                this.devices = []
            }
            this.checkDevs()
            this.updateConnection()
        }catch(err){
            errorAnalyze(err, (err) => this.err = err, () => this.updateToken("err"))
        }
    }

    async checkDevs(isUpdate = true) {
        const interval = setInterval(() => {
            if (this.devices.length === this.deviceList.length && this.settings) {
                this.isLoading = false
                const sortedDevs = sortDevs(this.devices)
                const sortedDevsList =  this.deviceList.sort((a, b) =>{
                    return (
                        Number(parseInt(a.replace(/[^\w\s]|_/g, ""))) -
                        Number(parseInt(b.replace(/[^\w\s]|_/g, ""))))
                })
                this.deviceList = sortedDevsList
                if (isUpdate) {
                    localStorage.setItem("devices", JSON.stringify(sortedDevs))
                    localStorage.setItem("deviceList", JSON.stringify(this.deviceList))
                }
                this.devices = sortedDevs.slice()
                clearInterval(interval)
                return
            }
        }, 100)
    }

    async updateProcessor() {
        await sendCmd(this.shWay + "/cmd_get", this.token, "cat /proc/cpuinfo").then(res => {
            this.processor = (res.data.split("\n"))
        })
    }

    async updateSettings() {
        axios.get((this.progType === "mqtt") ? this.way + "/settings" : this.subWay + "/gw settings", {headers: {"Authorization": this.token}})
            .then(
                (settings) => {
                    this.settings = settings.data
                    if (this.progType === "sub") this.settings = this.settings.GW_Settings
                }
            )
            .then(() => {
                if (this.isAdmin) {
                    if (this.progType === "mqtt") {
                        axios.get(this.way + "/Advanced settings", {headers: {"Authorization": this.token}}).then(
                            (advSettings) => {
                                localStorage.setItem("advSettings", advSettings.data)
                                this.advSettings = advSettings.data
                            })
                    } else {
                        axios.get(this.subWay + "/Advanced settings", {headers: {"Authorization": this.token}}).then(
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
        errorAnalyze(err, (err) => this.err = err, () => this.updateToken("err"))
    }
}

export default new Global();