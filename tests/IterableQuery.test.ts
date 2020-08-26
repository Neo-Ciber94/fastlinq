import { Ordering } from "../src/Compare";
import { IQuery } from "../src/IQuery";
import "../src/Query";

test('IterableQuery.map', () => {
    const elements = [1,2,3,4,5].asQuery().map(e => e * 2);
    expect(elements.toArray()).toStrictEqual([2,4,6,8,10]);
});

test('IterableQuery.flatMap', () => {
    interface ArrayData{
        data: number[]
    }

    const arrays : ArrayData[] = [
        { data: [1,2,3] },
        { data: [4,5,6] },
        { data: [7,8,9] }
    ]

    const elements = arrays.asQuery().flatMap(e => e.data);
    expect(elements.toArray()).toStrictEqual([1,2,3,4,5,6,7,8,9]);
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

test('IterableQuery.append', () => {
    const elements = [1,2,3].asQuery();

    expect(elements.append(4).toArray()).toStrictEqual([1,2,3,4]);
    expect(elements.append(4).append(5).toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.prepend', () => {
    const elements = [1,2,3].asQuery();

    expect(elements.prepend(0).toArray()).toStrictEqual([0,1,2,3]);
    expect(elements.prepend(0).prepend(-1).toArray()).toStrictEqual([-1,0,1,2,3]);
});

test('IterableQuery.concat', () => {
    const elements = [1,2,3].asQuery();

    expect(elements.concat([4,5,6]).toArray()).toStrictEqual([1,2,3,4,5,6]);
    expect(elements.concat([]).toArray()).toStrictEqual([1,2,3]);
});

test('IterableQuery.indexed', () => {
    const elements = ["Apple", "Orange", "Pear"].asQuery();

    const array = elements.indexed().toArray();
    expect(array[0].index).toStrictEqual(0);
    expect(array[0].value).toStrictEqual("Apple");

    expect(array[1].index).toStrictEqual(1);
    expect(array[1].value).toStrictEqual("Orange");

    expect(array[2].index).toStrictEqual(2);
    expect(array[2].value).toStrictEqual("Pear");
});

test('IterableQuery.distinct', () => {
    const elements = [1,1,2,2,2,3,4,4,5].asQuery().distinct();
    expect(elements.toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.distinctBy', () => {
    interface Person{
        readonly name: string;
        readonly age: number;
    }

    const persons : IQuery<Person> = [
        { name: "Peter", age: 20},
        { name: "Tony", age: 40},
        { name: "Bruce", age: 40},
        { name: "Natalia", age: 30}
    ].asQuery().distinctBy(e => e.age);

    const expected : Person[] =  [
        { name: "Peter", age: 20},
        { name: "Tony", age: 40},
        { name: "Natalia", age: 30}
    ];

    expect(persons.toArray()).toStrictEqual(expected);
});

test('IterableQuery.union', () => {
    const elements = [1,2,3].asQuery().union([2,3,4,5]);
    expect(elements.toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.except', () => {
    const elements = [1,2,3,4,5].asQuery().except([1,2,3]);
    expect(elements.toArray()).toStrictEqual([4,5]);
});

test('IterableQuery.intersect', () => {
    const elements = [1,2,3,4,5].asQuery().intersect([3,4,5,6,7]);
    expect(elements.toArray()).toStrictEqual([3,4,5]);
});

test('IterableQuery.reserved', () => {
    const elements = [1,2,3,4,5].asQuery().reversed();
    expect(elements.toArray()).toStrictEqual([5,4,3,2,1]);
});

test('IterableQuery.chunked', () => {
    const elements = [1,2,3,4,5,6].asQuery();

    expect(elements.chuncked(2).toArray()).toStrictEqual([[1,2],[3,4],[5,6]]);
    expect(elements.chuncked(3).toArray()).toStrictEqual([[1,2,3],[4,5,6]]);
    expect(elements.chuncked(4).toArray()).toStrictEqual([[1,2,3,4],[5,6]]);
});

test('IterableQuery.windowed', () => {
    const elements = [1,2,3,4,5,6].asQuery();

    expect(elements.windowed(2).toArray()).toStrictEqual([[1,2],[2,3],[3,4],[4,5],[5,6]]);
    expect(elements.windowed(3).toArray()).toStrictEqual([[1,2,3],[2,3,4],[3,4,5],[4,5,6]]);
    expect(elements.windowed(4).toArray()).toStrictEqual([[1,2,3,4],[2,3,4,5],[3,4,5,6]]);
});

test('IterableQuery.sort', () => {
    const elements = [1,5,2,4,3].asQuery();
    expect(elements.sort().toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.sort with compare', () => {
    const elements = [1,5,2,4,3].asQuery();
    expect(elements.sort((x,y) => Ordering.of(x - y)).toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.sortDecending', () => {
    const elements = [1,5,2,4,3].asQuery();
    expect(elements.sortDecending().toArray()).toStrictEqual([5,4,3,2,1]);
});

test('IterableQuery.sortDecending with compare', () => {
    const elements = [1,5,2,4,3].asQuery();
    expect(elements.sortDecending((x,y) => Ordering.of(x - y)).toArray()).toStrictEqual([5,4,3,2,1]);
});

test('IterableQuery.sortBy', () => {
    interface Person {
        readonly id: number;
        readonly name: string;
    }

    const persons : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 1, name: "Carla"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 4, name: "Marie"}
    ];

    const sorted = persons.asQuery().sortBy(e => e.id).toArray();
    const expected : Person[] = [
        { id: 1, name: "Carla"},
        { id: 2, name: "Carl" },
        { id: 3, name: "Rose" },
        { id: 4, name: "Marie"},
        { id: 5, name: "Bruno"},
    ];

    expect(sorted).toStrictEqual(expected);
});

test('IterableQuery.sortBy with compare', () => {
    interface Person {
        readonly id: number;
        readonly name: string;
    }

    const persons : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 1, name: "Carla"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 4, name: "Marie"}
    ];

    const sorted = persons.asQuery().sortBy(e => e.id, (x, y) => Ordering.of(x - y)).toArray();
    const expected : Person[] = [
        { id: 1, name: "Carla"},
        { id: 2, name: "Carl" },
        { id: 3, name: "Rose" },
        { id: 4, name: "Marie"},
        { id: 5, name: "Bruno"},
    ];

    expect(sorted).toStrictEqual(expected);
});

test('IterableQuery.sortByDecending', () => {
    interface Person {
        readonly id: number;
        readonly name: string;
    }

    const persons : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 1, name: "Carla"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 4, name: "Marie"}
    ];

    const sorted = persons.asQuery().sortByDecending(e => e.id).toArray();
    const expected : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 4, name: "Marie"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 1, name: "Carla"},
    ];

    expect(sorted).toStrictEqual(expected);
});

test('IterableQuery.sortByDecending with compare', () => {
    interface Person {
        readonly id: number;
        readonly name: string;
    }

    const persons : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 1, name: "Carla"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 4, name: "Marie"}
    ];

    const sorted = persons.asQuery().sortByDecending(e => e.id, (x, y) => Ordering.of(x - y)).toArray();
    const expected : Person[] = [
        { id: 5, name: "Bruno"},
        { id: 4, name: "Marie"},
        { id: 3, name: "Rose" },
        { id: 2, name: "Carl" },
        { id: 1, name: "Carla"},
    ];

    expect(sorted).toStrictEqual(expected);
});

test('IterableQuery.joinBy', () => {
    interface Client{
        readonly id: number;
        readonly name: string;
    }

    interface ShopItem{
        readonly clientId: number;
        readonly name: string;
    }

    const clients : Client[] = [
        { id: 1, name: "Carl"},
        { id: 2, name: "Rose"},
        { id: 4, name: "Ryu"}
    ];

    const items : ShopItem[] = [
        { clientId: 1, name: "Table"},
        { clientId: 1, name: "Mouse"},
        { clientId: 2, name: "Keyboard"},
        { clientId: 3, name: "Microwave"},
        { clientId: 4, name: "Table"}
    ];

    const joinResult = clients.asQuery().joinBy(items, (client, item) => client.id === item.clientId).toArray();
    const expectedResult : [Client, ShopItem][] = [
        [{ id: 1, name: "Carl"}, { clientId: 1, name: "Table"}],
        [{ id: 1, name: "Carl"}, { clientId: 1, name: "Mouse"}],
        [{ id: 2, name: "Rose"}, { clientId: 2, name: "Keyboard"}],
        [{ id: 4, name: "Ryu"}, { clientId: 4, name: "Table"}]
    ]

    expect(joinResult).toStrictEqual(expectedResult);
});

test("IteratorQuery.zip", () => {
    const numbers = [1,2,3,4];
    const words = ["one", "two", "three", "four", "five"];

    const result = numbers.asQuery().zip(words, (n, w) => [n, w]);
    expect(result.toArray()).toStrictEqual([
        [1, "one"],
        [2, "two"],
        [3, "three"],
        [4, "four"]
    ])
});

test("IteratorQuery.seek", () => {
    const elements = [1,2,3,4,5].asQuery();

    const e = elements.seek((n) => {
        expect([1,2,3,4,5].includes(n)).toBeTruthy();
    });

    expect(e.toArray()).toStrictEqual([1,2,3,4,5]);
});

test("IteratorQuery.forEach", () => {
    const elements = [1,2,3,4,5].asQuery();

    elements.forEach((n) => {
        expect([1,2,3,4,5].includes(n)).toBeTruthy();
    });
});

test("IteratorQuery.reduce", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.reduce((prev, cur) => prev + cur)).toStrictEqual(10);
    expect(new Array<number>().asQuery().reduce((prev, cur) => prev + cur)).toBeUndefined();
});

test("IteratorQuery.reduce with seed", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.reduce((prev, cur) => prev + cur, 10)).toStrictEqual(20);
    expect(new Array<number>().asQuery().reduce((prev, cur) => prev + cur, 10)).toStrictEqual(10);
});

test("IteratorQuery.fold", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.fold(0, (prev, cur) => prev + cur)).toStrictEqual(10);
    expect(new Array<number>().asQuery().fold(10, (prev, cur) => prev + cur)).toStrictEqual(10);
});

test("IteratorQuery.partition", () => {
    const numbers = [1,2,3,4,5,6,7,8,9,10].asQuery();

    const [even, odd] = numbers.partition((n) => n % 2 === 0);
    expect(even).toStrictEqual([2,4,6,8,10]);
    expect(odd).toStrictEqual([1,3,5,7,9]);
});

test("IteratorQuery.min", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.min()).toStrictEqual(1);
    expect(new Array<number>().asQuery().min()).toBeUndefined();
});

test("IteratorQuery.min with compare", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.min((x,y) => Ordering.of(x - y))).toStrictEqual(1);
    expect(new Array<number>().asQuery().min()).toBeUndefined();
});

test("IteratorQuery.max", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.max()).toStrictEqual(5);
    expect(new Array<number>().asQuery().max()).toBeUndefined();
});

test("IteratorQuery.max with compare", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.max((x,y) => Ordering.of(x - y))).toStrictEqual(5);
    expect(new Array<number>().asQuery().max()).toBeUndefined();
});

test("IteratorQuery.contains", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.contains(5)).toBeTruthy();
    expect(numbers.contains(1)).toBeTruthy();
    expect(numbers.contains(2)).toBeTruthy();
    expect(numbers.contains(6)).toBeFalsy();
    expect(numbers.contains(0)).toBeFalsy();
});

test("IteratorQuery.contains with compare", () => {
    interface Person{
        readonly id: number;
        readonly name: string;
    }

    const persons : Person[] = [
        { id: 1, name: "Rose"},
        { id: 2, name: "Alexander"},
        { id: 3, name: "Ryu"}
    ];

    expect(persons.asQuery().contains(p => p.name === "Alexander")).toBeTruthy();
    expect(persons.asQuery().contains(p => p.id === 1)).toBeTruthy();
    expect(persons.asQuery().contains(p => p.name === "Romeo")).toBeFalsy();
    expect(persons.asQuery().contains(p => p.id === 4)).toBeFalsy();
});

test("IteratorQuery.containsAll", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.containsAll([1,2,3])).toBeTruthy();
    expect(elements.containsAll([1,2,3,4,5])).toBeTruthy();
    expect(elements.containsAll([1,2,3,4,5,6])).toBeFalsy();
    expect(elements.containsAll([6,7,8])).toBeFalsy();
});

test("IteratorQuery.sequenceEquals", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.sequenceEquals([1,2,3,4,5])).toBeTruthy();
    expect(elements.sequenceEquals([1,2,3,4,5,6])).toBeFalsy();
    expect(elements.sequenceEquals([1,2,3,4])).toBeFalsy();
});