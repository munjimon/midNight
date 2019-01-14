const changeTheme = e => {
  let newTag = document.createElement("img")
  const fileName = e.target.classList[1]
  const thumbnail = document.querySelector(".changer").children[0]
  const newLink = document.getElementsByTagName("link").item(1)
  // Theme change(css)
  if (fileName === undefined) return false
  localStorage.setItem("theme", e)
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
}

const toggleChanger = () =>
  document.querySelector(".theme").classList.toggle("theme--close")

const changeThumbnail = (elName, fileName) => {
  elName.setAttribute("class", `theme-icon ${fileName}`)
  elName.setAttribute("src", `/img/icons/${fileName}.png`)
}
