import { WorldObject } from "./WorldObject";

export class Chunk {
    objects : WorldObject[];
    chunkX: number;
    chunkY: number;

    public constructor(chunkX: number, chunkY: number) {
        this.objects = [];
        this.chunkX = chunkX;
        this.chunkY = chunkY;
    }
}