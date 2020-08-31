# linquery.ts

Provides a set of methods for query over a collection of values. Unlike arrays, the queries iterables are lazy evalauted.

### Usage
```ts
import './src/Query';

const numbers = [1,2,3,4,5,6,7,8,9,10];

// Calls Array.asQuery() to get an iterable over the elements of the array
const items = numbers.asQuery()
    .where(e => e <= 5)     // Filters the elements
    .map(e => e * 2)        // Transforms the elements
    .toArray();             // Gets an array containing the result

console.log(items); // [2,4,6,8,10]
```