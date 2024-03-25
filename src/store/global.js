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
        console.log(JSON.stringify(this.device));
    }
    setLocation(){
        if(this.location != window.location.href){
            window.scrollTo(0,0)
        }
        this.location = window.location.href;
        if(!this.location.includes("sources/dev")){
            this.setDevice({})
        }
        
    }
}

export default new Global;