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
import thunderstorm from "./icons/thunderstorm.png";

export default function App() {
  const [city, setCity] = useState(null);
  function chooseCity(e) {
    setCity(e.target.value);
  }
  const loadData = async () => {
    const cityData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},ua&appid=${process.env.REACT_APP_API_KEY}&units=metric`
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
  const weatherMap = {
    "broken clouds": broken_clouds,
    "clear sky": clear_sky,
    "few clouds": few_clouds,
    mist: mist,
    "light rain": rain,
    rain: rain,
    "scattered clouds": scattered_clouds,
    "shower rain": shower_rain,
    snow: snow,
    thunderstorm: thunderstorm,
  };

  function showWeather() {
    return (
      <>
        <p>
          Current weather: <b>{weather}</b>
        </p>
        <img src={weatherMap[weather]} alt={weather} width="50" height="50" />
      </>
    );
  }

  return (
    <>
      <div className="TopBar">
        <h1>Know your weather</h1>
      </div>
      <CityChoise chooseCity={chooseCity} city={city} getWeather={getWeather} />
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
      <div className="WeatherInfo">
        <PrimaryInfo
          airTemp={airTemp}
          humidity={humidity}
          pressure={pressure}
          showWeather={showWeather}
        />
        <SecondaryInfo
          tempMin={tempMin}
          tempMax={tempMax}
          sunrise={sunrise}
          sunset={sunset}
        />
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <div className="Footer">
      <span className="Copyrights">
        This application was created with Open Weather Map ©
      </span>
    </div>
  );
}

function CityChoise({ chooseCity, city, getWeather }) {
  return (
    <div className="City">
      <select className="CityList" onChange={(e) => chooseCity(e)}>
        <option hidden={city}>Choose your city</option>
        {cities.map((misto) => (
          <option className="Option" key={misto.id} value={misto.name}>
            {misto.name}
          </option>
        ))}
      </select>
      <button className="CityButton" onClick={getWeather}>
        Show Weather
      </button>
    </div>
  );
}

function PrimaryInfo({ airTemp, showWeather, humidity, pressure }) {
  return (
    <div className="PrimaryInfo">
      {airTemp === "Unknown" ? (
        <h3>There will be shown primary weather info</h3>
      ) : (
        <>
          {" "}
          <div>{showWeather()}</div>
          <p>
            Temperature: <b>{airTemp + "°C"}</b>
          </p>
        </>
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
    </div>
  );
}

function SecondaryInfo({ tempMin, tempMax, sunrise, sunset }) {
  return (
    <div className="SecondaryInfo">
      {tempMin === "Unknown" ? (
        <h3>There will be shown secondary weather info</h3>
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
    </div>
  );
}
