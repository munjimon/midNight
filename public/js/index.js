// element selector
const memoBox = document.querySelector(".memo")
const input = document.querySelector(".input")
const iconBox = document.querySelector(".icon-box")
// saved user information in localstorage
let lsUserId = localStorage.getItem("userId")
let lsUserName = localStorage.getItem("userName")

// if ) first visit
// (index)checkUser -> (api)adder , (index)setUser -> (index)changeSection

// if ) not first visit ( now status : logout )
// (index)checkUser -> (index)setUser -> (memo)loadMemo -> (index)changeSection

// if ) not first visit ( now status : login )
// localStorage check -> (memo)loadMemo -> (index)changeSection

// if page reload , logined user check
window.addEventListener("DOMContentLoaded", () => {
  askLocation()
  setInterval(renderTodayInfor, 1000)
  lsUserId !== null
    ? loadMemo(lsUserId)
    : iconBox.classList.toggle("icon-box--close", true)
})

const renderTodayInfor = () => {
  const date = new Date().toJSON()
  const clock = new Date().toTimeString()
  const Hours = clock.substr(0, 2)
  const dayArr = ["일", "월", "화", "수", "목", "금", "토"]
  document.querySelector(".date").innerText = `${date.substr(
    5,
    2
  )}월 ${date.substr(8, 2)}일 ${dayArr[new Date().getDay()]}요일`
  document.querySelector(".clock").innerText = `${
    Hours >= 12 ? "오후" : "오전"
  } ${Hours >= 12 ? `0${Hours - 12}` : Hours}${clock.substr(2, 6)}`
}

// section view change
const changeSection = memo => {
  let name = ""
  const sectionText = document.querySelector(".text")
  const inputBox = document.querySelector(".input-box")
  iconBox.classList.toggle("icon-box--close", false)
  if (memo !== undefined) renderLoadedMemo(memo)
  input.value === "" ? (name = lsUserName) : (name = textChanger(input.value))
  sectionText.innerHTML = `안녕하세요 ${name}!<br/>아래 보이는 입력창에 메모를 적어보세요`
  inputBox.setAttribute("onsubmit", "createMemo(event)")
  input.value = ""
  input.setAttribute("placeholder", "Let's Create Your Memo!")
  input.focus()
}

// input value blank check
const blankChecker = param =>
  param.replace(/\s/g, "") === "" || param === undefined || param === null
    ? true
    : false

// tag => string change
const textChanger = text => {
  text = text.replace(/</g, "&lt;")
  text = text.replace(/>/g, "&gt;")
  return text
}
// const askLocation = () => {
//   if (navigator.geolocation) {
//     // GPS를 지원하면
//     target = { lat: 0, lon: 0 }
//     // watchPosition -> if ) location update === 0 -> stop watchPosition
//     const id = navigator.geolocation.watchPosition(
//       position => {
//         console.log("hello")
//         const pos = position.coords
//         if (target.lat === pos.lat && target.lon === pos.lon) {
//           console.log("Congratulations, you reached the target")
//           navigator.geolocation.clearWatch(id)
//         }
//         getWeatherData(position.coords.latitude, position.coords.longitude)
//       },
//       error => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             // 사용자가 위치정보 사용을 허용하지 않았을 때
//             console.error("Location information not allowed")
//             break
//           case error.POSITION_UNAVAILABLE:
//             // 위치 정보 사용이 불가능할 때
//             console.error("Location information is not available")
//             break
//           case error.TIMEOUT:
//             // 위치 정보를 가져오려 시도했지만, 시간이 초과되었을 때
//             console.error("The load time has been exceeded")
//             break
//           case error.UNKNOWN_ERROR:
//             // 기타 알 수 없는 오류가 발생하였을 때
//             console.error("Other errors")
//             break
//         }
//       },
//       {
//         enableHighAccuracy: false,
//         maximumAge: 0,
//         timeout: Infinity
//       }
//     )
//   } else {
//     alert("GPS를 지원하지 않습니다")
//   }
// }
