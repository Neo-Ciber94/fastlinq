
export class FlatMapIterable<T, R> implements Iterable<R> {
    private readonly iterable: Iterable<T>;
    private readonly transform: (value: T) => R[];

    constructor(iterable: Iterable<T>, transform: (value: T) => R[]) {
        this.iterable = iterable;
        this.transform = transform;
    }

    *[Symbol.iterator](): Iterator<R, any, undefined> {
        for (const e of this.iterable) {
            for (const item of this.transform(e)) {
                yield item;
            }
        }
    }
}
