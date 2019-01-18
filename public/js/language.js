const languageApi = () => {
  const id = "TmgHjujgU2SdjACt8yqH"
  const secret = "_A6BVUGB3W"
  const query = "번역할 문장을 입력하세요"
  const url = "https://openapi.naver.com/v1/language/translate"
  // const options = {
  //   form: { source: "ko", target: "en", text: query },
  //   headers: { "X-Naver-Client-Id": id, "X-Naver-Client-Secret": secret }
  // }
  axios
    .post("http://localhost:8000/translate", { query: "안녕하세요" })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
}

const changeLanguage = countryCode => {
  console.log(countryCode)
  const target = document.querySelector(".welcome")
  getter(`language?name=${countryCode}`)
    .then(res => {
      localStorage.setItem("language", countryCode)
      fixedComment = res[0].contents
      target.innerHTML = `${fixedComment[0]}<br/>${fixedComment[1]}`
    })
    .catch(err => {
      console.error(err)
    })
}

const userChangeLanguage = countryCode => {
  console.log(countryCode)
  const sectionText = document.querySelector(".text")
  getter(`language?name=${countryCode}`)
    .then(res => {
      console.log(res)
      userInforUpdater({ id: lsUserId, language: countryCode })
      fixedComment = res[0].contents
      sectionText.innerHTML = `${fixedComment[2]} ${lsUserName}!<br/>${
        fixedComment[3]
      }`
    })
    .catch(err => {
      console.error(err)
    })
}

const toggleModal = toggleFlag => {
  const selector = "modal-background"
  toggleFlag
    ? document.querySelector(`.${selector}`).classList.add(`${selector}--open`)
    : document
        .querySelector(`.${selector}`)
        .classList.remove(`${selector}--open`)
}
