function formatDate(timestamp){
    //calculate the date
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`

}

function displayTemperature(response){
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".current-weather-descrip").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000)
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    document.querySelector("#icon").setAttribute("alt", `${response.data.weather[0].description}`)

}

function search(city){
    let apiKey = "0938aaea4eb798390f9b1df3fa43323f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature); 
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input")
    search(cityInputElement.value)
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York")