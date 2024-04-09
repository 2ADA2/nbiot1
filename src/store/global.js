import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";

class Global {
    isAuth = false;
    isAdmin = (localStorage.getItem("isAdmin")) ? JSON.parse(localStorage.getItem("isAdmin")) : null;
    way = http.http;
    location = window.location.href;

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
            this.updateAll()
        } else this.isAuth = false
    }

    async authorizate(data) {
        localStorage.setItem("isAdmin", "false")
        this.isAdmin = false;
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
                localStorage.setItem("token", this.token)
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
            this.state = "disconnect..."
        } else {
            this.state = "connect...";
        }
        fetch(this.way + "/set state", {
            method: "POST", body: JSON.stringify({
                "MQTT_connect": !oldState
            }), headers: {
                "authorization": this.token
            }
        }).then((res) => {
            if (!res.ok) throw new Error()
        }).then(() => this.updateDevices()).catch(() => this.isAuth = false).catch(() => this.updateToken())
    }

    updateConnection() {
        connect(this.way + "/state", (state) => this.state = state.ConnectionState, () => {
        }, this.token).then(() => {
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

    updateDevices() {
        connect(this.way + "/sources", (deviceList) => {
            this.deviceList = deviceList.Sources;

            new Promise((res) => {
                let newDevs = [];
                for (let device of Array.from(this.deviceList)) {

                    connect(this.way + "/dev info/" + device, (dev) => {

                        connect(this.way + "/DBState/" + device, (res) => {
                            dev.inDB = res.PutDBState;

                            connect(this.way + "/utc state/" + device, (res) => {
                                dev.utc = res.UtcState;
                                newDevs.push(dev)
                            }, () => {
                            }, this.token)

                        }, () => {
                        }, this.token)

                    }, () => this.updateToken(), this.token)

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

        }, () => {
            this.updateToken()
        }, this.token)
            .then(() => localStorage.setItem("devList", JSON.stringify(this.deviceList)))
            .then(() => localStorage.setItem("devices", JSON.stringify(this.devices)))
            .then(() => this.isAuth = true)
            .then(() => this.isLoading = false)
    }

    updateAll() {

        connect(this.way + "/settings",
            (settings) => {
                this.settings = settings

                if (this.isAdmin) {
                    connect(this.way + "/Advanced settings", (res) => {
                        this.advSettings = res;
                        localStorage.setItem("advSettings", this.advSettings)
                    }, () => this.updateToken(), this.token)
                }
            },
            () => this.updateToken(), this.token
        ).then(() => this.updateDevices())
            .catch(() => this.updateToken())
    }
}

export default new Global();