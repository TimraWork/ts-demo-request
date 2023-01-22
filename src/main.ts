import { loadWeatherForecast } from "./request";
import { WeatherResponse } from "./types";

const example = {
    product: 'civil',
    lat: 37.610,
    lon: 55.750,
    output: 'json'
} as const;

const outputToBody = (forecast: WeatherResponse) => {
    const pre = document.createElement('pre');
    const json = JSON.stringify(forecast, null, ' ');
    pre.innerText = json;
    document.body.appendChild(pre);
};

loadWeatherForecast(example)
    .then((forecast) => outputToBody(forecast))
    .catch((err) => window.console.log(err));