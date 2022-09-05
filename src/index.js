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

//searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function showCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityInput = document.querySelector("#city-name");
  cityInput.innerHTML = searchInput.value;
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", showCitySearch);

//convert the temperature to Farenheit when clicked.
function convertToFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = document.querySelector("#current-day-temperature");
  farenheitTemperature.innerHTML = 99;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);

//convert the temperature to Farenheit when clicked.
function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelector("#current-day-temperature");
  celsiusTemperature.innerHTML = 45;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
