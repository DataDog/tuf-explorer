export function isObject(x: any) {
    return Object.getPrototypeOf(x) === Object.prototype;
}
