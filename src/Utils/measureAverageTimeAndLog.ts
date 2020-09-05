import { measureTime } from './measureTime';


export function measureAverageTimeAndLog(label: string, f: () => void, n: number = 100, precision: number = 4) {
    if (n <= 0) {
        throw new Error("repeat should be greater than 0");
    }

    const times = new Array<number>();

    // Warn up
    for (let i = 0; i < 10; i++) {
        measureTime(f);
    }

    for (let i = 0; i < n; i++) {
        const ms = measureTime(f);
        times.push(ms);
    }

    const total = times.reduce((prev, cur) => prev + cur);
    const min = times.reduce((prev, cur) => cur < prev ? cur : prev);
    const max = times.reduce((prev, cur) => cur > prev ? cur : prev);
    const avg = total / times.length;

    console.log(`${label}:`);
    console.log({
        min: `${min.toFixed(precision)} ms`,
        max: `${max.toFixed(precision)} ms`,
        avg: `${avg.toFixed(precision)} ms`
    });
}
