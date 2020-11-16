import { HashList } from "./HashList";
import { Key } from "./HashMap";

export class StringKey implements Key {
    value: string;

    public constructor(value: string) {
        this.value = value;
    }

    hashcode(): number {
        return hash(this.value);
    }

    equals(key: this): boolean {
        return key.value === this.value;
    }
}


export const hash = function(str: string) {
    let hash = 0, i: number, chr: number;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
}
// source: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
