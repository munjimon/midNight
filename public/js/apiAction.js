// API URL
const BASE_URL = "http://localhost:3005/"
// API header
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

// get data(user,memo) from server
const getter = path => {
  return (
    axios
      .get(`${BASE_URL + path}`)
      // .then(response => response.json())
      .then(res => res.data)
      .catch(err => {
        consone.error(err)
      })
  )
}

// add data(user,memo) to server
const adder = payload => {
  return axios
    .post(
      `${BASE_URL + payload.path}`,
      payload.name !== undefined
        ? { name: payload.name }
        : { title: payload.title, userId: payload.userId }
    )
    .then(res => res.data)
    .catch(err => {
      consone.error(err)
    })
}

// delete data(memo) to server
const deleter = id => {
  return axios.delete(`${BASE_URL}memo/${id}`).catch(err => console.error(err))
}
