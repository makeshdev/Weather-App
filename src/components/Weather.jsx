import { useEffect, useState } from "react";
import { WeatherDetail } from "./WeatherDetail";
// Images
import SearchIcon from "../assets/search.png";
import rain from "../assets/rain.png";
import snowy from "../assets/snowy.png";
import sun from "../assets/sun.png";
import sky from "../assets/clear-sky.png";
import clouds from "../assets/clouds.png";

export const Weather = () => {
  let api_key = "ae0bbeb4732caa730369970d35f8a90d";

  const [text, setText] = useState("Chennai");
  const [img, setImg] = useState(sun);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [notFound, setnotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIcon = {
    "01d": sun,
    "01n": sun,
    "02d": sky,
    "02n": sky,
    "03d": clouds,
    "03n": clouds,
    "04d": clouds,
    "04n": clouds,
    "09d": rain,
    "09n": rain,
    "010d": rain,
    "010n": rain,
    "013d": snowy,
    "013n": snowy,
  };

  const temperature = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      setLoading(true);
      let res = await fetch(url);
      let data = await res.json();
      // console.log("data", data);
      if (data.cod === "404") {
        console.error("City Not Found");
        setnotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setCity(data.name);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      setTemp(Math.floor(data.main.temp));
      setWind(data.wind.speed);
      setCountry(data.sys.country);
      const weatherCode = data.weather[0].icon;
      setImg(weatherIcon[weatherCode] || sun);
      setnotFound(false);
    } catch (error) {
      console.error("Somthing went to wrong", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => {
    setText(e.target.value);
  };
  const clickHere = (e) => {
    if (e.key === "Enter") {
      temperature();
    }
  };

  useEffect(() => {
    temperature();
  }, []);
  return (
    <>
      <div className="container">
        <div className="search__Input">
          <input
            type="search"
            placeholder="Search Here..."
            onChange={handleClick}
            value={text}
            onKeyDown={clickHere}
          />
          <img src={SearchIcon} onClick={() => temperature()} />
        </div>
        {!loading && !notFound && (
          <WeatherDetail
            icon={img}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            log={log}
            humidity={humidity}
            wind={wind}
          />
        )}
        {loading && <p className="text_sty">Loading...</p>}
        {notFound && <p className="text_sty">City Not Found...</p>}
        <p className="copyrights">Designed by Makesh</p>
      </div>
    </>
  );
};
