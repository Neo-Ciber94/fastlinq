/* tslint:disable: no-console */

import { measureAverageTimeAndLog } from './src/Iterables/Utils';
import './src/Query';
import { Queryable } from './src/Queryable';


function dummy<T>(value: T) : T{
    return value;
}