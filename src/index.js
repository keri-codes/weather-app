//Display the current day, month, date and time
let currentDate = document.querySelector("#current-date");
let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  const str = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${str}`;
  return formattedDate;
}

currentDate.innerHTML = formatDate(currentTime);

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "946b140ab52cb4ada4be919305c799e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector("#current-day-temperature");
  let showLocation = document.querySelector("#city-name");
  let cityTimezone = response.data.timezone;
  let sunrise = convertTime(response.data.sys.sunrise, cityTimezone);
  let sunset = convertTime(response.data.sys.sunset, cityTimezone);
  let dateSunrise = sunrise.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let dateSunset = sunset.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let iconElement = document.querySelector("#icon");

  currentTemperature.innerHTML = `${temperature}`;
  showLocation.innerHTML = `${response.data.name}`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#sunrise").innerHTML = dateSunrise;
  document.querySelector("#sunset").innerHTML = dateSunset;
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  realFeel = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function searchCity(city) {
  let apiKey = "946b140ab52cb4ada4be919305c799e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#current-day-temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemp);
  document.querySelector("#real-feel").innerHTML = Math.round(
    (realFeel * 9) / 5 + 32
  );
  document.querySelector("#real-unit").innerHTML = `°F`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-day-temperature");
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#real-feel").innerHTML = realFeel;
  document.querySelector("#real-unit").innerHTML = `°C`;
}

function convertTime(time, timezone) {
  let date = new Date(time * 1000);
  let localTime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let localizedTime = utc + timezone * 1000;
  let convertedTime = new Date(localizedTime);

  return convertedTime;
}

let celsiusTemperature = null;
let realFeel = null;

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Winchester");
