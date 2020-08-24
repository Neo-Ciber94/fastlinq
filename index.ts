/* tslint:disable: no-console */
import './src/Query';
import { Query } from './src/Query';
import './src/Utils';
import { measureTimeAndLog, measureAverageTimeAndLog, repeat } from './src/Utils';

const elements = Query.range(1, 1000_000);

// console.log(
//     Query.range(0, 10).map(e => e * 2).toString()
// )

repeat(10, () => {
    measureAverageTimeAndLog(
        () => elements
            .map(e => e * 2)
            .forEach(e => e)
    )
});