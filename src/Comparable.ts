export type Compare<T> = (x: T, y: T) => Ordering;

export enum Ordering{
    Less = -1,
    Greater = 1,
    Equals = 0
}

export function compare(x: any, y: any) : Ordering | undefined{
    if(x > y){
        return Ordering.Greater;
    }
    else if(x < y){
        return Ordering.Less;
    }
    else if(x === y){
        return Ordering.Equals;
    }
    else{
        return undefined;
    }
}

export function compareReverse(x: any, y: any) : Ordering | undefined{
    if(x < y){
        return Ordering.Greater;
    }
    else if(x > y){
        return Ordering.Less;
    }
    else if(x === y){
        return Ordering.Equals;
    }
    else{
        return undefined;
    }
}