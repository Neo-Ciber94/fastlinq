export class RangeIterable implements Iterable<number> {
  readonly start: number;
  readonly end: number;
  readonly step: number;

  constructor(
    start: number,
    end: number,
    step: number = 1,
    inclusive: boolean = false
  ) {
    if (step === 0) {
      throw new Error("step cannot be 0");
    }

    this.step = step;

    let thisEnd = end;
    let thisStart = start;

    if (inclusive) {
      if (step > 0) {
        thisEnd = end + 1;
        thisStart = start;
      }
    } else {
      if (step < 0) {
        thisEnd = end - 1;
        thisStart = start;
      }
    }

    this.end = thisEnd;
    this.start = thisStart;
  }

  [Symbol.iterator](): Iterator<number, any, undefined> {
    return new RangeIterator(this.start, this.end, this.step);
  }
}

// tslint:disable-next-line: max-classes-per-file
class RangeIterator implements Iterator<number> {
  private readonly start: number;
  private readonly end: number;
  private readonly step: number;
  private index: number;

  constructor(start: number, end: number, step: number = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
    this.index = step > 0 ? start : end;
  }

  isDone() {
    if (this.step > 0) {
      return this.index >= this.end;
    } else {
      return this.index <= this.start;
    }
  }

  next(): IteratorResult<number> {
    if (this.isDone()) {
      return {
        value: undefined,
        done: true,
      };
    }

    const value = this.index;
    this.index += this.step;

    return { value };
  }
}
