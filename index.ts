/* tslint:disable: no-console max-classes-per-file */

import { measureAverageTimeAndLog } from './src/Iterables/Utils';
import './src/Query';
import { Query } from './src/Query';

const items = Query.range(0, 1000_000).toArray();
function* numbers() : globalThis.Generator<number>{
  yield 0;
}
measureAverageTimeAndLog(() => {
  const result = items
    .filter(e => e <= 800_000)
    .map(e => e * 2)
    .length
})

measureAverageTimeAndLog(() => {
  const result = items.asQuery()
    .where(e => e <= 800_000)
    .map(e => e * 2)
    .count()
})

abstract class Generator {
  abstract nextID(): number;
  abstract nextString(maxLength: number, validChars?: string): string;
  abstract nextInteger(min: number, max: number): number;
  abstract nextDouble(min: number, max: number): number;
  abstract nextBoolean() : boolean;
}

class SimpleGenerator extends Generator {
  private static UpperCase: [number, number] = [64, 90];
  private static LowerCase: [number, number] = [97, 122];
  private static Numbers: [number, number] = [48, 57];
  private static NextID: number = 1;

  constructor() {
    super();
  }

  nextID(): number {
    return SimpleGenerator.NextID++;
  }

  nextString(maxLength: number = 8, validChars?: string): string {
    console.assert(maxLength > 0);
    console.assert(validChars ? validChars.length > 0 : true);

    const chars = new Array<string>();
    if (validChars) {
      while (chars.length < maxLength) {
        const index = this.nextInteger(0, validChars.length);
        const charCode = validChars[index];
        chars.push(charCode);
      }
    } else {
      while (chars.length < maxLength) {
        const type = this.nextInteger(0, 3);
        let range : [number, number] | undefined;
        switch (type) {
          case 0:
            range = SimpleGenerator.UpperCase;
            break;
          case 1:
            range = SimpleGenerator.LowerCase;
            break;
          case 2:
            range = SimpleGenerator.Numbers;
            break;
        }

        const charCode = this.nextInteger(range![0], range![1]);
        chars.push(String.fromCharCode(charCode));
      }
    }

    return chars.join("");
  }

  nextInteger(min: number, max: number): number {
    return Math.floor(this.nextDouble(min, max));
  }

  nextDouble(min: number, max: number): number {
    console.assert(min < max);
    return Math.random() * (max - min) + min;
  }

  nextBoolean() : boolean{
      return this.nextInteger(0, 2) === 1? true: false;
  }
}

abstract class ObjectGenerator<T>{
    abstract next(generator: Generator) : T;
    generate(count: number, generator: Generator) : T[]{
        const array = [];
        for(let i = 0; i < count; i++){
            array.push(this.next(generator));
        }

        return array;
    }
}

interface Person{
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly age: number;
}

class PersonGenerator extends ObjectGenerator<Person>{
    private static FirstNames = ["Carlos", "Maria", "Pedro", "Carl", "Homero", "Louis", "Jessica", "Diane", "Donald", "Amelia", "Rose"];
    private static LastNames = ["Xi", "Acosta", "Sky", "Blue", "Lemon", "Thomson", "Hills", "Calson", "Phill", "Rodriguez", "White"];

    next(generator: Generator) : Person{
        const id = generator.nextID();
        const firstName = PersonGenerator.FirstNames[generator.nextInteger(0, PersonGenerator.FirstNames.length)];
        const lastName = PersonGenerator.LastNames[generator.nextInteger(0, PersonGenerator.LastNames.length)];
        const age = generator.nextInteger(15, 40);
        return { id, firstName, lastName, age }
    }
}

const gen = new SimpleGenerator();
const personGen = new PersonGenerator();