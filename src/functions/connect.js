import axios from "axios"

export const connect =  async (url,setData,setError = (error) => {}, token = "") => {
  const res = await axios.get(url,{
    headers:{
      "Authorization": token,
    }
  })
      .then((response) => {setData(response.data)})
      .catch((err) => {
        setError(err)
      })
  return res
}