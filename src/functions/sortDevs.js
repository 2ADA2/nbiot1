export const sortDevs = (devs) => {
    devs = devs.filter(dev => Object.keys(dev).length>0)
    devs.sort((a, b) =>{
        return (
            Number(parseInt(a.Device.DevId.replace(/[^\w\s]|_/g, ""))) -
            Number(parseInt(b.Device.DevId.replace(/[^\w\s]|_/g, ""))))
    })
    return devs
};
