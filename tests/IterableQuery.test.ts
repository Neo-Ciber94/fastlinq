import { Ordering } from "../src/Compare";
import { Queryable } from "../src/Queryable";
import { IterableQuery } from "../src/IterableQuery";
import "../src/Query";

test('IterableQuery.map', () => {
    const array = [1,2,3,4,5].asQuery().map(e => e * 2);
    expect(array.toArray()).toStrictEqual([2,4,6,8,10]);

    const set = new Set([1,2,3,4,5]).asQuery().map(e => e * 2);
    expect(set.toArray()).toStrictEqual([2,4,6,8,10]);
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
    const array = [1,2,3,4,5,6,7,8,9,10].asQuery().where(e => e % 2 === 0);
    expect(array.toArray()).toStrictEqual([2, 4, 6, 8, 10]);

    const set = new Set([1,2,3,4,5,6,7,8,9,10]).asQuery().where(e => e % 2 === 0);
    expect(set.toArray()).toStrictEqual([2, 4, 6, 8, 10]);
});

test('IterableQuery.take', () => {
    const array = [1,2,3,4,5].asQuery();
    expect(array.take(3).toArray()).toStrictEqual([1,2,3]);
    expect(array.take(0).toArray()).toStrictEqual([]);
    expect(array.take(5).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(array.take(20).toArray()).toStrictEqual([1,2,3,4,5]);

    const set = new Set([1,2,3,4,5]).asQuery();
    expect(set.take(3).toArray()).toStrictEqual([1,2,3]);
    expect(set.take(0).toArray()).toStrictEqual([]);
    expect(set.take(5).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(set.take(20).toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.skip', () => {
    const array = [1,2,3,4,5].asQuery();
    expect(array.skip(3).toArray()).toStrictEqual([4,5]);
    expect(array.skip(0).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(array.skip(5).toArray()).toStrictEqual([]);
    expect(array.skip(20).toArray()).toStrictEqual([]);

    const set = new Set([1,2,3,4,5]).asQuery();
    expect(set.skip(3).toArray()).toStrictEqual([4,5]);
    expect(set.skip(0).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(set.skip(5).toArray()).toStrictEqual([]);
    expect(set.skip(20).toArray()).toStrictEqual([]);
});

test('IterableQuery.takeLast', () => {
    const array = [1,2,3,4,5].asQuery();
    expect(array.takeLast(2).toArray()).toStrictEqual([4,5]);
    expect(array.takeLast(10).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(array.takeLast(0).toArray()).toStrictEqual([]);
    expect(new Array<number>().asQuery().takeLast(2).toArray()).toStrictEqual([]);

    const set = new Set([1,2,3,4,5]).asQuery();
    expect(set.takeLast(2).toArray()).toStrictEqual([4,5]);
    expect(set.takeLast(10).toArray()).toStrictEqual([1,2,3,4,5]);
    expect(set.takeLast(0).toArray()).toStrictEqual([]);
    expect(new Set<number>().asQuery().takeLast(2).toArray()).toStrictEqual([]);
})

test('IterableQuery.skipLast', () => {
    const array = [1,2,3,4,5].asQuery();
    expect(array.skipLast(2).toArray()).toStrictEqual([1,2,3]);
    expect(array.skipLast(4).toArray()).toStrictEqual([1]);
    expect(array.skipLast(10).toArray()).toStrictEqual([]);
    expect(new Array<number>().asQuery().skipLast(2).toArray()).toStrictEqual([]);

    const set = new Set([1,2,3,4,5]).asQuery();
    expect(set.skipLast(2).toArray()).toStrictEqual([1,2,3]);
    expect(set.skipLast(4).toArray()).toStrictEqual([1]);
    expect(set.skipLast(10).toArray()).toStrictEqual([]);
    expect(new Set<number>().asQuery().skipLast(2).toArray()).toStrictEqual([]);
})

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
    const array = [1,2,3].asQuery();
    expect(array.append(4).toArray()).toStrictEqual([1,2,3,4]);
    expect(array.append(4).append(5).toArray()).toStrictEqual([1,2,3,4,5]);

    const set = new Set([1,2,3]).asQuery();
    expect(set.append(4).toArray()).toStrictEqual([1,2,3,4]);
    expect(set.append(4).append(5).toArray()).toStrictEqual([1,2,3,4,5]);
});

test('IterableQuery.prepend', () => {
    const array = [1,2,3].asQuery();
    expect(array.prepend(0).toArray()).toStrictEqual([0,1,2,3]);
    expect(array.prepend(0).prepend(-1).toArray()).toStrictEqual([-1,0,1,2,3]);

    const set = new Set([1,2,3]).asQuery();
    expect(set.prepend(0).toArray()).toStrictEqual([0,1,2,3]);
    expect(set.prepend(0).prepend(-1).toArray()).toStrictEqual([-1,0,1,2,3]);
});

test('IterableQuery.concat', () => {
    const elements = [1,2,3].asQuery();

    expect(elements.concat([4,5,6]).toArray()).toStrictEqual([1,2,3,4,5,6]);
    expect(elements.concat([]).toArray()).toStrictEqual([1,2,3]);
});

test('IterableQuery.indexed', () => {
    const array = ["Apple", "Orange", "Pear"].asQuery().indexed().toArray();
    expect(array[0].index).toStrictEqual(0);
    expect(array[0].value).toStrictEqual("Apple");

    expect(array[1].index).toStrictEqual(1);
    expect(array[1].value).toStrictEqual("Orange");

    expect(array[2].index).toStrictEqual(2);
    expect(array[2].value).toStrictEqual("Pear");

    const set = new Set(["Apple", "Orange", "Pear"]).asQuery().indexed().toArray();
    expect(set[0].index).toStrictEqual(0);
    expect(set[0].value).toStrictEqual("Apple");

    expect(set[1].index).toStrictEqual(1);
    expect(set[1].value).toStrictEqual("Orange");

    expect(set[2].index).toStrictEqual(2);
    expect(set[2].value).toStrictEqual("Pear");
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

    const persons : Queryable<Person> = [
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

test("IterableQuery.defaultIfEmpty", () => {
    expect([1,2,3].asQuery().defaultIfEmpty([1,1,1]).toArray()).toStrictEqual([1,2,3]);
    expect(new Array<number>().asQuery().defaultIfEmpty([1,1,1]).toArray()).toStrictEqual([1,1,1]);
});

test("IterableQuery.stepBy", () => {
    const elements = [1,2,3,4,5,6].asQuery();
    expect(elements.stepBy(2).toArray()).toStrictEqual([2,4,6]);
    expect(new Array<number>().asQuery().stepBy(3).toArray()).toStrictEqual([]);
})

test("IterableQuery.repeat", () => {
    const elements = [1,2,3].asQuery();
    expect(elements.repeat(0).toArray()).toStrictEqual([]);
    expect(elements.repeat(2).toArray()).toStrictEqual([1,2,3,1,2,3]);
    expect(new Array<number>().asQuery().repeat(2).toArray()).toStrictEqual([]);
})

test("IterableQuery.seek", () => {
    const elements = [1,2,3,4,5].asQuery();

    const e = elements.seek((n) => {
        expect([1,2,3,4,5].includes(n)).toBeTruthy();
    });

    expect(e.toArray()).toStrictEqual([1,2,3,4,5]);
});

test("IterableQuery.forEach", () => {
    const array = [1,2,3,4,5].asQuery();
    array.forEach((n) => {
        expect([1,2,3,4,5].includes(n)).toBeTruthy();
    });

    const set = [1,2,3,4,5].asQuery();
    set.forEach((n) => {
        expect([1,2,3,4,5].includes(n)).toBeTruthy();
    });
});

test("IterableQuery.reduce", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.reduce((prev, cur) => prev + cur)).toStrictEqual(10);
    expect(new Array<number>().asQuery().reduce((prev, cur) => prev + cur)).toBeUndefined();
});

test("IterableQuery.reduce with seed", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.reduce((prev, cur) => prev + cur, 10)).toStrictEqual(20);
    expect(new Array<number>().asQuery().reduce((prev, cur) => prev + cur, 10)).toStrictEqual(10);
});

test("IterableQuery.fold", () => {
    const elements = [1,2,3,4].asQuery();

    expect(elements.fold(0, (prev, cur) => prev + cur)).toStrictEqual(10);
    expect(new Array<number>().asQuery().fold(10, (prev, cur) => prev + cur)).toStrictEqual(10);
});

test("IterableQuery.sum", () => {
    const elements = [1,2,3,4].asQuery();
    expect(elements.sum(x => x)).toStrictEqual(10);
    expect(new Array<number>().asQuery().sum(x => x)).toBeUndefined();
})

test("IterableQuery.product", () => {
    const elements = [1,2,3,4].asQuery();
    expect(elements.product(x => x)).toStrictEqual(24);
    expect(new Array<number>().asQuery().product(x => x)).toBeUndefined();
})

test("IterableQuery.average", () => {
    const elements = [1,2,3,4].asQuery();
    expect(elements.average(x => x)).toStrictEqual(2.5);
    expect(new Array<number>().asQuery().average(x => x)).toBeUndefined();
})

test("IterableQuery.partition", () => {
    const numbers = [1,2,3,4,5,6,7,8,9,10].asQuery();

    const [even, odd] = numbers.partition((n) => n % 2 === 0);
    expect(even).toStrictEqual([2,4,6,8,10]);
    expect(odd).toStrictEqual([1,3,5,7,9]);
});

test("IterableQuery.min", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.min()).toStrictEqual(1);
    expect(new Array<number>().asQuery().min()).toBeUndefined();
});

test("IterableQuery.min with compare", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.min((x,y) => Ordering.of(x - y))).toStrictEqual(1);
    expect(new Array<number>().asQuery().min()).toBeUndefined();
});

test("IterableQuery.max", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.max()).toStrictEqual(5);
    expect(new Array<number>().asQuery().max()).toBeUndefined();
});

test("IterableQuery.max with compare", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.max((x,y) => Ordering.of(x - y))).toStrictEqual(5);
    expect(new Array<number>().asQuery().max()).toBeUndefined();
});

test("IterableQuery.minmax", () => {
    const elements = [5,1,4,2,3].asQuery();
    expect(elements.minmax()).toStrictEqual([1,5]);
    expect(new Array<number>().asQuery().minmax()).toBeUndefined();
})

test("IterableQuery.minmax with compare", () => {
    const elements = [5,1,4,2,3].asQuery();
    const compare = (x: number, y: number) => Ordering.of(x - y);
    expect(elements.minmax(compare)).toStrictEqual([1,5]);
    expect(new Array<number>().asQuery().minmax(compare)).toBeUndefined();
})

test("IterableQuery.contains", () => {
    const numbers = [5,1,2,3,2].asQuery();
    expect(numbers.contains(5)).toBeTruthy();
    expect(numbers.contains(1)).toBeTruthy();
    expect(numbers.contains(2)).toBeTruthy();
    expect(numbers.contains(6)).toBeFalsy();
    expect(numbers.contains(0)).toBeFalsy();
});

test("IterableQuery.contains with compare", () => {
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

test("IterableQuery.containsAll", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.containsAll([1,2,3])).toBeTruthy();
    expect(elements.containsAll([1,2,3,4,5])).toBeTruthy();
    expect(elements.containsAll([1,2,3,4,5,6])).toBeFalsy();
    expect(elements.containsAll([6,7,8])).toBeFalsy();
});

test("IterableQuery.sequenceEquals", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.sequenceEquals([1,2,3,4,5])).toBeTruthy();
    expect(elements.sequenceEquals([1,2,3,4,5,6])).toBeFalsy();
    expect(elements.sequenceEquals([1,2,3,4])).toBeFalsy();
});

test("IterableQuery.elementAt", () => {
    const array = [1,2,3,4,5].asQuery();
    expect(array.elementAt(0)).toStrictEqual(1);
    expect(array.elementAt(1)).toStrictEqual(2);
    expect(array.elementAt(2)).toStrictEqual(3);
    expect(array.elementAt(3)).toStrictEqual(4);
    expect(array.elementAt(4)).toStrictEqual(5);

    const set = new Set([1,2,3,4,5]).asQuery();
    expect(set.elementAt(0)).toStrictEqual(1);
    expect(set.elementAt(1)).toStrictEqual(2);
    expect(set.elementAt(2)).toStrictEqual(3);
    expect(set.elementAt(3)).toStrictEqual(4);
    expect(set.elementAt(4)).toStrictEqual(5);
});

test("IterableQuery.elementAtOrElse", () => {
    const elements = [1,2,3,4,5].asQuery();
    expect(elements.elementAtOrElse(0, -1)).toStrictEqual(1);
    expect(elements.elementAtOrElse(1, -1)).toStrictEqual(2);
    expect(elements.elementAtOrElse(2, -1)).toStrictEqual(3);
    expect(elements.elementAtOrElse(3, -1)).toStrictEqual(4);
    expect(elements.elementAtOrElse(4, -1)).toStrictEqual(5);
    expect(elements.elementAtOrElse(10, -1)).toStrictEqual(-1);
    expect(elements.elementAtOrElse(-2, -1)).toStrictEqual(-1);
})

test("IterableQuery.indexOf", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.indexOf(1)).toStrictEqual(0);
    expect(elements.indexOf(2)).toStrictEqual(1);
    expect(elements.indexOf(3)).toStrictEqual(2);
    expect(elements.indexOf(4)).toStrictEqual(3);
    expect(elements.indexOf(5)).toStrictEqual(4);
});

test("IterableQuery.lastIndexOf", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.lastIndexOf(1)).toStrictEqual(0);
    expect(elements.lastIndexOf(2)).toStrictEqual(1);
    expect(elements.lastIndexOf(3)).toStrictEqual(2);
    expect(elements.lastIndexOf(4)).toStrictEqual(3);
    expect(elements.lastIndexOf(5)).toStrictEqual(4);
});

test("IterableQuery.first", () => {
    expect([1,2,3,4,5].asQuery().first()).toStrictEqual(1);
    expect(new Array<number>().asQuery().first()).toBeUndefined();
    expect([1,5,2,4,3].asQuery().first(e => e > 2)).toStrictEqual(5);

    expect(new Set([1,2,3,4,5]).asQuery().first()).toStrictEqual(1);
    expect(new Set<number>().asQuery().first()).toBeUndefined();
    expect(new Set([1,5,2,4,3]).asQuery().first(e => e > 2)).toStrictEqual(5);
});

test("IterableQuery.last", () => {
    expect([1,2,3,4,5].asQuery().last()).toStrictEqual(5);
    expect(new Array<number>().asQuery().last()).toBeUndefined();
    expect([1,4,5,3,1].asQuery().last(e => e > 2)).toStrictEqual(3);

    expect(new Set([1,2,3,4,5]).asQuery().last()).toStrictEqual(5);
    expect(new Set<number>().asQuery().last()).toBeUndefined();
    expect(new Set([1,4,5,3,1]).asQuery().last(e => e > 2)).toStrictEqual(3);
});

test("IterableQuery.firstOrElse", () => {
    expect([1,2,3,4,5].asQuery().firstOrElse(-1)).toStrictEqual(1);
    expect(new Array<number>().asQuery().firstOrElse(-1)).toStrictEqual(-1);
    expect([3,4,2,1,5].asQuery().firstOrElse(-1, e => e > 3)).toStrictEqual(4);
})

test("IterableQuery.lastOrElse", () => {
    expect([1,2,3,4,5].asQuery().lastOrElse(-1)).toStrictEqual(5);
    expect(new Array<number>().asQuery().lastOrElse(-1)).toStrictEqual(-1);
    expect([3,4,2,1,5].asQuery().lastOrElse(-1, e => e > 3)).toStrictEqual(5);
})

test("IterableQuery.find", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.find(e => e === 3)).toStrictEqual(3);
    expect(new Array<number>().asQuery().find(e => e === 3)).toBeUndefined();
});

test("IterableQuery.findLast", () => {
    const elements = [1,2,3,4,3,5].asQuery();

    expect(elements.findLast(e => e > 3)).toStrictEqual(5);
    expect(new Array<number>().asQuery().findLast(e => e === 3)).toBeUndefined();
});

test("IterableQuery.find with predicate", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.find(e => e === 3)).toStrictEqual(3);
    expect(new Array<number>().asQuery().find(e => e === 3)).toBeUndefined();
});

test("IterableQuery.findIndex", () => {
    const elements = [1,2,3,4,5].asQuery();

    expect(elements.findIndex(e => e === 3)).toStrictEqual(2);
    expect(new Array<number>().asQuery().findIndex(e => e === 3)).toBeUndefined();
});

test("IterableQuery.findLastIndex with predicate", () => {
    const elements = [1,2,3,4,1,5].asQuery();

    expect(elements.findLastIndex(e => e === 1)).toStrictEqual(4);
    expect(new Array<number>().asQuery().findLastIndex(e => e === 2)).toBeUndefined();
});

test("IterableQuery.findIndices", () => {
    const elements = [1,2,3,4,5];
    const indices = elements.asQuery().findIndices(e => e % 2 === 0);
    expect(indices).toStrictEqual([1,3]);
});

test("IterableQuery.single", () => {
    expect([1,2,3,4,5].asQuery().single()).toBeUndefined();
    expect([1,2].asQuery().single()).toBeUndefined();
    expect([1].asQuery().single()).toStrictEqual(1);
    expect(new Array<number>().asQuery().single()).toBeUndefined();

    expect(new Set([1,2,3,4,5]).asQuery().single()).toBeUndefined();
    expect(new Set([1,2]).asQuery().single()).toBeUndefined();
    expect(new Set([1]).asQuery().single()).toStrictEqual(1);
    expect(new Set<number>().asQuery().single()).toBeUndefined();
});

test("IterableQuery.single with predicate", () => {
    expect([1,2,3,4,5].asQuery().single(e => e === 3)).toStrictEqual(3);
    expect([1,1,2,2,3,3,4,4,5,5].asQuery().single(e => e === 2)).toBeUndefined();
    expect(new Array<number>().asQuery().single()).toBeUndefined();
});

test("IterableQuery.singleOrElse", () => {
    expect([1,2,3,4,5].asQuery().singleOrElse(-1)).toStrictEqual(-1);
    expect([3].asQuery().singleOrElse(-1)).toStrictEqual(3);
    expect(new Array<number>().asQuery().singleOrElse(-1)).toStrictEqual(-1);
    expect([5,1,4,3,2].asQuery().singleOrElse(-1, e => e > 2)).toStrictEqual(-1);
    expect([5,5,1,4,4,3,3,2,2].asQuery().singleOrElse(-1, e => e === 1)).toStrictEqual(1);
})

test("IterableQuery.every", () => {
    expect([1,2,3,4].asQuery().every(e => e > 0)).toBeTruthy();
    expect([1,2,3,4].asQuery().every(e => e > 2)).toBeFalsy();
});

test("IterableQuery.any", () => {
    expect([1,2,3,4].asQuery().any()).toBeTruthy();
    expect([1,2,3,4].asQuery().any(e => e > 2)).toBeTruthy();
    expect([1,2,3,4].asQuery().any(e => e > 5)).toBeFalsy();
    expect(new Array<number>().asQuery().any(e => e > 2)).toBeFalsy();
});

test("IterableQuery.isSorted", () => {
    expect([1,2,3,4,5].asQuery().isSorted()).toBeTruthy();
    expect([1,2,3].asQuery().isSorted()).toBeTruthy();
    expect([1,3,2,5,4].asQuery().isSorted()).toBeFalsy();
});

test("IterableQuery.isSortedDecending", () => {
    expect([5,4,3,2,1].asQuery().isSortedDecending()).toBeTruthy();
    expect([3,2,1].asQuery().isSortedDecending()).toBeTruthy();
    expect([1,3,2,5,4].asQuery().isSortedDecending()).toBeFalsy();
});

test("IterableQuery.isSortedBy", () => {
    expect([1,2,3,4,5].asQuery().isSortedBy(e => e)).toBeTruthy();
    expect([1,2,3].asQuery().isSortedBy(e => e)).toBeTruthy();
    expect([1,3,2,5,4].asQuery().isSortedBy(e => e)).toBeFalsy();
});

test("IterableQuery.isSortedByDecending", () => {
    expect([5,4,3,2,1].asQuery().isSortedByDecending(e => e)).toBeTruthy();
    expect([3,2,1].asQuery().isSortedByDecending(e => e)).toBeTruthy();
    expect([1,3,2,5,4].asQuery().isSortedByDecending(e => e)).toBeFalsy();
});

test("IterableQuery.count", () => {
    expect([1,2,3].asQuery().count()).toStrictEqual(3);
    expect(new Array<number>().asQuery().count()).toStrictEqual(0);
    expect(new Set<number>().asQuery().count()).toStrictEqual(0);
    expect(new Set([1,2,3]).asQuery().count()).toStrictEqual(3);
});

test("IterableQuery.count with predicate", () => {
    expect([1,2,3,4,5].asQuery().count(e => e > 2)).toStrictEqual(3);
    expect([1,2,3,4,5].asQuery().count(e => e > 5)).toStrictEqual(0);

    expect(new Set([1,2,3,4,5]).asQuery().count(e => e > 2)).toStrictEqual(3);
    expect(new Set([1,2,3,4,5]).asQuery().count(e => e > 5)).toStrictEqual(0);
    expect(new Set([1,2,3]).asQuery().count(e => e > 1)).toStrictEqual(2);
});

test("IterableQuery.isEmpty", () => {
    expect(new Array<number>().asQuery().isEmpty()).toBeTruthy();
    expect([1].asQuery().isEmpty()).toBeFalsy();
    expect([1,2,3].asQuery().isEmpty()).toBeFalsy();

    expect(new Set<number>().asQuery().isEmpty()).toBeTruthy();
    expect(new Set([1]).asQuery().isEmpty()).toBeFalsy();
    expect(new Set([1,2,3]).asQuery().isEmpty()).toBeFalsy();
});

test("IterableQuery.groupBy", () => {
    const elements = ["apple", "avocado", "banana", "blueberry", "cherry"].asQuery();

    const result = elements.groupBy(e => e[0]);
    expect(result.get("a")).toStrictEqual(["apple", "avocado"]);
    expect(result.get("b")).toStrictEqual(["banana", "blueberry"]);
    expect(result.get("c")).toStrictEqual(["cherry"]);
});

test("IterableQuery.toArray", () => {
    const elements = [1,2,3,4];
    expect(elements.asQuery().toArray()).toStrictEqual([1,2,3,4]);
});

test("IterableQuery.toSet", () => {
    const elements = [1,2,2,3,3,3,4];
    expect(elements.asQuery().toSet()).toStrictEqual(new Set([1,2,3,4]));
});

test("IterableQuery.toMap", () => {
    const elements = [1, 2, 3];

    const result = elements.asQuery().toMap(e => `#${e}`);
    expect(result.get("#1")).toStrictEqual(1);
    expect(result.get("#2")).toStrictEqual(2);
    expect(result.get("#3")).toStrictEqual(3);
});

test("IterableQuery.toString", () => {
    expect([1,2,3].asQuery().toString()).toStrictEqual("[1, 2, 3]");
    expect([1,2,3].asQuery().toString("-")).toStrictEqual("[1-2-3]");
    expect([1,2,3,4,5,6,7,8,9,10].asQuery().toString({limit: 5})).toStrictEqual("[1, 2, 3, 4, 5, ...]");

    expect([1,2,3,4,5].asQuery().toString({limit: 10, separator: " - ", prefix: "{", postfix: "}", truncate: "and more"}))
        .toStrictEqual("{1 - 2 - 3 - 4 - 5}");

    expect([1,2,3,4,5,6,7,8,9,10].asQuery().toString({limit: 5, separator: " - ", prefix: "{", postfix: "}", truncate: "and more"}))
        .toStrictEqual("{1 - 2 - 3 - 4 - 5 - and more}");
});

test('IterableQuery -> where, select', () => {
    const array = [0,1,2,3,4,5,6,7,8,9,10].asQuery()
        .where(e => e > 0 && e <= 5)
        .map(e => e * 2);

    expect(array.toArray()).toStrictEqual([2,4,6,8,10]);
    expect(array.count()).toStrictEqual(5);

    const set = new Set([0,1,2,3,4,5,6,7,8,9,10]).asQuery()
        .where(e => e > 0 && e <= 5)
        .map(e => e * 2);

    expect(set.toArray()).toStrictEqual([2,4,6,8,10]);
    expect(set.count()).toStrictEqual(5);
})

test('IterableQuery -> where, take, select', () => {
    const array = [0,1,2,3,4,5,6,7,8,9,10].asQuery()
        .where(e => e > 0 && e <= 5)
        .take(3)
        .map(e => e * 2);

    expect(array.toArray()).toStrictEqual([2,4,6]);
    expect(array.count()).toStrictEqual(3);

    const set = new Set([0,1,2,3,4,5,6,7,8,9,10]).asQuery()
        .where(e => e > 0 && e <= 5)
        .take(3)
        .map(e => e * 2);

    expect(set.toArray()).toStrictEqual([2,4,6]);
    expect(set.count()).toStrictEqual(3);
})

test('IterableQuery -> take, skip', () => {
    const array = [0,1,2,3,4,5,6,7,8,9,10].asQuery();
    expect(array.take(3).toArray()).toStrictEqual([0,1,2]);
    expect(array.take(3).count()).toStrictEqual(3);
    expect(array.skip(5).toArray()).toStrictEqual([5,6,7,8,9,10]);
    expect(array.skip(5).count()).toStrictEqual(6);

    const set = new Set([0,1,2,3,4,5,6,7,8,9,10]).asQuery();
    expect(set.take(3).toArray()).toStrictEqual([0,1,2]);
    expect(set.take(3).count()).toStrictEqual(3);
    expect(set.skip(5).toArray()).toStrictEqual([5,6,7,8,9,10]);
    expect(set.skip(5).count()).toStrictEqual(6);
})