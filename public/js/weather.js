const askLocation = () => {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      position => {
        getWeatherData(position.coords.latitude, position.coords.longitude)
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // 사용자가 위치정보 사용을 허용하지 않았을 때
            console.error("Location information not allowed")
            break
          case error.POSITION_UNAVAILABLE:
            // 위치 정보 사용이 불가능할 때
            console.error("Location information is not available")
            break
          case error.TIMEOUT:
            // 위치 정보를 가져오려 시도했지만, 시간이 초과되었을 때
            console.error("The load time has been exceeded")
            break
          case error.UNKNOWN_ERROR:
            // 기타 알 수 없는 오류가 발생하였을 때
            console.error("Other errors")
            break
        }
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      }
    )
  } else {
    alert("GPS를 지원하지 않습니다")
  }
}

const getWeatherData = (lat, lon) => {
  const weatherApiKey = "b5f494c86bb662ac06dd1000efa239cd"
  const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
  axios
    .get(weatherApiUrl)
    .then(res => {
      const resp = res.data
      //   console.log(resp)
      //   console.log("현재온도 : " + (resp.main.temp - 273.15))
      //   console.log("현재습도 : " + resp.main.humidity)
      //   console.log("날씨 : " + resp.weather[0].main)
      //   console.log("상세날씨설명 : " + resp.weather[0].description)
      //   console.log("날씨 이미지 : " + resp.weather[0].icon)
      //   console.log("바람   : " + resp.wind.speed)
      //   console.log("나라   : " + resp.sys.country)
      //   console.log("도시이름  : " + resp.name)
      //   console.log("구름  : " + resp.clouds.all + "%")
      document
        .querySelector(".wi")
        .classList.add(`wi-owm-${resp.weather[0].id}`)
      document.querySelector(".temperature").innerHTML = `
          ${Math.floor(resp.main.temp - 273.15)}°
          `
      document.querySelector(".now-country").innerHTML = `
          ${convert(resp.sys.country, "KR")}
          <i onclick='toggleModal(true)' class="fas fa-globe-asia"></i>
        `
    })
    .catch(err => {
      console.error(err)
    })
}

const convert = (...params) => {
  const lang = params.length > 1 && !blankChecker(params[1]) ? params[1] : "KR"
  const countryCode = params[0]
  let index
  if (lang === "KR") index = 0
  else if (lang === "EN") index = 1
  else {
    console.error("Support Language: KR, EN")
    return undefined
  }
  return list[countryCode][index]
}
