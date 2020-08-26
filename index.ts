/* tslint:disable: no-console */
import './src/Query';
import { Query } from './src/Query';
import './src/Utils';
import { measureTimeAndLog, measureAverageTimeAndLog, repeat } from './src/Utils';

const elements = [1,2,3,4].asQuery().concat([]);
console.log(
    elements.map(e => e * 2).toArray()
)