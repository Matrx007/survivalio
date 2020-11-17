import { APP } from "..";
import { Particle } from "../particles/Particle";
import { VectorKey } from "../util/data/VectorKey";
import { Chunk } from "../world/Chunk";
import { World } from "../world/World";
import { game } from "./Game";
import { Player } from "./Player";

export class WorldController {

    // ### WORLD ###
    world: World;

    // ### CAMERA ###
    visibleChunkBounds: [VectorKey, VectorKey];
    cameraX: number = 0;
    cameraY: number = 0;

    // ### CHUNKS ###
    visibleChunks: Chunk[];

    // ### RENDERING ###
    frameCounter: number = 0;
    tickCounter: number = 0;

    public constructor() {
        // ### WORLD ###
        this.world = new World();
    }

    public update(): void {
        let t0 = performance.now();
        // ### WORLD ###

        // Calcualte visible chunks' bounds
        this.visibleChunkBounds = this.world.boundsToOuterChunks(
            [this.cameraX, this.cameraY, APP.renderer.width,APP.renderer.height]
        );
        
        // Collect visible all chunks
        this.visibleChunks = this.world.returnArea(this.visibleChunkBounds);

        // Update all visible object
        this.tickCounter++;
        this.visibleChunks.forEach((c) => {
            if(c != null) {
                c.objects.forEach((o) => {
                    if(o.lastUpdated == this.tickCounter) return;
                    o.lastUpdated = this.tickCounter;

                    // TODO: Move to separate function
                    o._prevX = o.x;
                    o._prevY = o.y;
                    o._prevWidth = o.width;
                    o._prevHeight = o.height;

                    o.update();

                    this.world.move(o);
                });
            }
        });
        let t1 = performance.now();
        // console.log("world update time: "+(t1-t0));
    }

    public render(): void {
        this.frameCounter++;
        let t0 = performance.now();
        this.visibleChunks.forEach((c) => {
            if(c != null) {
                c.objects.forEach((o) => {
                    if(o.lastRendered != this.frameCounter) {
                        o.lastRendered = this.frameCounter;
                        o.render(-this.cameraX, -this.cameraY);
                    }
                });

                
                /* if(c.objects.length > 0) {
                    game.graphics.beginFill(0xefefef);
                } else {
                    game.graphics.beginFill(0, 0);
                }
                game.graphics.lineStyle(1, 0x000000);
                game.graphics.drawRect(
                    c.chunkX * this.world.CHUNK_SIZE - this.cameraX,
                    c.chunkY * this.world.CHUNK_SIZE - this.cameraY,
                    this.world.CHUNK_SIZE,
                    this.world.CHUNK_SIZE
                );
                game.graphics.endFill(); */
            }
        });
        var t1 = performance.now();
        console.log("number of primitives: "+Particle.primitiveCounter);
        Particle.primitiveCounter = 0;
        console.log("time for rendering object: "+(60/(t1-t0)));
    }
}