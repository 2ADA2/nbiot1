import axios from "axios";

export const sendCmd = async (way, token, cmd) => {
    return axios.post(way, {cmd},{headers: {'token': token}})
}