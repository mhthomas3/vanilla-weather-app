function formatDate(timestamp){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    } else if (hours > 12) {
        hours = `${hours%12}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`

}

function formatDay(timestamp){
    let date = new Date(timestamp*1000);
    let day = date.getDay()
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[day];
}

function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class = "row">`;

    forecast.forEach(function(forecastDay, index){
    if (index<6){
    forecastHTML = forecastHTML + `
        <div class="col-2"> 
            <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
            <img src= "src/Icon SVGs/${forecastDay.weather[0].icon}.svg" alt="" width="36">
            </br>
            <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}</span> <span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}</span>
        </div>`
    ;
    }});


    forecastHTML = forecastHTML + "</div>";
    forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates){
    let apiKey = "8241f45cf931c43fccdbeeaa5f496f97";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){
    console.log(response)
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".current-weather-descrip").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("alt", `${response.data.weather[0].description}`);
    let svgName =response.data.weather[0].icon
    document.querySelector("#icon").setAttribute("src", `src/Icon SVGs/${svgName}.svg`)
    fahrenheitTemperature = response.data.main.temp;
    let dayOrNight = svgName.charAt(2);
    let weatherAppWrapper = document.querySelector("#weather-app-wrapper");
    let weatherApp = document.querySelector("#weather-app")
    if (dayOrNight === "n") {
        weatherAppWrapper.setAttribute("class", "weather-app-wrapper-night")
        weatherApp.setAttribute("class", "weather-app-night")
    } else if (dayOrNight === "d") { 
        weatherAppWrapper.setAttribute("class", "weather-app-wrapper-day")
        weatherApp.setAttribute("class", "weather-app-day")
    }
    getForecast(response.data.coord);
}


//function exists to call default city search, basically
function search(city){
    let apiKey = "8241f45cf931c43fccdbeeaa5f496f97";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature); 
}

//function to create API call when submitted via city search form
function createApiUrlFromForm(event){
    event.preventDefault();
    let apiKey = "8241f45cf931c43fccdbeeaa5f496f97";
    let units = "imperial";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  };

//function to create API call when current location button is clicked
function createApiUrlFromPosition(position) {
    //clearing out last entered city from search box
    document.querySelector("#city-input").value = "";
    let apiKey = "8241f45cf931c43fccdbeeaa5f496f97";
    let units = "imperial";
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  };

//Unit conversion functions
function displayCelsiusTemp(event){
    event.preventDefault();
    let celsiusTemperature = ((fahrenheitTemperature-32)*(5/9));
    temperature.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let forecastMax = document.querySelectorAll(".forecast-temp-max")
    forecastMax.forEach(function(temp){
        temp.innerHTML = Math.round((temp.innerHTML - 32) * (5/9));
    }) ;
    let forecastMin = document.querySelectorAll(".forecast-temp-min")
    forecastMin.forEach(function(temp){
        temp.innerHTML = Math.round((temp.innerHTML - 32) * (5/9));
    }) ;
};

function displayfahrenheitTemp(event){
    event.preventDefault();
    temperature.innerHTML = Math.round(fahrenheitTemperature);
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let forecastMax = document.querySelectorAll(".forecast-temp-max")
    forecastMax.forEach(function(temp){
        temp.innerHTML = Math.round((temp.innerHTML*(9/5)) + 32 );
    });
    let forecastMin = document.querySelectorAll(".forecast-temp-min")
    forecastMin.forEach(function(temp){
        temp.innerHTML = Math.round((temp.innerHTML*(9/5)) + 32 );
    }) ;
};

//function to get user's current position and call API key creation function when current position button is clicked
function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(createApiUrlFromPosition);
  };

//submiting location from form event listener and function call
let form = document.querySelector("#search-form");
let searchButton = document.querySelector(".search-button");
form.addEventListener("submit", createApiUrlFromForm);
searchButton.addEventListener("click", createApiUrlFromForm);

//submiting location using current location button event listener and function call
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

//unit conversion event listeners and function calls
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemp);

let fahrenheitTemperature = null;


//default function call
search("New York");


