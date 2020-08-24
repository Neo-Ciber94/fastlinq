/* tslint:disable: no-console */
import { performance } from 'perf_hooks';

export function repeat(n: number, f: () => void) {
    for(let i = 0; i < n; i++){
        f();
    }
}

export function measureTime(f: () => void) : number{
    const start = performance.now();
    f();
    const end = performance.now();
    return end - start;
}

export function measureAverageTimeAndLog(f: () => void, repeat: number = 100, precision: number = 4){
    if(repeat <= 0){
        throw new Error("repeat should be greater than 0");
    }

    const times = new Array<number>();

    // Warn up
    for(let i = 0; i < 10; i++){
        measureTime(f);
    }

    for(let i = 0; i < repeat; i++){
        const ms = measureTime(f);
        times.push(ms);
    }

    const total = times.reduce((prev, cur) => prev + cur);
    const min = times.reduce((prev, cur) => cur < prev? cur: prev);
    const max = times.reduce((prev, cur) => cur > prev? cur: prev);
    const avg = total / times.length;

    console.log({
       min: `${min.toFixed(precision)} ms`,
       max: `${max.toFixed(precision)} ms`,
       avg: `${avg.toFixed(precision)} ms`
    });
}

export function measureTimeAndLog(f: () => void, repeat: number = 1, precision: number = 4){
    if(repeat <= 0){
        throw new Error("repeat should be greater than 0");
    }

    const times = new Array<number>();

    // Warn up
    measureTime(f);
    measureTime(f);

    for(let i = 0; i < repeat; i++){
        const ms = measureTime(f);
        times.push(ms);
    }

    if(times.length > 1){
        let total = 0;
        for (const e of times) {
            console.log(`${e.toFixed(precision)} ms`);
            total += e;
        }

        const avg = total / times.length;
        console.log(`Average: ${avg.toFixed(precision)} ms`);
    }
    else{
        console.log(`${times[0]}ms`);
    }
}

export function isIterable(obj?: any) : boolean{
    if(!obj){
        return false;
    }

    return typeof obj[Symbol.iterator] === 'function';
}