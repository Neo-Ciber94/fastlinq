import { MathRng } from "./Rng";

export const enum Gender{
    Male = 1,
    Female = 2
}

export enum Job{
    Unemployed,
    Student,
    Teacher,
    Cook,
    Programer,
    Doctor,
    Scientist,
    Veterinary,
    Police
}

export interface Person{
    readonly name: string;
    readonly lastName: string;
    readonly gender: Gender;
    readonly job: Job;
    readonly salary: number;
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
        const job = rng.nextInteger(0, 8);
        const salary = job === Job.Unemployed? 0: rng.nextInteger(1000, 100_000);
        const age = rng.nextInteger(16, 60);

        result.push({name, lastName, gender, job, salary, age});
    }
    return result;
}

export const persons : Person[] = [
    {
      name: 'Yamato',
      lastName: 'Gray',
      gender: 1,
      job: 2,
      salary: 90710,
      age: 58
    },
    {
      name: 'Rose',
      lastName: 'Li',
      gender: 2,
      job: 5,
      salary: 60775,
      age: 49
    },
    {
      name: 'Pedro',
      lastName: 'Simpson',
      gender: 2,
      job: 8,
      salary: 51719,
      age: 25
    },
    {
      name: 'Maria',
      lastName: 'Sugimori',
      gender: 2,
      job: 7,
      salary: 2344,
      age: 18
    },
    {
      name: 'Yamato',
      lastName: 'Rodriguez',
      gender: 1,
      job: 7,
      salary: 56559,
      age: 60
    },
    {
      name: 'Lisa',
      lastName: 'West',
      gender: 2,
      job: 5,
      salary: 23529,
      age: 21
    },
    {
      name: 'Carlos',
      lastName: 'Rodriguez',
      gender: 1,
      job: 3,
      salary: 52246,
      age: 36
    },
    {
      name: 'Rebeca',
      lastName: 'Sugimori',
      gender: 2,
      job: 7,
      salary: 49833,
      age: 45
    },
    {
      name: 'Louis',
      lastName: 'Thomson',
      gender: 2,
      job: 4,
      salary: 45661,
      age: 18
    },
    {
      name: 'Jhon',
      lastName: 'Garcia',
      gender: 1,
      job: 7,
      salary: 59991,
      age: 17
    },
    {
      name: 'Carl',
      lastName: 'Simpson',
      gender: 1,
      job: 6,
      salary: 84080,
      age: 23
    },
    {
      name: 'Maria',
      lastName: 'Jumper',
      gender: 2,
      job: 0,
      salary: 0,
      age: 32
    },
    {
      name: 'Rose',
      lastName: 'Gray',
      gender: 1,
      job: 7,
      salary: 49107,
      age: 26
    },
    {
      name: 'Lisa',
      lastName: 'Jumper',
      gender: 2,
      job: 4,
      salary: 13119,
      age: 50
    },
    {
      name: 'Carl',
      lastName: 'Garcia',
      gender: 2,
      job: 1,
      salary: 99891,
      age: 37
    },
    {
      name: 'Rebeca',
      lastName: 'Garcia',
      gender: 2,
      job: 0,
      salary: 0,
      age: 44
    },
    {
      name: 'Carlos',
      lastName: 'Li',
      gender: 1,
      job: 3,
      salary: 55724,
      age: 46
    },
    {
      name: 'Fred',
      lastName: 'Night',
      gender: 2,
      job: 8,
      salary: 81832,
      age: 54
    },
    {
      name: 'Yamato',
      lastName: 'Garcia',
      gender: 2,
      job: 1,
      salary: 41208,
      age: 38
    },
    {
      name: 'Yamato',
      lastName: 'Simpson',
      gender: 1,
      job: 4,
      salary: 89595,
      age: 39
    },
    {
      name: 'Pedro',
      lastName: 'Thomson',
      gender: 2,
      job: 7,
      salary: 24443,
      age: 57
    },
    {
      name: 'Maria',
      lastName: 'Night',
      gender: 2,
      job: 3,
      salary: 47502,
      age: 17
    },
    {
      name: 'Alina',
      lastName: 'Garcia',
      gender: 2,
      job: 0,
      salary: 0,
      age: 34
    },
    {
      name: 'Yamato',
      lastName: 'Li',
      gender: 1,
      job: 2,
      salary: 61293,
      age: 36
    },
    {
      name: 'Louis',
      lastName: 'Rodriguez',
      gender: 1,
      job: 8,
      salary: 55704,
      age: 47
    },
    {
      name: 'Rebeca',
      lastName: 'Li',
      gender: 2,
      job: 6,
      salary: 71060,
      age: 32
    },
    {
      name: 'Maria',
      lastName: 'Thomson',
      gender: 1,
      job: 5,
      salary: 29316,
      age: 43
    },
    {
      name: 'Maria',
      lastName: 'Night',
      gender: 1,
      job: 3,
      salary: 27554,
      age: 58
    },
    {
      name: 'Maria',
      lastName: 'Tesla',
      gender: 2,
      job: 4,
      salary: 96655,
      age: 39
    },
    {
      name: 'Rebeca',
      lastName: 'Gray',
      gender: 1,
      job: 5,
      salary: 47564,
      age: 51
    },
    {
      name: 'Rose',
      lastName: 'Jumper',
      gender: 2,
      job: 5,
      salary: 27773,
      age: 45
    },
    {
      name: 'Louis',
      lastName: 'Garcia',
      gender: 1,
      job: 5,
      salary: 67547,
      age: 44
    },
    {
      name: 'Carl',
      lastName: 'Garcia',
      gender: 1,
      job: 7,
      salary: 77526,
      age: 27
    },
    {
      name: 'Yamato',
      lastName: 'Jumper',
      gender: 2,
      job: 5,
      salary: 43831,
      age: 46
    },
    {
      name: 'Fred',
      lastName: 'Garcia',
      gender: 2,
      job: 7,
      salary: 53867,
      age: 42
    },
    {
      name: 'Pedro',
      lastName: 'Sugimori',
      gender: 1,
      job: 4,
      salary: 37697,
      age: 36
    },
    {
      name: 'Jhon',
      lastName: 'Li',
      gender: 1,
      job: 6,
      salary: 62564,
      age: 21
    },
    {
      name: 'Pedro',
      lastName: 'West',
      gender: 2,
      job: 2,
      salary: 34811,
      age: 32
    },
    {
      name: 'Rebeca',
      lastName: 'Thomson',
      gender: 2,
      job: 3,
      salary: 16961,
      age: 41
    },
    {
      name: 'Yamato',
      lastName: 'Simpson',
      gender: 2,
      job: 6,
      salary: 74169,
      age: 47
    },
    {
      name: 'Alina',
      lastName: 'Tesla',
      gender: 1,
      job: 8,
      salary: 49160,
      age: 44
    },
    {
      name: 'Jhon',
      lastName: 'Sugimori',
      gender: 1,
      job: 7,
      salary: 2292,
      age: 36
    },
    {
      name: 'Carlos',
      lastName: 'Garcia',
      gender: 1,
      job: 0,
      salary: 0,
      age: 53
    },
    {
      name: 'Fred',
      lastName: 'Li',
      gender: 2,
      job: 1,
      salary: 86525,
      age: 39
    },
    {
      name: 'Yamato',
      lastName: 'Li',
      gender: 2,
      job: 0,
      salary: 0,
      age: 44
    },
    {
      name: 'Pedro',
      lastName: 'Gray',
      gender: 2,
      job: 6,
      salary: 88411,
      age: 19
    },
    {
      name: 'Pedro',
      lastName: 'Night',
      gender: 1,
      job: 2,
      salary: 15014,
      age: 53
    },
    {
      name: 'Carl',
      lastName: 'Garcia',
      gender: 2,
      job: 8,
      salary: 48529,
      age: 49
    },
    {
      name: 'Louis',
      lastName: 'Gray',
      gender: 1,
      job: 4,
      salary: 12432,
      age: 55
    },
    {
      name: 'Fred',
      lastName: 'Gray',
      gender: 2,
      job: 5,
      salary: 70527,
      age: 43
    },
    {
      name: 'Yamato',
      lastName: 'Gray',
      gender: 1,
      job: 2,
      salary: 39110,
      age: 46
    },
    {
      name: 'Yamato',
      lastName: 'Tesla',
      gender: 2,
      job: 5,
      salary: 71131,
      age: 49
    },
    {
      name: 'Carl',
      lastName: 'Li',
      gender: 1,
      job: 8,
      salary: 1616,
      age: 37
    },
    {
      name: 'Pedro',
      lastName: 'West',
      gender: 2,
      job: 0,
      salary: 0,
      age: 34
    },
    {
      name: 'Pedro',
      lastName: 'Thomson',
      gender: 2,
      job: 6,
      salary: 41168,
      age: 25
    },
    {
      name: 'Lisa',
      lastName: 'Simpson',
      gender: 2,
      job: 4,
      salary: 60456,
      age: 30
    },
    {
      name: 'Yamato',
      lastName: 'Simpson',
      gender: 1,
      job: 5,
      salary: 51711,
      age: 24
    },
    {
      name: 'Lisa',
      lastName: 'Simpson',
      gender: 2,
      job: 0,
      salary: 0,
      age: 56
    },
    {
      name: 'Fred',
      lastName: 'Rodriguez',
      gender: 2,
      job: 2,
      salary: 33691,
      age: 19
    },
    {
      name: 'Fred',
      lastName: 'Gray',
      gender: 2,
      job: 1,
      salary: 41176,
      age: 47
    },
    {
      name: 'Carlos',
      lastName: 'Tesla',
      gender: 2,
      job: 7,
      salary: 51553,
      age: 27
    },
    {
      name: 'Carlos',
      lastName: 'Jumper',
      gender: 1,
      job: 7,
      salary: 86659,
      age: 38
    },
    {
      name: 'Carlos',
      lastName: 'Li',
      gender: 1,
      job: 5,
      salary: 12031,
      age: 25
    },
    {
      name: 'Jhon',
      lastName: 'Gray',
      gender: 1,
      job: 2,
      salary: 87876,
      age: 29
    },
    {
      name: 'Alina',
      lastName: 'Li',
      gender: 1,
      job: 1,
      salary: 86054,
      age: 24
    },
    {
      name: 'Yamato',
      lastName: 'Tesla',
      gender: 2,
      job: 8,
      salary: 67846,
      age: 20
    },
    {
      name: 'Yamato',
      lastName: 'Sugimori',
      gender: 2,
      job: 4,
      salary: 19130,
      age: 29
    },
    {
      name: 'Maria',
      lastName: 'Night',
      gender: 1,
      job: 4,
      salary: 92198,
      age: 16
    },
    {
      name: 'Carl',
      lastName: 'Thomson',
      gender: 1,
      job: 8,
      salary: 48687,
      age: 49
    },
    {
      name: 'Carl',
      lastName: 'Gray',
      gender: 1,
      job: 1,
      salary: 45239,
      age: 60
    },
    {
      name: 'Fred',
      lastName: 'Jumper',
      gender: 2,
      job: 2,
      salary: 94509,
      age: 16
    },
    {
      name: 'Louis',
      lastName: 'Jumper',
      gender: 1,
      job: 7,
      salary: 48460,
      age: 19
    },
    {
      name: 'Alina',
      lastName: 'Li',
      gender: 2,
      job: 4,
      salary: 28023,
      age: 43
    },
    {
      name: 'Pedro',
      lastName: 'Night',
      gender: 2,
      job: 8,
      salary: 89524,
      age: 57
    },
    {
      name: 'Jhon',
      lastName: 'Gray',
      gender: 1,
      job: 3,
      salary: 46347,
      age: 31
    },
    {
      name: 'Jhon',
      lastName: 'Jumper',
      gender: 1,
      job: 6,
      salary: 94724,
      age: 39
    },
    {
      name: 'Alina',
      lastName: 'West',
      gender: 1,
      job: 6,
      salary: 47808,
      age: 28
    },
    {
      name: 'Alina',
      lastName: 'Rodriguez',
      gender: 1,
      job: 0,
      salary: 0,
      age: 45
    },
    {
      name: 'Yamato',
      lastName: 'Li',
      gender: 1,
      job: 1,
      salary: 78971,
      age: 40
    },
    {
      name: 'Rebeca',
      lastName: 'West',
      gender: 1,
      job: 0,
      salary: 0,
      age: 59
    },
    {
      name: 'Alina',
      lastName: 'Gray',
      gender: 1,
      job: 6,
      salary: 21883,
      age: 46
    },
    {
      name: 'Fred',
      lastName: 'Night',
      gender: 1,
      job: 7,
      salary: 85693,
      age: 41
    },
    {
      name: 'Rebeca',
      lastName: 'Night',
      gender: 1,
      job: 3,
      salary: 77003,
      age: 16
    },
    {
      name: 'Maria',
      lastName: 'Tesla',
      gender: 1,
      job: 0,
      salary: 0,
      age: 32
    },
    {
      name: 'Lisa',
      lastName: 'Li',
      gender: 2,
      job: 7,
      salary: 70337,
      age: 49
    },
    {
      name: 'Pedro',
      lastName: 'Night',
      gender: 1,
      job: 0,
      salary: 0,
      age: 18
    },
    {
      name: 'Carl',
      lastName: 'Sugimori',
      gender: 1,
      job: 4,
      salary: 42747,
      age: 55
    },
    {
      name: 'Lisa',
      lastName: 'Tesla',
      gender: 2,
      job: 2,
      salary: 44357,
      age: 52
    },
    {
      name: 'Rose',
      lastName: 'Sugimori',
      gender: 1,
      job: 0,
      salary: 0,
      age: 26
    },
    {
      name: 'Louis',
      lastName: 'Gray',
      gender: 1,
      job: 2,
      salary: 57857,
      age: 35
    },
    {
      name: 'Alina',
      lastName: 'Garcia',
      gender: 1,
      job: 3,
      salary: 25260,
      age: 30
    },
    {
      name: 'Lisa',
      lastName: 'Rodriguez',
      gender: 1,
      job: 6,
      salary: 24951,
      age: 30
    },
    {
      name: 'Carl',
      lastName: 'Rodriguez',
      gender: 2,
      job: 1,
      salary: 25623,
      age: 56
    },
    {
      name: 'Maria',
      lastName: 'West',
      gender: 2,
      job: 4,
      salary: 32738,
      age: 45
    },
    {
      name: 'Rebeca',
      lastName: 'Sugimori',
      gender: 2,
      job: 7,
      salary: 45713,
      age: 49
    },
    {
      name: 'Carl',
      lastName: 'Simpson',
      gender: 1,
      job: 7,
      salary: 36747,
      age: 43
    },
    {
      name: 'Carl',
      lastName: 'Night',
      gender: 2,
      job: 6,
      salary: 72371,
      age: 34
    },
    {
      name: 'Carl',
      lastName: 'Tesla',
      gender: 1,
      job: 2,
      salary: 95625,
      age: 39
    },
    {
      name: 'Louis',
      lastName: 'West',
      gender: 1,
      job: 4,
      salary: 73060,
      age: 58
    },
    {
      name: 'Pedro',
      lastName: 'West',
      gender: 1,
      job: 8,
      salary: 19341,
      age: 60
    }
  ];