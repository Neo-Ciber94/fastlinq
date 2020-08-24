
export class RepeatIterable<T> implements Iterable<T>{
    private readonly value: T;
    private readonly count: number;

    constructor(value: T, count: number){
        if(count < 0){
            throw new Error("count cannot be lower than 0");
        }

        this.value = value;
        this.count = count;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        for(let i = 0; i < this.count; i++){
            yield this.value;
        }
    }
}