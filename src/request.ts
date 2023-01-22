import { adaptFromJson } from "./sanitizer";
import { NUMBER_FRAC, WeatherQuery, ENDPOINT_BASE, WeatherResponse } from "./types"

const getWeatherPrecision = (value: number) => value.toFixed(NUMBER_FRAC);

const getFormatted = (query: WeatherQuery): Record<string, string> => {
    const { lat, lon, output, product } = query;
    return {
        output,
        product,
        lat: getWeatherPrecision(lat),
        lon: getWeatherPrecision(lon),
    };
};

// поручим специальной функции преобразование значение из структуры
// в строку для запроса.
export const getUrl = (query: WeatherQuery): string => {
    const anchor = document.createElement('a');
    anchor.href = ENDPOINT_BASE;
    anchor.search = new URLSearchParams(getFormatted(query)).toString();
    return anchor.href;
};

export const loadWeatherForecast = async (query: Readonly<WeatherQuery>): Promise<WeatherResponse> => {
    const response = await fetch(getUrl(query));
    if(response.ok){
        return adaptFromJson(await response.json());
    }
    throw new Error(`response not ok: ${response.status} - ${response.statusText}`);