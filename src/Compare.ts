/**
 * Represents a comparison of two values.
 */
export type Compare<T> = (x: T, y: T) => Ordering;

/**
 * Represents the result of a comparison.
 */
export class Ordering {
  /**
   * The value is greater than the other.
   */
  static Greater: Ordering = new Ordering(1);
  /**
   * The value is less than the other.
   */
  static Less: Ordering = new Ordering(-1);
  /**
   * The values are equals.
   */
  static Equals: Ordering = new Ordering(0);

  public readonly value: number;
  private constructor(value: number) {
    this.value = value;
  }

  /**
   * Gets the `Ordering` from the result of a comparison.
   * @param comparisonResult The result of a comparison
   */
  static of(comparisonResult: number): Ordering {
    if (comparisonResult === 0) {
      return Ordering.Equals;
    }

    return comparisonResult > 0 ? Ordering.Greater : Ordering.Less;
  }
}

/**
 * Compare two values.
 * @param x The left value.
 * @param y The right value.
 */
export function compare(x: any, y: any): Ordering | undefined {
  if (x > y) {
    return Ordering.Greater;
  } else if (x < y) {
    return Ordering.Less;
  } else if (x === y) {
    return Ordering.Equals;
  } else {
    return undefined;
  }
}

/**
 * Compare two values in reversed order.
 * @param x The left value.
 * @param y The right value.abs
 */
export function compareReverse(x: any, y: any): Ordering | undefined {
  if (x < y) {
    return Ordering.Greater;
  } else if (x > y) {
    return Ordering.Less;
  } else if (x === y) {
    return Ordering.Equals;
  } else {
    return undefined;
  }
}
