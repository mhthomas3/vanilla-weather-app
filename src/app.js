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

function displayTemperature(response){
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".current-weather-descrip").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", `${response.data.weather[0].description}`);
    fahrenheitTemperature = response.data.main.temp;
    console.log(fahrenheitTemperature)
}


//function exists to call default city search, basically
function search(city){
    let apiKey = "0938aaea4eb798390f9b1df3fa43323f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature); 
}

//function to create API call when submitted via city search form
function createApiUrlFromForm(event){
    event.preventDefault();
    let apiKey = "0938aaea4eb798390f9b1df3fa43323f";
    let units = "imperial";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  };

//function to create API call when current location button is clicked
function createApiUrlFromPosition(position) {
    let apiKey = "0938aaea4eb798390f9b1df3fa43323f";
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
};

function displayfahrenheitTemp(event){
    event.preventDefault();
    temperature.innerHTML = Math.round(fahrenheitTemperature);
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
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
search("New York")