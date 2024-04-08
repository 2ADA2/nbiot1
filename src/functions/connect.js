import axios from "axios"

export const connect =  async (url,setData,setError = (error) => {}, token = "") => {
  try {
    const res = await axios.get(url,{
      headers:{
        "authorization":token
      }
    })
    setData(res.data)
    return res.data
  } catch (error) {
    setError(error)
    return error
  }
}