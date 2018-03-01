const API_URL =
  'http://api.openweathermap.org/data/2.5/weather?appid=849338767c0e95025b5559533d26b7c4';

export const fetchWeatherData = (lat, lon) => {
  const url = API_URL + `&lat=${lat}&lon=${lon}&units=metric`;

  return fetch(url)
    .then(res => res.json())
    .then(json => ({
      temp: json.main.temp,
      weather: json.weather[0].main,
      humidity: json.main.humidity
    }));
};
