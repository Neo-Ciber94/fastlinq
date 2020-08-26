import "../src/Query";

test('IterableQuery.map', () => {
    const elements = [1,2,3,4,5].asQuery().map(e => e * 2);
    expect(elements.toArray()).toStrictEqual([2,4,6,8,10]);
});

test('IterableQuery.where', () => {
    const elements = [1,2,3,4,5,6,7,8,9,10].asQuery().where(e => e % 2 === 0);
    expect(elements.toArray()).toStrictEqual([2, 4, 6, 8, 10]);
});

test('IterableQuery.take', () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.take(3).toArray()).toStrictEqual([1,2,3]);
    expect(elements.take(0).toArray()).toStrictEqual([]);
    expect(elements.take(5).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(elements.take(20).toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.skip', () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.skip(3).toArray()).toStrictEqual([4,5]);
    expect(elements.skip(0).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(elements.skip(5).toArray()).toStrictEqual([]);
    expect(elements.skip(20).toArray()).toStrictEqual([]);
});

test('IterableQuery.skipWhile', () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.skipWhile(e => e < 3).toArray()).toStrictEqual([3,4,5]);
    expect(elements.skipWhile(e => e > 2).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(elements.skipWhile(e => e > 0).toArray()).toStrictEqual([]);
});

test('IterableQuery.takeWhile', () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.takeWhile(e => e < 3).toArray()).toStrictEqual([1,2]);
    expect(elements.takeWhile(e => e > 2).toArray()).toStrictEqual([]);
    expect(elements.takeWhile(e => e > 0).toArray()).toStrictEqual([1,2,3,4,5]);
});