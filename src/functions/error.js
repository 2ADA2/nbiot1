export const errorAnalyze = function (err, func = (err) => {}, updToken = () => {}) {
    if(typeof(err) !== "object" || !err.hasOwnProperty("response")) {
        func("unknown error")
        return
    }
    const res = err.response
    if (res.status === 401){
        func({
            name:"401",
            message:"no authorization",
            stack: err.stack
        })
        setTimeout(() => updToken(),1000)

    } else if(res.status === 404){
        func({
            name:"404",
            message:"server not found",
            stack: err.stack
        })
    }
    else{
        func(err)
    }
}