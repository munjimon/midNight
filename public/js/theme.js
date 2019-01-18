const changeTheme = e => {
  let newTag = document.createElement("img")
  const fileName = e.target.classList[1]
  const thumbnail = document.querySelector(".changer").children[0]
  const newLink = document.getElementsByTagName("link").item(1)
  // Theme change(css)
  if (fileName === undefined) return false
  localStorage.setItem("theme", fileName)
  newLink.setAttribute("href", `/style/css/${fileName}.css`)
  // thumbnail change(icon)
  if (thumbnail.localName === "i") {
    changeThumbnail(newTag, fileName)
    thumbnail.parentNode.replaceChild(newTag, thumbnail)
  } else {
    changeThumbnail(thumbnail, fileName)
  }
  // selected theme icon in iconList element delete -> change to thumbnail
  const icons = document.querySelector(".theme").children
  for (let i = 0; i < icons.length; i++) {
    icons[i].children[0].classList[1] === fileName
      ? icons[i].classList.add("theme-item--close")
      : icons[i].classList.remove("theme-item--close")
  }
  // if ) logined user exist , saved theme update
  if (lsUserName !== null) {
    userInforUpdater({ id: lsUserId, theme: fileName })
  }
}

// theme dropdown
const toggleChanger = () =>
  document.querySelector(".theme").classList.toggle("theme--close")

// thumbnail image change & css theme change
const changeThumbnail = (elName, fileName) => {
  elName.setAttribute("class", `theme-icon ${fileName}`)
  elName.setAttribute("src", `/img/icons/${fileName}.png`)
}

// saved theme load
const loadTheme = userTheme => {
  let savedTheme = null
  const newLink = document.getElementsByTagName("link").item(1)
  userTheme === undefined
    ? (savedTheme = localStorage.getItem("theme"))
    : (savedTheme = userTheme)
  if (savedTheme !== null) {
    newLink.setAttribute("href", `/style/css/${savedTheme}.css`)
  } else {
    newLink.setAttribute("href", `/style/css/default.css`)
    localStorage.setItem("theme", "default")
  }
}
