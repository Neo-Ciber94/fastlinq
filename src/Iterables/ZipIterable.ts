import {
  IterableIterator,
  iteratorDone,
  iteratorResult,
} from "./IterableIterator";

export class ZipIterable<T, TOther, TResult>
  implements IterableIterator<TResult> {
  private readonly source: Iterable<T>;
  private readonly other: Iterable<TOther>;
  private readonly leftIterator: Iterator<T>;
  private readonly rightIterator: Iterator<TOther>;
  private readonly combine: (x: T, y: TOther) => TResult;

  constructor(
    iterable: Iterable<T>,
    other: Iterable<TOther>,
    combine: (x: T, y: TOther) => TResult
  ) {
    this.source = iterable;
    this.other = other;
    this.leftIterator = iterable[Symbol.iterator]();
    this.rightIterator = other[Symbol.iterator]();
    this.combine = combine;
  }

  [Symbol.iterator](): ZipIterable<T, TOther, TResult> {
    return new ZipIterable(this.source, this.other, this.combine);
  }

  next(): IteratorResult<TResult, any> {
    const left = this.leftIterator.next();
    const right = this.rightIterator.next();

    if (left.done || right.done) {
      return iteratorDone();
    }

    const value = this.combine(left.value, right.value);
    return iteratorResult(value);
  }
}
