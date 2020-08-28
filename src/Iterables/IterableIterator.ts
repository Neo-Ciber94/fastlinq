
enum IteratorState{
    HasNext,
    Done,
}

export abstract class IterableIterator<TResult> implements Iterable<TResult>, Iterator<TResult> {
    private state: IteratorState = IteratorState.HasNext;

    protected abstract clone(): IterableIterator<TResult>;
    protected abstract getNext(): IteratorResult<TResult>;

    next(): IteratorResult<TResult> {
        const next = this.getNext();
        if (next.done) {
            this.state = IteratorState.Done;
        }

        return next;
    }

    [Symbol.iterator](): Iterator<TResult, any, undefined> {
        if (this.state === IteratorState.Done) {
            this.state = IteratorState.HasNext;
            return this.clone();
        }

        return this;
    }
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