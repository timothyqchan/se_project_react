import "./WeatherCard.css";

const weatherOptions = [
  { url: "/images/day/clear.svg", day: true, type: "clear" },
  { url: "/images/day/cloudy.svg", day: true, type: "cloudy" },
  { url: "/images/day/rain.svg", day: true, type: "rain" },
  { url: "/images/day/storm.svg", day: true, type: "storm" },
  { url: "/images/day/snow.svg", day: true, type: "snow" },
  { url: "/images/day/fog.svg", day: true, type: "fog" },
  { url: "/images/night/clear.svg", day: false, type: "clear" },
  { url: "/images/night/cloudy.svg", day: false, type: "cloudy" },
  { url: "/images/night/rain.svg", day: false, type: "rain" },
  { url: "/images/night/storm.svg", day: false, type: "storm" },
  { url: "/images/night/snow.svg", day: false, type: "snow" },
  { url: "/images/night/fog.svg", day: false, type: "fog" },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((weather) => {
    return weather.day === day && weather.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}</div>
      <img src={imageSrcUrl} alt="#" className="weather_image" />
    </section>
  );
};

export default WeatherCard;
