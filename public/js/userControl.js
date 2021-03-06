// Check registered users
const checkUser = e => {
  e.preventDefault()
  if (blankChecker(input.value)) {
    alert("공백은 사용 불가능합니다")
    input.value = ""
    return false
  } else {
    const changedName = textChanger(input.value)
    getter(`user?name=${changedName}`).then(res => {
      if (res.length !== 0) {
        setUser({ id: res[0].id, name: res[0].name })
        loadMemo(res[0].id)
        loadTheme(res[0].theme)
        userChangeLanguage(res[0].language)
        localStorage.setItem("userCountryCode", res[0].language)
      } else {
        adder({
          path: "user",
          name: changedName,
          theme: "default",
          language: "ko"
        }).then(res => {
          setUser({ id: res.id, name: res.name })
          changeSection()
        })
      }
    })
  }
}
// set user information in localstorage
const setUser = infor => {
  localStorage.setItem("userId", infor.id)
  localStorage.setItem("userName", infor.name)
  lsUserId = localStorage.getItem("userId")
  lsUserName = localStorage.getItem("userName")
}

const changeUser = () => {
  const removeAttr = ["theme", "userId", "userName"]
  for (let key in localStorage) {
    for (let i = 0; i < removeAttr.length; i++)
      if (removeAttr[i] === key) {
        localStorage.removeItem(key)
      }
  }
  console.log(localStorage)
}
