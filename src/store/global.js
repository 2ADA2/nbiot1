import { makeAutoObservable } from "mobx";

class Global{
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
    setLocation(){
        this.location = window.location.href
        console.log(this.location)
    }
}

export default new Global;