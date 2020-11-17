import { Hashable } from "../util/data/Hashable";
import { IDGenerator } from "../util/data/IDGenerator";

export abstract class WorldObject implements Hashable {
    lastRendered: number = 0;  // Used in WorldController to prevent rendering one object multiple times
    lastUpdated: number = 0; // Used in WorldController to prevent rendering one object multiple times

    readonly id: number = IDGenerator.getNextID();

    x: number;
    y: number;
    width: number;
    height: number;

    _prevX: number;
    _prevY: number;
    _prevWidth: number;
    _prevHeight: number;

    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public abstract setup(): void;
    public abstract update(): void;
    public abstract render(offX: number, offY: number): void;

    
    hash(): number {
        return this.id;
    }

    equals(other: Hashable): boolean {
        if(other.constructor == this.constructor) {
            return other.hash() == this.id;
        } else {
            return false;
        }
    }
}