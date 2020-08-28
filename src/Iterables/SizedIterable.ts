
/**
 * An iterator with a known size.
 */
export interface SizedIterable<T> extends Iterable<T>{
    /**
     * Gets an `array` from the elements of this iterable.
     */
    toArray(): T[];
    /**
     * Gets the number of elements in this iterable. This operation must be O(1).
     */
    count() : number;
}