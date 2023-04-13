var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")

// var dataEl = document.querySelector("#date")

var weatherIconEl = document.querySelector("#weather-icon")
var temperatureEl = document.querySelector("#temperature")
var windSpeedEl = document.querySelector("#wind")
var humidityEl = document.querySelector("#humidity")


document.getElementById("date").textContent = dayjs().format("(M/D/YYYY)") //Why not all the card title date?? //

searchButtonEl.addEventListener("click", function () {
    var searchValue = cityInputEl.value
    console.log(searchValue)

    getWeatherInfo(searchValue)
    getForecast(searchValue)
})




var apiKey = 'c36e92a6ba7d753715bfc90e32631c4e';

var getWeatherInfo = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl
    ).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {

                    console.log(data)

                    var temp = document.createElement("h5")
                    temp.textContent = data.main.temp
                    document.getElementById("temperature").append(temp)

                    var wind = document.createElement("h5")
                    wind.textContent = data.wind.speed
                    document.getElementById("wind").append(wind)

                    var humid = document.createElement("h5")
                    humid.textContent = data.main.humidity
                    document.getElementById("humidity").append(humid)

                    var cityName = document.createElement("h2")
                    cityName.textContent = data.name
                    document.getElementById("city").append(cityName)



                })
        }
    })
}

var getForecast = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    // iterate over the next five days
                    for (var i = 0; i < 5; i++) {
                        var forecast = data.list[i * 8]; // get the forecast for the day (8 forecasts per day)

                        // create the elements and add them to the DOM
                        var temp = document.createElement("p");
                        temp.textContent = forecast.main.temp;
                        document.querySelector(`.fiveDay-temp${i + 1}`).append(temp);

                        var humidity = document.createElement("p");
                        humidity.textContent = forecast.main.humidity;
                        document.querySelector(`.fiveDay-humid${i + 1}`).append(humidity);

                        var wind = document.createElement("p");
                        wind.textContent = forecast.wind.speed;
                        document.querySelector(`.fiveDay-wind${i + 1}`).append(wind);

                        var date = document.createElement("p");
                        date.textContent = forecast.dt_txt;
                        document.querySelector(`#date${i + 1}`).append(date);
                    }
                });
            }
        });
};
