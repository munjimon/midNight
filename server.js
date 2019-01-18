const http = require("http")
const express = require("express")
const app = express()
const router = require("./router/main")(app)
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const client_id = "TmgHjujgU2SdjACt8yqH"
const client_secret = "_A6BVUGB3W"
app.post("/translate", (req, res) => {
  console.log(req.body.query)
  const api_url = "https://openapi.naver.com/v1/language/translate"
  const request = require("request")
  const options = {
    url: api_url,
    form: { source: "ko", target: "en", text: req.body.query },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret
    }
  }
  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      console.log(response)
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" })
      res.end(body)
    } else {
      res.status(response.statusCode).end()
      console.log("error = " + response.statusCode)
    }
  })
})

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
