/* tslint:disable: no-console */

import "../src/Query"
import './Person';
import { Gender, Job, persons } from "./Person";

console.log(`Number people: ${persons.asQuery()
    .count()}`
)

console.log(`Number of unemployed older than 18: ${persons.asQuery()
    .filter(e => e.job === Job.Unemployed)
    .filter(e => e.age >= 18)
    .count()}`
)

console.log(`Number female with 20 years old: ${persons.asQuery()
    .filter(e => e.gender === Gender.Female)
    .filter(e => e.age === 20)
    .count()}`
)

console.log(`People who name starts with 'A':
${persons.asQuery()
    .filter(e => e.name.charAt(0).toLocaleLowerCase() === 'a')
    .toString('\n')}`
)