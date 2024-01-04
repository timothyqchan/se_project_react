// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
import { checkServerResponse, makeServerRequest } from "./api";

const latitude = "44.34";
const longitude = "10.99";
const APIkey = "1426d0f2976316a8c647a35db05cfe64";

export const getForcastWeather = () => {
  return makeServerRequest(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: `${Math.round(temperature)}`,
      C: `${Math.round(((temperature - 32) * 5) / 9)}`,
    },
  };
  return weather;
};

export const parseLocationData = (data) => {
  const name = data.name;
  return name;
};
