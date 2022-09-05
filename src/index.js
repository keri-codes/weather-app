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
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-day-temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let showLocation = document.querySelector("#city-name");
  showLocation.innerHTML = `${response.data.name}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let cityInput = document.querySelector("#city-name");
  cityInput.innerHTML = searchInput.value;
  let apiKey = "946b140ab52cb4ada4be919305c799e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", showCitySearch);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);
