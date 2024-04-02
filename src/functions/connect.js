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
    if(res.status >= 200 && res.status < 400){
      setData(res.data)
    } else throw new Error("ConnectionError")
  } catch (error) {
    setError(error)
  }
  
}