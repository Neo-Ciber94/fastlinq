import { IterableIterator } from "./IterableIterator";

export class StepByIterator<T> implements IterableIterator<T> {
  private readonly source: Iterable<T>;
  private readonly iterator: Iterator<T>;
  private readonly step: number;
  private count: number;

  constructor(iterable: Iterable<T>, step: number) {
    if (step <= 0) {
      throw new Error("step cannot be negative or zero");
    }

    this.source = iterable;
    this.iterator = iterable[Symbol.iterator]();
    this.step = step;
    this.count = 0;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new StepByIterator(this.source, this.step);
  }

  next(): IteratorResult<T, any> {
    let next = this.iterator.next();
    if (next.done) {
      return next;
    }

    while (++this.count < this.step) {
      next = this.iterator.next();
    }

    this.count = 0;
    return next;
  }
}
