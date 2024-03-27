import { makeAutoObservable } from "mobx";
import device from "../asks/device.json"

class Global{
    way = "http://93.84.87.22:8002/mqtt"
    user = "Super User"
    location = window.location.href;
    devices = device;


    constructor(){
        makeAutoObservable(this);
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
}

export default new Global;