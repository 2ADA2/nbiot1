import axios from "axios";

export const sendCmd = async (way, token, CMD = {}) => {
    return axios.post(way, {CMD},{headers: {'Authorization': token, "Content-Type": "application/json; charset=utf-8"}})
}