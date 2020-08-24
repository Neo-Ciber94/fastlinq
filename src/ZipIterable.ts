
export class ZipIterable<T, R, TResult> implements Iterable<TResult>{
    private readonly iterable: Iterable<T>;
    private readonly other: Iterable<R>
    private readonly combine: (x: T, y: R) => TResult;

    constructor(iterable: Iterable<T>, other: Iterable<R>, combine: (x: T, y: R) => TResult){
        this.iterable = iterable;
        this.other = other;
        this.combine = combine;
    }

    *[Symbol.iterator](): Iterator<TResult, any, undefined> {
        const left = this.iterable[Symbol.iterator]();
        const right = this.other[Symbol.iterator]();

        while(true){
            const x = left.next();
            const y = right.next();

            if(x.done || y.done){
                break;
            }
            else{
                const next = this.combine(x.value, y.value);
                yield next;
            }
        }
    }
}