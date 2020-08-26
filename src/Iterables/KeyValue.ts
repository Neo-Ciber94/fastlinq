
export class KeyValue<K, V>{
    readonly key: K;
    readonly value: V;

    constructor(key: K, value: V){
        this.key = key;
        this.value = value;
    }

    static from<K,V>(pair: [K, V]) : KeyValue<K, V>{
        return new KeyValue(pair[0], pair[1]);
    }
}