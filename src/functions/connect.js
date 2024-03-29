export const connect = (url,setData,setError = () => {}) => {
  fetch(url)
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => {
      setTimeout(() => {
        fetch(url)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => setError(err))
      }, 2000)
    })
}