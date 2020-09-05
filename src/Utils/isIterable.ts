
export function isIterable(obj?: any): boolean {
    if (!obj) {
        return false;
    }

    return typeof obj[Symbol.iterator] === 'function';
}
