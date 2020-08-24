import "../src/Query";

test('IterableQuery.map', () => {
    const elements = [1,2,3,4,5].asQuery().map(e => e * 2);
    expect(elements.toArray()).toStrictEqual([2,4,6,8,10]);
});
test('IterableQuery.where', () => {
    const elements = [1,2,3,4,5,6,7,8,9,10].asQuery().where(e => e % 2 === 0);
    expect(elements.toArray()).toStrictEqual([2, 4, 6, 8, 10]);
});