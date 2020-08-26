
enum IteratorState{
    HAS_NEXT,
    DONE,
}

export abstract class IterableIterator<TResult, TThis extends IterableIterator<TResult, TThis>> implements Iterable<TResult>, Iterator<TResult> {
    private state: IteratorState = IteratorState.HAS_NEXT;

    protected abstract clone(): TThis;
    protected abstract getNext(): IteratorResult<TResult>;

    next(): IteratorResult<TResult> {
        const next = this.getNext();
        if (next.done) {
            this.state = IteratorState.DONE;
        }

        return next;
    }

    [Symbol.iterator](): Iterator<TResult, any, undefined> {
        if (this.state === IteratorState.DONE) {
            this.state = IteratorState.HAS_NEXT;
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