const http = require("http")
const express = require("express")
const app = express()
const router = require("./router/main")(app)

/* 서버가 읽을 수 있도록 HTML 의 위치를 정의 */
app.set("views", __dirname + "/views")
/* 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정 */
app.set("view engine", "ejs")
app.engine("html", require("ejs").renderFile)

app.use(express.static(`${__dirname}/public`))

const server = app.listen(8000, () => {
  console.log("Server running!")
  console.log(__dirname)
})
