
export class JoinIterable<T, R> implements Iterable<[T, R]>{
    private readonly iterable: Iterable<T>;
    private readonly other: Iterable<R>
    private readonly selector: (x: T, y: R) => boolean;

    constructor(iterable: Iterable<T>, other: Iterable<R>, selector: (x: T, y: R) => boolean){
        this.iterable = iterable;
        this.other = other;
        this.selector = selector;
    }

    *[Symbol.iterator](): Iterator<[T, R], any, undefined> {
        const left = this.iterable[Symbol.iterator]();
        const right = this.other[Symbol.iterator]();

        while(true){
            const x = left.next();
            const y = right.next();

            if(x.done || y.done){
                break;
            }
            else{
                if(this.selector(x.value, y.value)){
                    yield [x.value, y.value];
                }
            }
        }
    }
}