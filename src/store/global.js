import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";
import {logDOM} from "@testing-library/react";

class Global {
    isAuth = false;
    isAdmin = false;
    way = http.http;
    location = window.location.href;

    user = localStorage.getItem("userName")
    password = localStorage.getItem("password")
    token = localStorage.getItem("token")

    state = (localStorage.getItem("state")) ? JSON.parse(localStorage.getItem("state")) : null;
    devices = (localStorage.getItem("devices")) ? JSON.parse(localStorage.getItem("devices")) : [];
    deviceList = (localStorage.getItem("devices")) ? JSON.parse(localStorage.getItem("devList")) : [];
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
            if(this.user === "admin") this.isAdmin = true;
            this.updateAll()
        }
    }

    async authorizate(data) {
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
            if (this.userName === "admin") this.isAdmin = true;
        }).then(res => setTimeout(() => this.updateAll(), 500))
            .catch(err => this.err = err)
        return !this.err
    }

    async updateToken() {
        this.isAuth = false
        this.isAdmin = false
    }

    async setConnection() {
        const oldState = this.state
        if(this.state) {
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
        }).then(() => this.updateDevices())
    }

    updateConnection() {
        connect(this.way + "/state", (state) => this.state = state.ConnectionState, () => {
        }, this.token).then(() => localStorage.setItem("state" , this.state))
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
            new Promise((res, rej) => {
                let newDevs = [];
                for (let device of Array.from(this.deviceList)) {
                    connect(this.way + "/dev info/" + device, (dev) => {
                        newDevs.push(dev)
                    }, (err) => this.updateToken(), this.token)
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

        }, (err) => {}, this.token)
            .then(() => localStorage.setItem("devList", JSON.stringify(this.deviceList)))
            .then(() => localStorage.setItem("devices", JSON.stringify(this.devices)))
    }

    updateAll() {
        this.updateDevices()
        connect(this.way + "/settings", (settings) => this.settings = settings, (err) => this.updateToken(), this.token)
            .then(() => this.isAuth = true)
            .then(() => this.isLoading=false)
    }
}

export default new Global();