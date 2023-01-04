export const isUndefined = (obj) => {
    return typeof obj === "undefined";
}

export const isEmptyObject = (obj) => {
    return isUndefined(obj) || Object.keys(obj).length === 0;
}

export const isNullOrEmptyObject = (obj) => {
    return isUndefined(obj) || isEmptyObject(obj);
}