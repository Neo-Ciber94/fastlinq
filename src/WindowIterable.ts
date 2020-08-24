
export class WindowIterable<T> implements Iterable<T[]> {
    private readonly iterable: Iterable<T>;
    private readonly size: number;

    constructor(iterable: Iterable<T>, size: number) {
        if(size <= 0){
            throw new Error("Invalid window size, should be greater than 0: " +size);
        }

        this.iterable = iterable;
        this.size = size;
    }

    *[Symbol.iterator](): Iterator<T[], any, undefined> {
        const elements = Array.from(this.iterable);
        let array = new Array<T>();
        let count = 0;

        for(let i = 0; i < elements.length; i++){
            const elementsLeft = elements.length - i;
            const size = Math.min(this.size, elementsLeft);

            for(let j = 0; j < size; j++){
                const item = elements[j + i];
                array.push(item);
            }

            yield array;
            array = new Array<T>();
            count = 0;
        }
    }
}

