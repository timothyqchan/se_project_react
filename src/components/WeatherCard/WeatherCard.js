import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((weather) => {
    return weather.day === day && weather.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}° F</div>
      <img src={imageSrcUrl} alt={type} className="weather_image" />
    </section>
  );
};

export default WeatherCard;
