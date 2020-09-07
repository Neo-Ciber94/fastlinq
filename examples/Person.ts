import { MathRng } from "./Rng";

export enum Gender{
    Male = 1,
    Female = 2
}

export interface Person{
    readonly name: string;
    readonly lastName: string;
    readonly gender: Gender;
    readonly age: number;
}

export function generatePersons(count: number) : Person[]{
    const firstNames : Readonly<string[]> = ["Maria", "Rose", "Louis", "Carl", "Fred", "Lisa", "Alina", "Rebeca", "Carlos", "Pedro", "Jhon", "Yamato"];
    const lastNames : Readonly<string[]> = ["Gray", "Rodriguez", "Garcia", "Thomson", "Li", "Simpson", "West", "Jumper", "Tesla", "Night", "Sugimori"];

    const rng = new MathRng();
    const result : Person[] = [];

    for (let i = 0; i < count; i++) {
        const name = firstNames[rng.nextInteger(0, firstNames.length - 1)];
        const lastName = lastNames[rng.nextInteger(0, lastNames.length - 1)];
        const gender : Gender = rng.nextBoolean()? Gender.Male: Gender.Female;
        const age = rng.nextInteger(16, 60);

        result.push({name, lastName, gender, age});
    }
    return result;
}

export const persons : Readonly<Person[]> =
[
  { name: 'Carl', lastName: 'Li', gender: 2, age: 46 },
  { name: 'Fred', lastName: 'Simpson', gender: 2, age: 26 },
  { name: 'Lisa', lastName: 'Thomson', gender: 2, age: 46 },
  { name: 'Lisa', lastName: 'West', gender: 2, age: 51 },
  { name: 'Fred', lastName: 'Jumper', gender: 2, age: 20 },
  { name: 'Yamato', lastName: 'Gray', gender: 1, age: 22 },
  { name: 'Carl', lastName: 'Thomson', gender: 1, age: 47 },
  { name: 'Carl', lastName: 'Simpson', gender: 2, age: 46 },
  { name: 'Carlos', lastName: 'West', gender: 1, age: 33 },
  { name: 'Yamato', lastName: 'Gray', gender: 1, age: 41 },
  { name: 'Jhon', lastName: 'West', gender: 1, age: 17 },
  { name: 'Yamato', lastName: 'Li', gender: 2, age: 57 },
  { name: 'Pedro', lastName: 'Rodriguez', gender: 1, age: 43 },
  { name: 'Carl', lastName: 'Jumper', gender: 1, age: 20 },
  { name: 'Maria', lastName: 'Garcia', gender: 1, age: 27 },
  { name: 'Carlos', lastName: 'Night', gender: 1, age: 31 },
  { name: 'Carlos', lastName: 'Tesla', gender: 2, age: 22 },
  { name: 'Pedro', lastName: 'Garcia', gender: 1, age: 36 },
  { name: 'Maria', lastName: 'Night', gender: 2, age: 46 },
  { name: 'Rebeca', lastName: 'Tesla', gender: 1, age: 28 },
  { name: 'Yamato', lastName: 'Thomson', gender: 2, age: 25 },
  { name: 'Rebeca', lastName: 'Night', gender: 1, age: 26 },
  { name: 'Fred', lastName: 'Gray', gender: 1, age: 50 },
  { name: 'Lisa', lastName: 'Sugimori', gender: 1, age: 59 },
  { name: 'Carlos', lastName: 'Garcia', gender: 1, age: 17 },
  { name: 'Pedro', lastName: 'Li', gender: 1, age: 35 },
  { name: 'Fred', lastName: 'Li', gender: 1, age: 36 },
  { name: 'Lisa', lastName: 'Tesla', gender: 1, age: 32 },
  { name: 'Fred', lastName: 'Simpson', gender: 1, age: 58 },
  { name: 'Jhon', lastName: 'Sugimori', gender: 1, age: 21 },
  { name: 'Carl', lastName: 'Simpson', gender: 2, age: 60 },
  { name: 'Alina', lastName: 'Sugimori', gender: 1, age: 32 },
  { name: 'Rose', lastName: 'Li', gender: 1, age: 26 },
  { name: 'Maria', lastName: 'Garcia', gender: 1, age: 33 },
  { name: 'Louis', lastName: 'West', gender: 2, age: 50 },
  { name: 'Pedro', lastName: 'Rodriguez', gender: 1, age: 34 },
  { name: 'Maria', lastName: 'Rodriguez', gender: 2, age: 30 },
  { name: 'Lisa', lastName: 'Sugimori', gender: 2, age: 19 },
  { name: 'Pedro', lastName: 'West', gender: 1, age: 34 },
  { name: 'Carl', lastName: 'Sugimori', gender: 1, age: 59 },
  { name: 'Carlos', lastName: 'Sugimori', gender: 2, age: 25 },
  { name: 'Alina', lastName: 'Rodriguez', gender: 2, age: 56 },
  { name: 'Jhon', lastName: 'Li', gender: 2, age: 35 },
  { name: 'Fred', lastName: 'Simpson', gender: 1, age: 51 },
  { name: 'Pedro', lastName: 'Simpson', gender: 1, age: 33 },
  { name: 'Fred', lastName: 'Tesla', gender: 2, age: 38 },
  { name: 'Carlos', lastName: 'Jumper', gender: 1, age: 33 },
  { name: 'Rebeca', lastName: 'West', gender: 2, age: 18 },
  { name: 'Lisa', lastName: 'Thomson', gender: 1, age: 22 },
  { name: 'Louis', lastName: 'Thomson', gender: 1, age: 38 },
  { name: 'Rebeca', lastName: 'Thomson', gender: 2, age: 23 },
  { name: 'Rose', lastName: 'Gray', gender: 2, age: 51 },
  { name: 'Fred', lastName: 'Sugimori', gender: 1, age: 31 },
  { name: 'Alina', lastName: 'Li', gender: 2, age: 55 },
  { name: 'Rose', lastName: 'Garcia', gender: 1, age: 28 },
  { name: 'Louis', lastName: 'Garcia', gender: 2, age: 30 },
  { name: 'Carlos', lastName: 'Jumper', gender: 2, age: 16 },
  { name: 'Maria', lastName: 'Garcia', gender: 2, age: 47 },
  { name: 'Jhon', lastName: 'West', gender: 2, age: 29 },
  { name: 'Lisa', lastName: 'Tesla', gender: 1, age: 17 },
  { name: 'Rose', lastName: 'Simpson', gender: 1, age: 49 },
  { name: 'Yamato', lastName: 'Thomson', gender: 2, age: 54 },
  { name: 'Alina', lastName: 'Gray', gender: 2, age: 32 },
  { name: 'Pedro', lastName: 'Gray', gender: 2, age: 46 },
  { name: 'Rebeca', lastName: 'Li', gender: 2, age: 29 },
  { name: 'Lisa', lastName: 'Thomson', gender: 2, age: 40 },
  { name: 'Yamato', lastName: 'West', gender: 2, age: 24 },
  { name: 'Carlos', lastName: 'Rodriguez', gender: 2, age: 42 },
  { name: 'Fred', lastName: 'Night', gender: 2, age: 24 },
  { name: 'Fred', lastName: 'Sugimori', gender: 2, age: 18 },
  { name: 'Pedro', lastName: 'Garcia', gender: 2, age: 19 },
  { name: 'Alina', lastName: 'Rodriguez', gender: 1, age: 39 },
  { name: 'Lisa', lastName: 'Gray', gender: 1, age: 35 },
  { name: 'Carl', lastName: 'Sugimori', gender: 2, age: 41 },
  { name: 'Pedro', lastName: 'Gray', gender: 1, age: 26 },
  { name: 'Yamato', lastName: 'Thomson', gender: 2, age: 53 },
  { name: 'Carl', lastName: 'Sugimori', gender: 1, age: 43 },
  { name: 'Fred', lastName: 'Jumper', gender: 1, age: 53 },
  { name: 'Rebeca', lastName: 'Night', gender: 1, age: 20 },
  { name: 'Rose', lastName: 'Garcia', gender: 2, age: 57 },
  { name: 'Rebeca', lastName: 'West', gender: 1, age: 34 },
  { name: 'Pedro', lastName: 'Rodriguez', gender: 2, age: 39 },
  { name: 'Maria', lastName: 'West', gender: 1, age: 52 },
  { name: 'Pedro', lastName: 'Jumper', gender: 1, age: 20 },
  { name: 'Maria', lastName: 'Jumper', gender: 1, age: 58 },
  { name: 'Jhon', lastName: 'Jumper', gender: 2, age: 49 },
  { name: 'Louis', lastName: 'Gray', gender: 1, age: 26 },
  { name: 'Rose', lastName: 'Garcia', gender: 1, age: 44 },
  { name: 'Maria', lastName: 'Tesla', gender: 2, age: 40 },
  { name: 'Maria', lastName: 'Rodriguez', gender: 2, age: 31 },
  { name: 'Fred', lastName: 'Sugimori', gender: 1, age: 45 },
  { name: 'Rose', lastName: 'West', gender: 1, age: 53 },
  { name: 'Pedro', lastName: 'Jumper', gender: 2, age: 34 },
  { name: 'Louis', lastName: 'Tesla', gender: 1, age: 59 },
  { name: 'Yamato', lastName: 'Night', gender: 1, age: 36 },
  { name: 'Alina', lastName: 'Li', gender: 2, age: 27 },
  { name: 'Pedro', lastName: 'Night', gender: 1, age: 35 },
  { name: 'Yamato', lastName: 'West', gender: 1, age: 24 },
  { name: 'Lisa', lastName: 'Garcia', gender: 2, age: 40 },
  { name: 'Maria', lastName: 'Jumper', gender: 1, age: 17 }
];
