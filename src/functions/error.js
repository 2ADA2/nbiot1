import Global from "../store/global";

export const errorAnalyze = function (err, func = (err) => {}) {
    if(typeof(err) !== "object" || !err.hasOwnProperty("response")) {
        func("unknown error")
        return
    }
    const res = err.response
    if (res.status === 401){
        Global.updateToken()
    } else{
        func(err.message)
    }
}