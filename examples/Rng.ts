
export abstract class Rng{
    abstract sample() : number;

    nextInteger(range: {min?: number, max?: number}) : number;
    nextInteger(min?: number, max?: number) : number;
    nextInteger(first?: any, second?: any) : number{
        let min: number | undefined;
        let max: number | undefined;

        if(first.min || first.max){
            min = first.min;
            max = first.max;
        }
        else{
            min = first;
            max = second;
        }

        if(min && max && (min > max)){
            throw new Error("min cannot be equals to max");
        }

        min ??= Number.MIN_SAFE_INTEGER;
        max ??= Number.MAX_SAFE_INTEGER;

        min = Math.round(min);
        max = Math.round(max);

        if(min === max){
            return min;
        }

        return Math.floor((this.sample() * (max - min + 1)) + min);
    }

    nextChar(validChars?: string) : string{
        if(validChars){
            return validChars.charAt(this.nextInteger(0, validChars.length - 1));
        }

        switch(this.nextInteger(0, 2)){
            case 0: // number
                return String.fromCharCode(this.nextInteger(48, 57));
            case 1: // upper case
                return String.fromCharCode(this.nextInteger(65, 90));
            case 2: // lower case
                return String.fromCharCode(this.nextInteger(97, 122));
            default:
                throw new Error("ups!")
        }
    }

    nextString(minLength: number = 8, maxLength: number = 8, validChars?: string) : string{
        if(minLength > maxLength){
            throw new Error("minLength cannot be greater than maxLength");
        }

        const length = this.nextInteger(minLength, maxLength);
        const buffer : string[] = [];

        for(let i = 0; i < length; i++){
            buffer.push(this.nextChar(validChars));
        }

        return buffer.join("");
    }

    nextBoolean() : boolean{
        return this.nextInteger(0, 1) === 0;
    }

    shuffle<T>(elements: T[]){
        for (let i = 0; i < elements.length; i++) {
            const newIndex = this.nextInteger(0, elements.length - 1);
            const temp = elements[i];
            elements[i] = elements[newIndex]
            elements[newIndex] = temp;
        }
    }
}

export class MathRng extends Rng{
    sample(): number {
        return Math.random();
    }
}