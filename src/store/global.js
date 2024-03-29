import { makeAutoObservable } from "mobx";
import device from "../asks/device.json"
import deviceList from "../asks/devices.json"
import http from "../http.json"
import { connect } from "../functions/connect";
import { useFetcher } from "react-router-dom";

class Global{
    isAdmin = true;
    way = http.http;
    user = "Super User";


    location = window.location.href;
    devices = null;
    deviceList = null;
    settings = null;
    err = false;
    isLoading = true;


    constructor(){
        makeAutoObservable(this);
        
        connect(this.way + "/settings", (settings) => this.settings = settings, (err) => this.err = err)
        this.updateDevList()
    }

    setLocation(href = false){
        if(href) {
            window.location.href = href
            this.location = href
            return;
        }        
        if(this.location != window.location.href){
            window.scrollTo(0,0)
        }
        this.location = window.location.href;
    }

    updateDevList(){
        connect(this.way + "/sources", (deviceList) => {
            this.deviceList = deviceList.Sources

            new Promise((res, rej) => {
                let newDevs = [];
                for (let device of Array.from(this.deviceList)) {
                    connect(this.way + "/dev info/" + device, (dev) => {
                        newDevs.push(dev)
                        console.log(dev)
                    }, (err) => this.err = err)
                    const interval = setInterval(() => {
                        if (newDevs.length == this.deviceList.length && this.settings) {
                            res(newDevs)
                            clearInterval(interval)
                        }
                    }, 0)
                }
            }
            )
                .then(res => this.devices = res)
                .then(res => this.isLoading = false)

        }, (err) => this.err = err) 
    }
}

export default new Global;