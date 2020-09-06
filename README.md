# fastlinq.ts

Provides a lazy evaluated type that provides a set of methods for query over the values of a collection.
It provides methods for transform, filter, update, combine an iterable or compute a result with the elements
of the iterable.



### Usage
```ts
import './src/Query';

const numbers = [1,2,3,4,5,6,7,8,9,10];

// Calls Array.asQuery() to get a ```Queryable<T>``` over the elements of the array
const items = numbers.asQuery()
    .filter(e => e <= 5)     // Filters the elements
    .map(e => e * 2)         // Transforms the elements
    .toArray();              // Gets an array containing the result

console.log(items); // [2,4,6,8,10]
```