
export interface IterableIterator<TResult> extends Iterable<TResult>, Iterator<TResult>{
    next() : IteratorResult<TResult>;
    [Symbol.iterator]() : IterableIterator<TResult>;
}

export function iteratorDone<T>() : IteratorResult<T>{
    return {
        value: undefined,
        done: true
    }
}

export function iteratorResult<T>(value: T) : IteratorResult<T>{
    return { value }
}