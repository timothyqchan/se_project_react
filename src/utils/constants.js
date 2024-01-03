import clearDay from "../images/day/clear.svg";
import cloudyDay from "../images/day/cloudy.svg";
import rainDay from "../images/day/rain.svg";
import stormDay from "../images/day/storm.svg";
import snowDay from "../images/day/snow.svg";
import fogDay from "../images/day/fog.svg";
import clearNight from "../images/night/clear.svg";
import cloudyNight from "../images/night/cloudy.svg";
import rainNight from "../images/night/rain.svg";
import stormNight from "../images/night/storm.svg";
import snowNight from "../images/night/snow.svg";
import fogNight from "../images/night/fog.svg";

export const baseUrl = "http://localhost:3001/items";
export const defaultHeaders = { "Content-Type": "application/json" };

export const weatherOptions = [
  {
    url: clearDay,
    day: true,
    type: "clear",
  },
  {
    url: cloudyDay,
    day: true,
    type: "cloudy",
  },
  {
    url: rainDay,
    day: true,
    type: "rain",
  },
  {
    url: stormDay,
    day: true,
    type: "storm",
  },
  {
    url: snowDay,
    day: true,
    type: "snow",
  },
  { url: fogDay, day: true, type: "fog" },
  {
    url: clearNight,
    day: false,
    type: "clear",
  },
  {
    url: cloudyNight,
    day: false,
    type: "cloudy",
  },
  {
    url: rainNight,
    day: false,
    type: "rain",
  },
  {
    url: stormNight,
    day: false,
    type: "storm",
  },
  {
    url: snowNight,
    day: false,
    type: "snow",
  },
  {
    url: fogNight,
    day: false,
    type: "fog",
  },
];
