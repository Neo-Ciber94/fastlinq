import {
  IterableIterator,
  iteratorDone,
  iteratorResult,
} from "./IterableIterator";

export class FlatMapIterable<T, TResult> implements IterableIterator<TResult> {
  private readonly source: Iterable<T>;
  private readonly iterator: Iterator<T>;
  private readonly transform: (value: T) => TResult[];

  private array?: TResult[];
  private index: number = 0;

  constructor(iterable: Iterable<T>, transform: (value: T) => TResult[]) {
    this.source = iterable;
    this.iterator = iterable[Symbol.iterator]();
    this.transform = transform;
  }

  [Symbol.iterator](): FlatMapIterable<T, TResult> {
    return new FlatMapIterable(this.source, this.transform);
  }

  next(): IteratorResult<TResult, any> {
    if (this.array && this.index < this.array.length) {
      const value = this.array[this.index++];
      return iteratorResult(value);
    } else {
      const next = this.iterator.next();
      if (next.done) {
        return iteratorDone();
      }

      this.array = this.transform(next.value);
      this.index = 0;
      return this.next();
    }
  }
}
