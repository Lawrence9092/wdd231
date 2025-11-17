const apiKey = "YOUR_API_KEY_HERE";
const city = "Harare";
const weatherTemp = document.getElementById("weather-temp");
const weatherDescription = document.getElementById("weather-description");
const forecastList = document.getElementById("forecast");

// CURRENT WEATHER
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  weatherTemp.textContent = `Current Temperature: ${data.main.temp.toFixed(1)}°C`;
  weatherDescription.textContent = `Conditions: ${data.weather[0].description}`;
}

// 3-DAY FORECAST
async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  forecastList.innerHTML = ""; // clear previous

  // Forecast values around 12:00 each day
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  daily.forEach(day => {
    const li = document.createElement("li");
    const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric"
    });

    li.textContent = `${date}: ${day.main.temp.toFixed(1)}°C`;
    forecastList.appendChild(li);
  });
}

getWeather();
getForecast();
