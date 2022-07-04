import "./App.css";
import axios from "axios";
import { useState } from "react";
import { cities } from "./cities.js";
import broken_clouds from "./icons/broken_clouds.png";
import clear_sky from "./icons/clear_sky.png";
import few_clouds from "./icons/few_clouds.png";
import mist from "./icons/mist.png";
import rain from "./icons/rain.png";
import scattered_clouds from "./icons/scattered_clouds.png";
import shower_rain from "./icons/shower_rain.png";
import snow from "./icons/snow.png";
import thundertorm from "./icons/thunderstorm.png";

export default function App() {
  const [city, setCity] = useState(null);
  const API_KEY = "4c8da435efebfb2bcf3b7d861165f3c9";
  function chooseCity(e) {
    setCity(e.target.value);
  }
  const loadData = async () => {
    const cityData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${API_KEY}&units=metric`
    );
    return cityData;
  };

  let currentDate = new Date();
  let today = currentDate.toLocaleDateString({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [airTemp, setAirTemp] = useState("Unknown");
  const [humidity, setHumidity] = useState("Unknown");
  const [pressure, setPressure] = useState("Unknown");
  const [tempMax, setTempMax] = useState("Unknown");
  const [tempMin, setTempMin] = useState("Unknown");
  const [sunrise, setSunrise] = useState("Unknown");
  const [sunset, setSunset] = useState("Unknown");
  const [weather, setWeather] = useState("Unknown");

  function getWeather() {
    loadData()
      .then((weather) => {
        let sunriseTime = new Date(weather.data.sys.sunrise * 1000);
        let sunsetTime = new Date(weather.data.sys.sunset * 1000);
        setAirTemp(weather.data.main.temp);
        setHumidity(weather.data.main.humidity);
        setPressure(weather.data.main.pressure);
        setTempMin(weather.data.main.temp_min);
        setTempMax(weather.data.main.temp_max);
        setSunrise(sunriseTime.getHours() + ":" + sunriseTime.getMinutes());
        setSunset(sunsetTime.getHours() + ":" + sunsetTime.getMinutes());
        setWeather(weather.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showWeather() {
    if (weather === "broken clouds") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img
              src={broken_clouds}
              alt="Broken clouds"
              width="50"
              height="50"
            />
          </p>
        </>
      );
    } else if (weather === "clear sky") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={clear_sky} alt="Clear sky" width="30" height="30" />
          </p>
        </>
      );
    } else if (weather === "few clouds") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={few_clouds} alt="Few clouds" width="50" height="50" />
          </p>
        </>
      );
    } else if (weather === "mist") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={mist} alt="mist" width="50" height="50" />
          </p>
        </>
      );
    } else if (weather === "rain") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={rain} alt="rain" width="50" height="50" />
          </p>
        </>
      );
    } else if (weather === "scattered clouds") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img
              src={scattered_clouds}
              alt="scattered_clouds"
              width="50"
              height="50"
            />
          </p>
        </>
      );
    } else if (weather === "shower rain") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={shower_rain} alt="Shower rain" width="50" height="50" />
          </p>
        </>
      );
    } else if (weather === "snow") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={snow} alt="snow" width="50" height="50" />
          </p>
        </>
      );
    } else if (weather === "thundertorm") {
      return (
        <>
          <p>
            Current weather: <b>{weather}</b>
            <img src={thundertorm} alt="thundertorm" width="50" height="50" />
          </p>
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <h1>Know your weather</h1>
      <select onChange={(e) => chooseCity(e)}>
        <option hidden={city}>Choose your city</option>
        {cities.map((misto) => (
          <option key={misto.id} value={misto.name}>
            {misto.name}
          </option>
        ))}
      </select>
      <button onClick={getWeather}>Show Weather</button>
      <WeatherInfo
        airTemp={airTemp}
        today={today}
        city={city}
        tempMin={tempMin}
        tempMax={tempMax}
        humidity={humidity}
        pressure={pressure}
        sunrise={sunrise}
        sunset={sunset}
        showWeather={showWeather}
      ></WeatherInfo>
    </>
  );
}

function WeatherInfo({
  airTemp,
  today,
  city,
  tempMin,
  tempMax,
  humidity,
  pressure,
  sunrise,
  sunset,
  showWeather,
}) {
  return (
    <>
      {airTemp === "Unknown" ? (
        <h2>
          Please choose your city and press "Show Weather" button to see
          forecast.
        </h2>
      ) : (
        <h2>
          Weather forecast for {today} in {city}
        </h2>
      )}
      {}
      {showWeather()}
      {airTemp === "Unknown" ? (
        ""
      ) : (
        <p>
          Temperature: <b>{airTemp + "°C"}</b>
        </p>
      )}
      {tempMin === "Unknown" ? (
        ""
      ) : (
        <p>
          Temperature minimum during the day: <b>{tempMin + "°C"}</b>
        </p>
      )}
      {tempMax === "Unknown" ? (
        ""
      ) : (
        <p>
          Temperature maximum during the day: <b>{tempMax + "°C"}</b>
        </p>
      )}
      {humidity === "Unknown" ? (
        ""
      ) : (
        <p>
          Humidity: <b>{humidity + "%"}</b>
        </p>
      )}
      {pressure === "Unknown" ? (
        ""
      ) : (
        <p>
          Pressure: <b>{pressure + " In."}</b>
        </p>
      )}
      {sunrise === "Unknown" ? (
        ""
      ) : (
        <p>
          Sunrise time: <b>{sunrise}</b>
        </p>
      )}
      {sunset === "Unknown" ? (
        ""
      ) : (
        <p>
          Sunset time: <b>{sunset}</b>
        </p>
      )}
    </>
  );
}
