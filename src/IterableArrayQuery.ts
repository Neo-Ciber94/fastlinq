import { IterableQueryBase } from "./IterableQueryBase";


export class IterableArrayQuery<T> extends IterableQueryBase<T> {
    private readonly array: T[];

    constructor(array: T[]) {
        super();
        this.array = array;
    }

    [Symbol.iterator](): Iterator<T, any, undefined> {
        return this.array[Symbol.iterator]();
    }

    first(): T | undefined {
        return this.array[0];
    }

    last(): T | undefined {
        return this.array[this.array.length - 1];
    }

    single(predicate?: any){
        if(predicate){
            let result : T | undefined;
            const array = this.array;
            // tslint:disable-next-line: prefer-for-of
            for(let i = 0; i < array.length; i++){
                if(predicate(array[i])){
                    if(result){
                        return undefined;
                    }
                    else{
                        result = array[i];
                    }
                }
            }
            return result;
        }
        else{
            if (this.array.length > 1) {
                return undefined;
            }
            else {
                return this.array[0];
            }
        }
    }

    elementAt(index: number): T | undefined {
        return this.array[index];
    }

    count(predicate?: any): number {
        if(predicate){
            const array = this.array;
            let count = 0;
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < array.length; i++) {
                if(predicate(array[i])){
                    count += 1;
                }
            }
            return count;
        }
        else{
            return this.array.length;
        }
    }

    isEmpty(): boolean {
        return this.array.length === 0;
    }
}
