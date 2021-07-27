let currentDateTime = document.querySelector("#currentDateTime");
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

currentDateTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}°C`;
  let tempHigh = document.querySelector("#expected-temp-high");
  tempHigh.innerHTML = `High: ${Math.round(response.data.main.temp_max)}℃`;
  let tempLow = document.querySelector("#expected-temp-low");
  tempLow.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}℃ `;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "2dbeacf318b1e5eddf5fe3c5f5ab5281";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(displayWeather);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = `${place}`;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°C`;
  let tempHigh = document.querySelector("#expected-temp-high");
  tempHigh.innerHTML = `High: ${Math.round(response.data.main.temp_max)}℃`;
  let tempLow = document.querySelector("#expected-temp-low");
  tempLow.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}℃`;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "2dbeacf318b1e5eddf5fe3c5f5ab5281";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
