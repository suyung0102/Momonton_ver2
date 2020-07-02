const API_KEY = "ce1e4c0dcaa803e3359f6ac47150e719";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".js-weather .weather__text");

function getWeather(coords) {
    fetch(`${WEATHER_API}lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`).then(response => response.json()).then(json => {
        const name = json.name;
        const temperature = json.main.temp;
        weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
    });
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coords = {
        lat,
        lng
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    getWeather(coords);
}

function handleGeoFailure() {
    console.log("no location");
}

function loadWeather() {
    const currentCoords = localStorage.getItem("coords");
    if (currentCoords !== null) {
        const parsedCoords = JSON.parse(currentCoords);
        getWeather(parsedCoords);
        return;
    } else {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailure);
    }
}

function init() {
    loadWeather();
}

init();