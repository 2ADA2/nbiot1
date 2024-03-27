import { makeAutoObservable } from "mobx";

class Global{
    way = "http://93.84.87.22:8002/mqtt"
    user = "Super User"
    device = (JSON.parse(localStorage.getItem("device")) || {});
    location = window.location.href;
    constructor(){
        makeAutoObservable(this);
    }
    setDevice(device){
        this.device = device;
        localStorage.setItem("device", JSON.stringify(device));
    }
    setLocation(href){
        if(this.location != window.location.href){
            window.scrollTo(0,0)
        }
        this.location = window.location.href;
        if(href) this.location = href
        if(!this.location.includes("sources/dev")){
            this.setDevice({})
        }
    }
}

export default new Global;