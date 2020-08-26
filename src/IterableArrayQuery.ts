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
        return this.array[length - 1];
    }

    single(): T | undefined {
        if (this.array.length > 0) {
            return undefined;
        }
        else {
            return this.array[0];
        }
    }

    elementAt(index: number): T | undefined {
        return this.array[index];
    }

    count(): number {
        return this.array.length;
    }

    isEmpty(): boolean {
        return this.array.length === 0;
    }
}
