import axios from "axios";

export const sendCmd = async (way, token, cmd) => {
    return axios.get(way, {headers: {'token': token}, params: cmd})

}