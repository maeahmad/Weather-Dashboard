var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")
var cityList_value = document.getElementById("#cityList")
var searchValue = cityInputEl.value
var pastCity = JSON.parse(localStorage.getItem("City")) || []

document.getElementById("date").textContent = dayjs().format("(M/D/YYYY)")

searchButtonEl.addEventListener("click", function () {
    var searchValue = cityInputEl.value
    console.log(searchValue)

    getWeatherInfo(searchValue)
    getForecast(searchValue)
})


$(function (storedCity) {
    $("#search-btn").on("click", function () {
        var searchValue = cityInputEl.value
        pastCity.push(searchValue)
        localStorage.setItem("City", JSON.stringify(pastCity))
        var historyButton = document.createElement("button")
        historyButton.textContent = searchValue
        document.querySelector("#cityList").append(historyButton)
    })

    $("#city-input").val(localStorage.getItem("#cityList"))
});



function loadCities() {
    const storedCities = JSON.parse(localStorage.getItem('City')) || []
    if (storedCities) {
        for (var i = 0; i < storedCities.length; i++) {
            var historyButton = document.createElement("button")
            historyButton.textContent = storedCities[i]
            document.querySelector("#cityList").append(historyButton);
        }
    }
}
loadCities()




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
                    document.getElementById("temperature").innerHTML = "";
                    temp.textContent = data.main.temp
                    document.getElementById("temperature").append(temp)

                    var wind = document.createElement("h5")
                    document.getElementById("wind").innerHTML = "";
                    wind.textContent = data.wind.speed
                    document.getElementById("wind").append(wind)

                    var humid = document.createElement("h5")
                    document.getElementById("humidity").innerHTML = "";
                    humid.textContent = data.main.humidity
                    document.getElementById("humidity").append(humid)

                    var cityName = document.createElement("h2")
                    document.getElementById("city").innerHTML = "";
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


                    for (var i = 0; i < 5; i++) {
                        var forecast = data.list[i * 8];

                        var temp = document.createElement("p");
                        document.querySelector(`.fiveDay-temp${i + 1}`).innerHTML = "";
                        temp.textContent = forecast.main.temp;
                        document.querySelector(`.fiveDay-temp${i + 1}`).append(temp);

                        var humidity = document.createElement("p");
                        document.querySelector(`.fiveDay-humid${i + 1}`).innerHTML = "";
                        humidity.textContent = forecast.main.humidity;
                        document.querySelector(`.fiveDay-humid${i + 1}`).append(humidity);

                        var wind = document.createElement("p");
                        document.querySelector(`.fiveDay-wind${i + 1}`).innerHTML = "";
                        wind.textContent = forecast.wind.speed;
                        document.querySelector(`.fiveDay-wind${i + 1}`).append(wind);

                        var date = document.createElement("p");
                        document.querySelector(`#date${i + 1}`).innerHTML = "";
                        date.textContent = forecast.dt_txt;
                        document.querySelector(`#date${i + 1}`).append(date);
                    }
                });
            }
        });
};

