import axios from "axios"
import global from "../store/global"
import { observer } from "mobx-react-lite"

export const connect =  async (url,setData,setError = (error) => {}, token = "") => {
  try {
    const res = await axios.get(url,{
      headers:{
        "authorization":token
      }
    })
    setData(res.data)
  } catch (error) {
    setError(error)
  }
  
}