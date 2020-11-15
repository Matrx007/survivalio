import {Key} from "./HashMap";

export class VectorKey implements Key {
    readonly hash: number;
    readonly x: number;
    readonly y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        let hash = 17 * 31 + this.x;
        this.hash = hash * 31 + this.y;
    }

    public hashcode(): number {
        return this.hash;
    }

    public equals(other: Key): boolean {
        if(other instanceof VectorKey) {
            return (this.x == other.x) && (this.y == other.y);
        } else return false;
    }
}