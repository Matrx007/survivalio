import { HashMap } from "../util/data/HashMap";
import { VectorKey } from "../util/data/VectorKey";
import { Chunk } from "./Chunk";
import { WorldObject } from "./WorldObject";

export class World {
    readonly CHUNK_SIZE: number = 256;

    private chunks: HashMap<Chunk>;
    
    constructor() {
        this.chunks = new HashMap();
    }

    public add(object: WorldObject): void {   
        this.addObjectToArea(object, this.boundsToChunks([
            object.x, object.y, object.width, object.height
        ]));
    }

    public remove(object: WorldObject): void {
        this.removeObjectFromArea(object, this.boundsToChunks([
            object.x, object.y, object.width, object.height
        ]));
    }

    public move(object: WorldObject): void { 
        this.removeObjectFromArea(object, this.boundsToChunks([
            object._prevX, object._prevY, object._prevWidth, object._prevHeight
        ]));

        this.addObjectToArea(object, this.boundsToChunks([
            object.x, object.y, object.width, object.height
        ]));
    }


    // ### UTIL ###
    
    public boundsToChunks(
        bounds: [number, number, number, number]
    ): [VectorKey, VectorKey] {
        return [
            new VectorKey(
                Math.floor(bounds[0] / this.CHUNK_SIZE),
                    Math.floor(bounds[1] / this.CHUNK_SIZE)),
            new VectorKey(
                Math.floor((bounds[0] + bounds[2]) / this.CHUNK_SIZE),
                Math.floor((bounds[1] + bounds[3]) / this.CHUNK_SIZE))
        ];
    }
    
    public boundsToOuterChunks(
        bounds: [number, number, number, number]
    ): [VectorKey, VectorKey] {
        return [
            new VectorKey(
                Math.floor(bounds[0] / this.CHUNK_SIZE),
                    Math.floor(bounds[1] / this.CHUNK_SIZE)),
            new VectorKey(
                Math.ceil((bounds[0] + bounds[2]) / this.CHUNK_SIZE),
                Math.ceil((bounds[1] + bounds[3]) / this.CHUNK_SIZE))
        ];
    }
    
    public coordinateToChunk(x: number, y: number): VectorKey {
        return new VectorKey(
                Math.floor(x / this.CHUNK_SIZE),
                Math.floor(y / this.CHUNK_SIZE));
    }

    public addObjectToArea(
        object: WorldObject,          
        area: [VectorKey, VectorKey]
    ) {
        let key: VectorKey;
        let chunk: Chunk;
        
        for(let x = area[0].x; x <= area[1].x; x++) {
            for(let y = area[0].y; y <= area[1].y; y++) {
                key = new VectorKey(x, y);

                if((chunk = this.chunks.get(key)) != null) {
                    chunk.objects.push(object);
                } else {
                    chunk = new Chunk(x, y);
                    chunk.objects = [object];
                    this.chunks.put(key, chunk);
                }
            }
        }
    }

    public removeObjectFromArea(
        object: WorldObject,
        area: [VectorKey, VectorKey]
    ) {
        let key: VectorKey;
        let chunk: Chunk;
        
        for(let x = area[0].x; x <= area[1].x; x++) {
            for(let y = area[0].y; y <= area[1].y; y++) {
                key = new VectorKey(x, y);

                if((chunk = this.chunks.get(key)) != null) {
                    chunk.objects.splice(chunk.objects.indexOf(object), 1);
                }
            }
        }
    }

    // Might contain null elements
    public returnArea(
        area: [VectorKey, VectorKey]
    ): Chunk[] {
        if(area[0].x > area[1].x || area[0].y > area[1].y) {
            console.log("Area has negative width and/or height");
            return null;
        }

        let areaWidth  = area[1].x-area[0].x;
        let areaHeight = area[1].y-area[0].y;
        let chunks: Chunk[] = [];
        let chunk: VectorKey;

        for(let i = area[0].x; i < areaWidth+area[0].x; i++) {
            for(let j = area[0].y; j < areaHeight+area[0].y; j++) {
                chunks[j*areaWidth+i] = this.chunks.get(new VectorKey(i, j));
            }
        }

        return chunks;
    }
}