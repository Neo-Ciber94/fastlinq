
export class IterableGenerator<T> implements Iterable<T>{
    private readonly generator: (index: number, prev?: T) => T;
    private readonly seed: T | undefined;
    private readonly length: number;

    constructor(length: number, generator: (index: number) => T, seed?: T){
        if(length < 0){
            throw new Error("length cannot be 0");
        }

        this.generator = generator;
        this.length = length;
        this.seed = seed;
    }

    *[Symbol.iterator](): Iterator<T, any, undefined> {
        let prev : T | undefined = this.seed;

        for(let i = 0; i < this.length; i++){
            const next = this.generator(i, prev);
            prev = next;
            yield next;
        }
    }

}