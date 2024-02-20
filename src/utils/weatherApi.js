import processServerResponse from "./processServerResponse";

const latitude = 40.749268;
const longitude = -73.640686;
const APIkey = "feb4c18ca4cffb957bfa4ba9d695abed";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeather = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weatherTemp = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  return weatherTemp;
};

export const parseWeatherCity = (data) => {
  const city = data.name;
  console.log(city);
  return city;
};
