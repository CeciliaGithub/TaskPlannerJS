//clock function
startTime();
// Set appId
const appId = "e859087dd9b104fe708d0f632e8e4b21";

// getDataForCity function that fetches weather info from openweathermap api
const getDataForCity = (city) =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // get the data we need for our html from the response
      const name = data.name;
      const emoji = emojis[data.weather[0].icon];
      const temp = Math.round(data.main.temp);
      const feelsLike = Math.round(data.main.feels_like);
      const description = data.weather[0].description;

      // create the card html
      const cardHtml = createCardHtml(
        name,
        emoji,
        temp,
        feelsLike,
        description
      );

      // render!
      weatherContainer.innerHTML = cardHtml;
    })
    .catch((error) => {

      weatherContainer.innerHTML = "City not found";
      // weatherContainer.innerHTML = `<em>Server returned error: "${error.message}".</em>`;
    });

// createCardHtml function used to render the weather info
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
  
    <p> ${name} ${emoji}  ${temp}&#8451 <br> feels like ${feelsLike}&#8451</p>
   `;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
  "01d": "☀️",
  "02d": "⛅️",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "⛈",
  "13d": "❄️",
  "50d": "💨",
  "01n": "☀️",
  "02n": "⛅️",
  "03n": "☁️",
  "04n": "☁️",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "⛈",
  "13n": "❄️",
  "50n": "💨",
};

// selecting all the things needed
const goButton = document.querySelector("#go-button");
const cityInput = document.querySelector("#city-input");
const weatherContainer = document.querySelector("#weather-container");

// event listener for a click event on the "Go!" button
goButton.addEventListener("click", (e) => {
  // get the city from the input field
  const city = cityInput.value;
  // alert();
  // get the weather data for the city
  getDataForCity(city);

});

function startTime() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  ap = hr < 12 ? "AM" : "PM";
  hr = hr == 0 ? 12 : hr;
  hr = hr > 12 ? hr - 12 : hr;
  //Add a zero in front of numbers<10
  hr = checkTime(hr);
  min = checkTime(min);
  sec = checkTime(sec);
  document.getElementById("clock").innerHTML =
    hr + ":" + min + ":" + sec + " " + ap;

  var months = [
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
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;

  var time = setTimeout(function () {
    startTime();
  }, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}




