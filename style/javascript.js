var cityInputEl = document.querySelector("#city-input")
var searchButtonEl = document.querySelector("#search-btn")

var cityEl = document.querySelector("#city")
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





var getWeatherInfo = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl
    ).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {

                    console.log(data)

                    // make variable which creates an html element
                    var temp = document.createElement("h5")
                    // assign a textcontent to that variable with data from api
                    temp.textContent = data.main.temp
                    //append variable with text to targeted html id
                    document.getElementById("temperature").append(temp)

                    var wind = document.createElement("h5")
                    wind.textContent = data.wind.speed
                    document.getElementById("wind").append(wind)

                    var humid = document.createElement("h5")
                    humid.textContent = data.main.humidity
                    document.getElementById("humidity").append(humid)



                })
        }
    })
}

var getForecast = function (searchValue) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl
    ).then(function (response) {
        if (response.ok) {
            response.json()
                .then(function (data) {
                    console.log(data)

                    // var wind = document.createElement("h6")
                    // wind.textContent = data.wind.speed
                    // document.getElementById("wind").append(wind)

                    // var wind = document.createElement("h6")
                    // wind.textContent = data.wind.speed
                    // document.getElementById("wind").append(wind)

                    // var wind = document.createElement("h6")
                    // wind.textContent = data.wind.speed
                    // document.getElementById("wind").append(wind)

                    //day 1
                    var temp1 = document.createElement("p")
                    temp1.textContent = data.list[4].main.temp
                    document.querySelector(".fiveDay-temp").append(temp1)

                    var humidity1 = document.createElement("p")
                    humidity1.textContent = data.list[4].main.humidity
                    document.querySelector(".fiveDay-humid").append(humidity1)

                    var wind1 = document.createElement("p")
                    wind1.textContent = data.list[4].wind.speed
                    document.querySelector(".fiveDay-wind").append(wind1)

                    //day2
                    var temp2 = document.createElement("p")
                    temp2.textContent = data.list[12].main.temp
                    document.querySelector(".fiveDay-temp2").append(temp2)

                    var humidity2 = document.createElement("p")
                    humidity2.textContent = data.list[12].main.humidity
                    document.querySelector(".fiveDay-humid2").append(humidity2)

                    var wind2 = document.createElement("p")
                    wind2.textContent = data.list[12].wind.speed
                    document.querySelector(".fiveDay-wind2").append(wind2)

                    //day 3
                    var temp3 = document.createElement("p")
                    temp3.textContent = data.list[20].main.temp
                    document.querySelector(".fiveDay-temp3").append(temp3)

                    var humidity3 = document.createElement("p")
                    humidity3.textContent = data.list[20].main.humidity
                    document.querySelector(".fiveDay-humid3").append(humidity3)

                    var wind3 = document.createElement("p")
                    wind3.textContent = data.list[20].wind.speed
                    document.querySelector(".fiveDay-wind3").append(wind3)
                    //Day 4
                    var temp4 = document.createElement("p")
                    temp4.textContent = data.list[28].main.temp
                    document.querySelector(".fiveDay-temp4").append(temp4)

                    var humidity4 = document.createElement("p")
                    humidity4.textContent = data.list[28].main.humidity
                    document.querySelector(".fiveDay-humid4").append(humidity4)

                    var wind4 = document.createElement("p")
                    wind4.textContent = data.list[28].wind.speed
                    document.querySelector(".fiveDay-wind4").append(wind4)

                    //Day 5
                    var temp5 = document.createElement("p")
                    temp5.textContent = data.list[12].main.temp
                    document.querySelector(".fiveDay-temp5").append(temp5)

                    var humidity5 = document.createElement("p")
                    humidity5.textContent = data.list[12].main.humidity
                    document.querySelector(".fiveDay-humid5").append(humidity5)

                    var wind5 = document.createElement("p")
                    wind5.textContent = data.list[12].wind.speed
                    document.querySelector(".fiveDay-wind5").append(wind5)


                    // }



                })
        }
    })
}


var apiKey = 'c36e92a6ba7d753715bfc90e32631c4e';
function buildURLFormInputs(cityInputEl) {
    if (cityInputEl) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${cityInputEl}&appid=${apiKey}`;
    } else {
        return "";
    }
}

// This function fetches the weather data for a given city and displays it
function getWeatherInfo(city) {
    // Get the URL for the given city
    var apiUrl = buildURLFormInputs(city);

    // Check if the URL is defined
    if (apiUrl) {
        // Fetch the data from the URL
        fetch(apiUrl).then(function (response) {
            // Check if the response is OK
            if (response.ok) {
                // Parse the JSON data from the response
                response.json().then(function (data) {
                    // Call the displayInfo function with the data and city parameters
                    displayInfo(data, city);
                });
            }
        });
    }
}
