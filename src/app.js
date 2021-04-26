function displayTemperature(response){
    console.log(response)
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".current-weather-descrip").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "0938aaea4eb798390f9b1df3fa43323f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=imperial`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);