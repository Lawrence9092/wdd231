const apiKey = "0c130004afc989ada1970b65328e9d3c";
const city = "Harare";
const weatherTemp = document.getElementById("weather-temp");
const weatherDescription = document.getElementById("weather-description");
const forecastList = document.getElementById("forecast");

// CURRENT WEATHER
async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    weatherTemp.textContent = `Current Temperature: ${data.main.temp.toFixed(1)}°C`;
    weatherDescription.textContent = `Conditions: ${data.weather[0].description}`;
  } catch (error) {
    weatherTemp.textContent = "Unable to load weather data.";
    weatherDescription.textContent = "";
  }
}

// 3-DAY FORECAST
async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    forecastList.innerHTML = ""; // Clear existing items

    // Get forecast around 12:00 noon for the next 3 days
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

    daily.forEach(day => {
      const li = document.createElement("li");

      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
      });

      const temp = day.main.temp.toFixed(1);

      li.textContent = `${date}: ${temp}°C`;
      forecastList.appendChild(li);
    });

  } catch (error) {
    forecastList.innerHTML = "<li>Unable to load forecast.</li>";
  }
}

// Run functions
getWeather();
getForecast();
