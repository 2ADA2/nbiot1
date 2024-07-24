import axios from "axios"

export const connect =  async (url,token = "") => {
  return await axios.get(url,{
    headers:{
      "Authorization": token,
    }
  })
}