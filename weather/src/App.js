import "./App.css";
import axios from "axios";
import { useState } from "react";
import { cities as cities } from "./cities.js";

export default function App() {
  const [city, setCity] = useState("Kyiv");
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

  const [airTemp, setAirTemp] = useState("Unknown");
  const [humidity, setHumidity] = useState("Unknown");
  const [pressure, setPressure] = useState("Unknown");
  const [tempMax, setTempMax] = useState("Unknown");
  const [tempMin, setTempMin] = useState("Unknown");

  return (
    <>
      <select onChange={(e) => chooseCity(e)}>
        {cities.map((misto) => (
          <option key={misto.id} value={misto.name}>
            {misto.name}
          </option>
        ))}
      </select>
      <button
        onClick={() =>
          loadData()
            .then((weather) => {
              let sunriseTime = new Date(weather.data.sys.sunrise);
              let sunsetTime = new Date(weather.data.sys.sunset);
              setAirTemp(weather.data.main.temp);
              setHumidity(weather.data.main.humidity);
              setPressure(weather.data.main.pressure);
              setTempMax(weather.data.main.temp_max);
              setTempMin(weather.data.main.temp_min);
            })
            .catch((error) => {
              console.log(error);
            })
        }
      >
        Show Weather
      </button>
    </>
  );
}
