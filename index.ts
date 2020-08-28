/* tslint:disable: no-console */
import './src/Query';
import { Query } from './src/Query';

console.log(Array.isArray(new Set<number>()));
console.log(
    new Set<number>().asQuery().where(e => e > 5).defaultIfEmpty([1,2,3]).toString()
)