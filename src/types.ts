// сервис доступен по адресу
export const ENDPOINT_BASE = 'http://www.7timer.info/bin/api.pl';
// названия продуктов взяты из описания
export const weatherProducts = ['astro', 'civil', 'civillight', 'meteo', 'two'] as const;
// формат результата взят из описания
export const weatherOutputs = ['json', 'xml'] as const;
// кодовое описание погоды дается
// в виде специальных строк
export const weatherCodes = [
    'clearday', 'clearnight'
    , 'pcloudyday', 'pcloudynight'
    , 'mcloudyday', 'mcloudynight'
    , 'cloudyday', 'cloudynight'
    , 'humidday', 'humidnight'
    , 'lightrainday', 'lightrainnight'
    , 'oshowerday', 'oshowernight'
    , 'ishowerday', 'ishowernight'
    , 'lightsnowday', 'lightsnownight'
    , 'rainday', 'rainnight'
    , 'snowday', 'snownight'
    , 'rainsnowday', 'rainsnownight'
] as const;

// точность координат - 3 знака после запятой (что-то около сотни метров)
export const NUMBER_FRAC = 3;

// мы используем тип - объединение специализированных
// строковых литералов для обозначения типа ожидаемых значений
export type WeatherProduct = typeof weatherProducts[number];
export type WeatherOutput = typeof weatherOutputs[number];
export type WeatherCode = typeof weatherCodes[number];

// мы выяснили, что значение в поле init содержит 10 цифр.
// ггггммддчч. тип данных - строка
// мы хотим отличать эту строку от других строк
// будем ее называть InitialTime
export type InitialTime = string & {'initial time':void};
export const initialTimeRegex = /\d{10}/;

// мы задумали использовать часть данных, из
// тех, что доступны. Мы описали их тип в виде
// контракта между нашим приложением и сервисом
// хотя сервис об этом и не знает
export interface WeatherPoint {
    timepoint: number;
    temp2m: number;
    weather: WeatherCode;

}
export interface WeatherResponse {
    product: WeatherProduct;
    init: InitialTime;
    dataseries: WeatherPoint[]
}

// мы задумали использовать только часть диапазона
// допустимых параметров. результат нам нужен
// в виде json
export interface WeatherQuery {
    product: WeatherProduct ;
    output: WeatherOutput & 'json';
    lon: number;
    lat: number;
}

