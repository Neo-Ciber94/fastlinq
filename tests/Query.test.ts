import { Query } from "../src/Query";

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