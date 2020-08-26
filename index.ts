/* tslint:disable: no-console */
import './src/Query';
import { measureTimeAndLog, measureAverageTimeAndLog, repeat } from './src/Iterables/Utils';

const elements = [1,2,3,4,5];

interface IClone<This extends IClone<This>>{
    clone() : This;
}

class Person implements IClone<Person>{
    readonly name: string;

    constructor(name: string){
        this.name = name;
    }

    clone(): Person {
        throw new Error('Method not implemented.');
    }
}

const p = new Person("Fred");
console.log(p.clone());