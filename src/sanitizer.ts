import { ERROR_RESULT_IS_RECORD, ERROR_WEATHER_POINTS, ERROR_WEATHER_POINT, BUFFER_KEY_NUMBER, VALUE_WEATHER_CODE, INITIAL_TIME_REGEX, WEATHER_PRODUCT } from "./errors";
import { InitialTime, WeatherPoint, WeatherProduct, WeatherResponse, WeatherCode,
    weatherCodes,
    initialTimeRegex,
    weatherProducts
} from "./types";

// неизвестный нетривиальный объект наиболее разумно считать словарем
// из строковых ключей и неизвестных (еще) значений
const isRecord = (value: unknown): value is Record<string,unknown> => typeof value === 'object' && value !== null;
// неизвестный нетривиальный массив наиболее разумно считать
// состоящим из неизвестных значений
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

const getNumber = <T>(buffer:Record<string,unknown>, key: string&keyof T): number =>{
    const value = buffer[key];
    if(typeof value !== 'number'){
        throw new TypeError(`${BUFFER_KEY_NUMBER}, key: ${key}`);
    }
    return value;
};

const getWeatherCode = (value: unknown): WeatherCode=>{
    if(weatherCodes.every((e)=>e!==value)){
        throw new TypeError(`${VALUE_WEATHER_CODE}, [${value}]`);
    }
    return value as WeatherCode;
};

const getWeatherPointValue = (value: unknown): WeatherPoint=>{
    if(!isRecord(value)){
        throw new TypeError(`${ERROR_WEATHER_POINT}`);
    }
    return {
        temp2m: getNumber<WeatherPoint>(value, 'temp2m'),
        timepoint: getNumber<WeatherPoint>(value, 'timepoint'),
        weather: getWeatherCode(value.weather),
    };
}

const getWeatherPoint = (value: unknown, ix: number):WeatherPoint =>{
    try{
        return getWeatherPointValue(value);
    }
    catch(err){
        if(err instanceof TypeError){
            throw new TypeError(`at index: ${ix}: ${err.message}\r\n${err.stack}`);
        }
        throw err;
    }
};

const getArrayOfWeatherPoints = (value: unknown):WeatherPoint[]=>{
    if(!isArray(value)){
        throw new TypeError(ERROR_WEATHER_POINTS);
    }
    return value.map(getWeatherPoint);
}

const getStringOfDigits = (value: unknown):InitialTime =>{
    if(typeof value !== 'string' || !initialTimeRegex.test(value)){
        throw new TypeError(`${INITIAL_TIME_REGEX}, ${value}`);
    }
    return value as InitialTime;
};

const getProductName = (value: unknown): WeatherProduct=>{
    if(weatherProducts.every((e)=> e!== value)){
        throw new TypeError(`${WEATHER_PRODUCT} value: ${value}`);
    }
    return value as WeatherProduct;
};

export const adaptFromJson = (data:unknown):WeatherResponse =>{
    if(!isRecord(data)){
        throw new TypeError(ERROR_RESULT_IS_RECORD);
    }
    const {dataseries,init,product} = data;
    return {
        dataseries: getArrayOfWeatherPoints(dataseries),
        init: getStringOfDigits(init),
        product: getProductName(product),
    };
}
