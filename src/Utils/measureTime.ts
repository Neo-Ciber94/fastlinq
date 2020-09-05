import { performance } from 'perf_hooks';


export function measureTime(f: () => void): number {
    const start = performance.now();
    f();
    const end = performance.now();
    return end - start;
}
