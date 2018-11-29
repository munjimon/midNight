// element selector
const contentBox = document.querySelector(".content")
const sectionText = document.querySelector(".text")
const inputBox = document.querySelector(".input-box")
const input = document.querySelector(".input")
// saved user information in localstoorage
const lsUserId = localStorage.getItem("userId")
const lsUserName = localStorage.getItem("userName")
// API URL
const BASE_URL = "http://localhost:3001/"
// API header
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

//////////////////
/* check method */
//////////////////

// if page reload , logined user check
window.addEventListener("DOMContentLoaded", () => {
  if (lsUserId !== null) loadMemo(lsUserId)
})

// Check registered users
const checkUser = e => {
  e.preventDefault()
  getData(`user?name=${input.value}`).then(res => {
    if (res.length !== 0) {
      setUser({ id: res[0].id, name: res[0].name })
      loadMemo(res[0].id)
    } else {
      adder({ path: "user", name: input.value }).then(res =>
        setUser({ id: res.id, name: res.name })
      )
      changeSection()
    }
  })
}

///////////
/* fetch */
///////////

// get data(user,memo) from server
const getData = path => {
  return fetch(`${BASE_URL + path}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      consone.error(err)
    })
}

// add data(user,memo) to server
const adder = payload => {
  return fetch(`${BASE_URL + payload.path}`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify({ name: payload.name })
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      consone.error(err)
    })
}

////////////
/* etc... */
////////////

// set user information in localstorage
const setUser = infor => {
  localStorage.setItem("userId", infor.id)
  localStorage.setItem("userName", infor.name)
}

// load All memo of selected user
const loadMemo = userId => {
  getData(`memo?userId=${userId}`).then(res => {
    res.length > 0 ? changeSection(res) : changeSection()
  })
}

// memo render & section view change
const changeSection = memo => {
  let name = ""
  if (memo !== undefined) {
    memo.map(v =>
      contentBox.insertAdjacentHTML(
        "beforeend",
        `<span class="memo">${v.title}</span>`
      )
    )
  }
  input.value === "" ? (name = lsUserName) : (name = input.value)
  sectionText.innerHTML = `안녕하세요 ${name}!<br/>아래 보이는 입력창에 메모를 적어보세요`
  inputBox.setAttribute("onsubmit", "createMemo(event)")
  input.value = ""
  input.setAttribute("placeholder", "메모를 작성해보세요")
  input.focus()
}
const createMemo = e => {
  e.preventDefault()
  console.log(input.value)
  // fetch(`${BASE_URL}memo`)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     c()
  //   })
  //   .catch(err => {
  //     consone.error(err)
  //   })
}
