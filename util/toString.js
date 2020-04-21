import toObj from "./toObject";
import formatToJsonString from './formatToJsonString';

const toString = (input) => {
    let obj = toObj(input);
    if (obj === 'NOT_JSON_STRING') return input
    return formatToJsonString(obj)
}

export default toString