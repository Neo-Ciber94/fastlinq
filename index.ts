/* tslint:disable: no-console max-classes-per-file */

import { measureAverageTimeAndLog } from "./src/Utils/measureAverageTimeAndLog";
import './src/Query';
import { Query } from './src/Query';


abstract class RngGenerator {
  abstract nextID(): number;
  abstract nextString(maxLength: number, validChars?: string): string;
  abstract nextInteger(min: number, max: number): number;
  abstract nextDouble(min: number, max: number): number;
  abstract nextBoolean() : boolean;

  next<T>(generator: (generator: RngGenerator) => T) : T{
    return generator(this);
  }

  generate<T>(count: number, generator: (generator: RngGenerator) => T) : T[]{
    const array = new Array<T>();
    for(let i = 0; i < count; i++){
      array.push(this.next(generator));
    }
    return array;
  }
}

class SimpleGenerator extends RngGenerator {
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

interface Person{
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly age: number;
}

const rngGenerator = new SimpleGenerator();

const firstNamesList = ["Carlos", "Maria", "Pedro", "Carl", "Homero", "Louis", "Jessica", "Diane", "Donald", "Amelia", "Rose"];
const lastNamesList = ["Xi", "Acosta", "Sky", "Blue", "Lemon", "Thomson", "Hills", "Calson", "Phill", "Rodriguez", "White"];

const persons = rngGenerator.generate<Person>(10, (generator) => {
  const id = generator.nextID();
  const firstName = firstNamesList[generator.nextInteger(0, firstNamesList.length)];
  const lastName = lastNamesList[generator.nextInteger(0, lastNamesList.length)];
  const age = generator.nextInteger(15, 40);
  return { id, firstName, lastName, age }
})

// for (const e of persons) {
//   console.log(e)
// }