
export function repeat(n: number, f: () => void) {
    for (let i = 0; i < n; i++) {
        f();
    }
}
