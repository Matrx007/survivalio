import {Referable} from "./Referable";
import {Key} from "./HashMap";

export class ReferableKey<KEY extends Referable> implements Key {
    readonly hash: number;
    readonly value: KEY;

    public constructor(value: KEY) {
        this.value = value;
        this.hash = value._id_;
    }

    public hashcode(): number {
        return this.value._id_;
    }

    public equals(other: Key): boolean {
        if(other instanceof ReferableKey) {
            return this.value._id_ == other.value._id_;
        } else return false;
    }
}