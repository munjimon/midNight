const changeTheme = e => {
  const fileName = e.target.classList[1]
  const newLink = document.getElementsByTagName("link").item(1)
  if (fileName === undefined) return false
  localStorage.setItem("theme", e)
  newLink.setAttribute("href", `/style/css/${fileName}.css`)
}

const toggleChanger = () =>
  document.querySelector(".theme").classList.toggle("theme--close")
