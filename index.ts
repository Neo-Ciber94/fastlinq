/* tslint:disable: no-console */
import './src/Query';
import { Query } from './src/Query';
import './src/Utils';
import { measureTimeAndLog, measureAverageTimeAndLog, repeat } from './src/Utils';

const elements = Query.rangeInclusive(1, 10);

console.log(

)

// repeat(10, () => {
//     measureAverageTimeAndLog(
//         () => elements
//             .map(e => e * 2)
//             .forEach(e => e)
//     )
// });