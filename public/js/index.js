// element selector
const memoBox = document.querySelector(".memo-box")
const input = document.querySelector(".input")
// saved user information in localstorage
let lsUserId = localStorage.getItem("userId")
let lsUserName = localStorage.getItem("userName")
// API URL
const BASE_URL = "http://localhost:3001/"
// API header
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

// if ) first visit
// checkUser -> adder , setUser -> changeSection

// if ) not first visit ( now status : logout )
// checkUser -> setUser -> loadMemo -> changeSection

// if ) not first visit ( now status : login )
// localStorage check -> loadMemo -> changeSection

//////////////////
/* CHECK METHOD */
//////////////////

// if page reload , logined user check
window.addEventListener("DOMContentLoaded", () => {
  setInterval(renderTodayInfor, 1000)
  if (lsUserId !== null) loadMemo(lsUserId)
})

const renderTodayInfor = () => {
  const date = new Date().toJSON()
  const clock = new Date().toTimeString()
  const Hours = clock.substr(0, 2)
  const dayArr = ["일", "월", "화", "수", "목", "금", "토"]
  document.querySelector(".date").innerText = `
    ${date.substr(5, 2)}월 ${date.substr(8, 2)}일 ${
    dayArr[new Date().getDay()]
  }요일`
  document.querySelector(".clock").innerText = `${
    Hours >= 12 ? "오후" : "오전"
  } ${Hours >= 12 ? `0${Hours - 12}` : Hours}${clock.substr(2, 6)}`
}

// Check registered users
const checkUser = e => {
  e.preventDefault()
  if (textChecker(input.value)) {
    alert("공백은 사용 불가능합니다")
    input.value = ""
    return false
  } else {
    const changedName = textChanger(input.value)
    getter(`user?name=${changedName}`).then(res => {
      if (res.length !== 0) {
        setUser({ id: res[0].id, name: res[0].name })
        loadMemo(res[0].id)
      } else {
        adder({ path: "user", name: changedName }).then(res => {
          setUser({ id: res.id, name: res.name })
          changeSection()
        })
      }
    })
  }
}

////////////////
/* API ACTION */
////////////////

// get data(user,memo) from server
const getter = path => {
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
    body:
      payload.name !== undefined
        ? JSON.stringify({ name: payload.name })
        : JSON.stringify({ title: payload.title, userId: payload.userId })
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      consone.error(err)
    })
}

// delete data(memo) to server
const deleter = id => {
  return fetch(`${BASE_URL}memo/${id}`, {
    headers: headers,
    method: "DELETE"
  })
    .then()
    .catch(err => console.error(err))
}

/////////////////
/* MEMO ACTION */
/////////////////

// load All memo of selected user
const loadMemo = userId => {
  getter(`memo?userId=${userId}`).then(res => {
    res.length > 0 ? changeSection(res) : changeSection()
  })
}

// after last child of contentBox memo Data rendering
const renderLoadedMemo = memo => {
  memoBox.classList.toggle("memo-box--close", false)
  memo.map(memo => makeMemoElement(memo))
}

// create memo
const createMemo = e => {
  e.preventDefault()
  if (textChecker(input.value)) {
    alert("공백은 사용 불가능합니다")
    input.value = ""
    return false
  } else {
    adder({
      path: "memo",
      title: textChanger(input.value),
      userId: lsUserId
    }).then(res => {
      memoBox.classList.toggle("memo-box--close", false)
      makeMemoElement(res)
    })
    input.value = ""
  }
}

/* memo element return */
const makeMemoElement = memo => {
  return memoBox.insertAdjacentHTML(
    "afterbegin",
    `<li class="memo text"><span class="memo-title">${
      memo.title
    }</span><i class="fas fa-backspace" onclick="deleteMemo(${memo.id},'${
      memo.title
    }')"></i></li>`
  )
}

/* delete memo */
const deleteMemo = (id, title) => {
  const memos = [...memoBox.children]
  const idx = memos.findIndex(val => val.textContent === title)
  deleter(id).then(() => {
    memoBox.children[idx].remove()
    if (memoBox.childElementCount === 0) {
      memoBox.classList.toggle("memo-box--close", true)
    }
  })
}

////////////
/* Etc... */
////////////

// set user information in localstorage
const setUser = infor => {
  localStorage.setItem("userId", infor.id)
  localStorage.setItem("userName", infor.name)
  lsUserId = localStorage.getItem("userId")
  lsUserName = localStorage.getItem("userName")
}

// section view change
const changeSection = memo => {
  let name = ""
  const sectionText = document.querySelector(".text")
  const inputBox = document.querySelector(".input-box")
  if (memo !== undefined) renderLoadedMemo(memo)
  input.value === "" ? (name = lsUserName) : (name = textChanger(input.value))
  sectionText.innerHTML = `안녕하세요 ${name}!<br/>아래 보이는 입력창에 메모를 적어보세요`
  inputBox.setAttribute("onsubmit", "createMemo(event)")
  input.value = ""
  input.setAttribute("placeholder", "Let's Create Your Memo!")
  input.focus()
}

const textChecker = text =>
  text.replace(/\s/g, "") === "" || text === undefined || text === null
    ? true
    : false

const textChanger = text => {
  text = text.replace(/</g, "&lt;")
  text = text.replace(/>/g, "&gt;")
  return text
}
