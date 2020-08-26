/* tslint:disable: no-console */
import './src/Query';
import { measureTimeAndLog, measureAverageTimeAndLog, repeat } from './src/Iterables/Utils';

const elements = [1,2,3,4,5];

measureAverageTimeAndLog(() => {
    for(let i = 0; i < elements.length; i++){
        const value = dump(elements[i]);
    }
});

measureAverageTimeAndLog(() => {
   for (const e of elements) {
       const value = dump(e);
   }
});


function dump<T>(value: T) : T{
    return value;
}