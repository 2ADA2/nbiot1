import global from "../store/global"
export const checkDevice = (elem, location) => {
    if(!Object.keys(elem).length) window.location.href = location;
}