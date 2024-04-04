import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";

class Global {
    isAuth = false;
    isAdmin = false;
    way = http.http;
    location = window.location.href;

    user = localStorage.getItem("userName")
    password = localStorage.getItem("password")
    token = localStorage.getItem("token")

    state = null
    devices = null;
    deviceList = null;
    settings = null;
    err = false;
    isLoading = true;
    advSettings = null;


    constructor() {
        // this.token = ""
        // localStorage.setItem("token" , "")
        makeAutoObservable(this);

        if (this.token) {
            this.isAuth = true;
            this.isAdmin = true;
            this.updateAll()
        }
    }

    async authorizate(data) {
        fetch(this.way + "/Authorization", {
            method: "POST",
            body: JSON.stringify({
                "AuthData": {
                    "Login": data.name, "Password": data.password
                }
            })

        }).then(res => {
            if (res.ok) {
                return res.json()
            } else throw new Error()

        }).then(res => {
            this.token = res["Token"].replace("{", "").replace("}", "")
            if (!this.token) throw new Error()
            localStorage.setItem("token", this.token)
            this.isAuth = true;
            this.userName = data.name;
            this.password = data.password;
            localStorage.setItem("userName", this.userName)
            localStorage.setItem("password", this.password)
            if (this.userName === "admin") this.isAdmin = true;

        }).then(() => this.updateAll()
        ).then(true)
            .catch(err => err)
    }

    async updateToken() {
        const res = await this.authorizate({name: this.userName, password: this.password})
            .catch(err => this.err = err)
    }

    async setConnection() {
        fetch(this.way + "/set state", {
            method: "POST",
            body: JSON.stringify({
                "MQTT_connect": !this.state
            }),
            headers: {
                "authorization": this.token
            }
        }).then(res => this.updateConnection())

    }

    updateConnection() {
        connect(this.way + "/state", (state) => this.state = state.ConnectionState, () => {
        }, this.token)
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
        this.updateConnection()
        new Promise((res, rej) => {
            let newDevs = [];
            for (let device of Array.from(this.deviceList)) {
                connect(this.way + "/dev info/" + device, (dev) => {
                    newDevs.push(dev)
                }, (err) => {
                }, this.token)
            }
            const interval = setInterval(() => {
                if (newDevs.length === this.deviceList.length && this.settings) {
                    res(newDevs)
                    clearInterval(interval)
                }
            }, 20)
        })
            .then(res => this.devices = sortDevs(res))
    }

    updateAll() {
        connect(this.way + "/settings", (settings) => this.settings = settings, (err) => this.updateToken(), this.token)
        connect(this.way + "/sources", (deviceList) => {
            this.deviceList = deviceList.Sources

            if (this.isAdmin) {
                fetch(this.way + "/Advanced settings", {headers: {"authorization": this.token}})
                    .then(res => res.text())
                    .then(res => this.advSettings = res)
            }

            new Promise((res, rej) => {
                let newDevs = [];
                for (let device of Array.from(this.deviceList)) {
                    connect(this.way + "/dev info/" + device, (dev) => {
                        newDevs.push(dev)
                    }, (err) => {
                    }, this.token)
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
                .then(() => this.isLoading = false)

        }, (err) => this.updateToken(), this.token)
    }
}

export default new Global();