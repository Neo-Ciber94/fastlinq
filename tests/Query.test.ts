import { Query } from "../src/Query";

test('Query.from', () => {
    const elements = Query.from(1,2,3,4,5);
    expect(elements.toArray()).toStrictEqual([1,2,3,4,5]);
})

test('Query.fromIterable', () => {
    const elements = Query.fromIterable(new Set([1,2,3,4,5]));
    expect(elements.toArray()).toStrictEqual([1,2,3,4,5]);
})

test('Query.empty', () => {
    expect(Query.empty<number>().toArray()).toStrictEqual([]);
    expect(Query.empty<number>().append(1).toArray()).toStrictEqual([1]);
})

test('Query.range', () => {
    const elements = Query.range(0, 10);
    expect(elements.toArray()).toStrictEqual([0,1,2,3,4,5,6,7,8,9]);
});

test('Query.rangeInclusive', () => {
    const elements = Query.rangeInclusive(0, 10);
    expect(elements.toArray()).toStrictEqual([0,1,2,3,4,5,6,7,8,9,10]);
});

test('reversed Query.range', () => {
    const elements = Query.range(0, 10, -1);
    expect(elements.toArray()).toStrictEqual([9,8,7,6,5,4,3,2,1]);
});

test('reversed Query.rangeInclusive', () => {
    const elements = Query.rangeInclusive(0, 10, -1);
    expect(elements.toArray()).toStrictEqual([10,9,8,7,6,5,4,3,2,1]);
});

test('Query.repeat', () => {
    const elements = Query.repeat("Apple", 3);
    expect(elements.toArray()).toStrictEqual(["Apple", "Apple", "Apple"]);
})

test('Query.generate', () => {
    const elements = Query.generate<number>(5, (_, prev) => prev! + 2, 0);
    expect(elements.toArray()).toStrictEqual([2,4,6,8,10]);
})