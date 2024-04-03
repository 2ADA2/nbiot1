import {makeAutoObservable} from "mobx";
import http from "../http.json"
import {connect} from "../functions/connect";
import {sortDevs} from "../functions/sortDevs";

class Global {
    isAuth = false;
    isAdmin = false;
    way = http.http;
    user = null;
    token = localStorage.getItem("token")


    location = window.location.href;
    devices = null;
    deviceList = null;
    settings = null;
    err = false;
    isLoading = true;
    advSettings = null;


    constructor() {
        makeAutoObservable(this);
        if (this.token) {
            this.isAuth = true;
            this.isAdmin = true;
            this.updateDevList()
        }
    }

    async authorizate(data) {
        let res = await fetch(this.way + "/Authorization", {
            method: "POST",
            headers: {"authorization": global.token},
            body: JSON.stringify({
                "AuthData": {
                    "Login": data.name, "Password": data.password
                }
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else throw new Error("AuthError")
        }).then(res => {
            this.token = res["Token"]
            localStorage.setItem("token", res["Token"])
            this.isAdmin = true;
            this.isAuth = true;
        }).then(() => this.updateDevList()
        ).then(true)
            .catch(err => err)
    }

    setLocation(href = false) {
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

    updateDevList() {
        connect(this.way + "/settings", (settings) => this.settings = settings, (err) => this.err = err, this.token)
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
                .then(res => this.isLoading = false)

        }, (err) => this.err = err, this.token)
    }
}

export default new Global;