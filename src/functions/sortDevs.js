export const sortDevs = (devs) => {
    devs.sort((a,b) => Number(parseInt(a.Device.DevId.replace(/[^\w\s]|_/g, "")))-Number(parseInt(b.Device.DevId.replace(/[^\w\s]|_/g, ""))))
    return devs
};
