import "../App.css";
import humidityImg from "../assets/humidity.png";
import windImg from "../assets/wind-power.png";
export const WeatherDetail = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="images">
        <img src={icon} />
      </div>
      <div className="temperature">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="middle">
        <div>
          <span>Latitude </span>
          <span>{lat}</span>
        </div>
        <div>
          <span>Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="footer">
        <div className="humidity">
          <img src={humidityImg} />
          <h6>{humidity} %</h6>
          <p>Humidity</p>
        </div>
        <div className="humidity">
          <img src={windImg} />
          <h6>{wind} km/h</h6>
          <p>Wind Speed</p>
        </div>
      </div>
    </>
  );
};
