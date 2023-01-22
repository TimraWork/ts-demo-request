import { ERROR_RESULT_IS_RECORD, ERROR_WEATHER_POINTS } from "./errors";
import { InitialTime, WeatherPoint, WeatherProduct, WeatherResponse } from "./types";

// неизвестный нетривиальный объект наиболее разумно считать словарем
// из строковых ключей и неизвестных (еще) значений
const isRecord = (value: unknown): value is Record<string,unknown> => typeof value === 'object' && value !== null;
// неизвестный нетривиальный массив наиболее разумно считать
// состоящим из неизвестных значений
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

const getWeatherPointValue = (value: unknown): WeatherPoint=>{
    throw new Error('not implemented yet');
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

const getStringOfDigits = (value: unknown): InitialTime =>{
    throw new Error('not implemented yet');
}

const getProductName = (value: unknown): WeatherProduct=>{
    throw new Error('not implemented yet');
}

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
