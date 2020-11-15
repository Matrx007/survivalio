import { Renderable } from "../Renderable";
import { VectorKey } from "../util/data/VectorKey";
import { Chunk } from "./Chunk";
import { World } from "./World";

export class WorldController {

    // ### WORLD ###
    world : World;

    // ### CAMERA ###
    visibleChunkBounds : [VectorKey, VectorKey];
    cameraX : number = 0;
    cameraY : number = 0;
    viewWidth  : number = 0;
    viewHeight : number = 0;

    // ### CHUNKS ###
    visibleChunks : Chunk[];

    // ### RENDERING ###
    tickCounter : number = 0;

    // ### RENDERABLES ###
    renderables : Renderable[];
    numVertices : number;

    public constructor(world : World) {
        
        // ### WORLD ###
        this.world = world;

        // ### RENDERABLES ###
        this.renderables = [];
    }

    // ### OBJECT MANAGING ###

    public update() : void {

        // Clear renderables array & vertices count
        this.renderables = [];
        this.numVertices = 0;
        
        // Calcualte visible chunks' bounds
        this.visibleChunkBounds = this.world.boundsToOuterChunks(
            [this.cameraX, this.cameraY, this.viewWidth, this.viewHeight]
        );
        
        // Collect visible all chunks
        this.visibleChunks = this.world.returnArea(this.visibleChunkBounds);

        // Increase tick, used to avoid updating same object multiple times
        this.tickCounter++;

        // For each on-screen chunk
        this.visibleChunks.forEach((c) => {
            
            // If chunk is not null
            if(c != null) {

                // For each object in chunk
                c.objects.forEach((o) => {

                    // If object already updated this frame, skip
                    if(o.lastUpdated == this.tickCounter) return;
                    o.lastUpdated = this.tickCounter;

                    // Store previous values
                    o._prevX = o.x;
                    o._prevY = o.y;
                    o._prevWidth = o.width;
                    o._prevHeight = o.height;

                    // Tick/update the object
                    o.update();

                    // Collect renderables & count vertices
                    this.renderables.push(o.renderable);
                    this.numVertices += o.renderable.numVertices;

                    // Move the object to new chunks
                    this.world.move(o);
                });
            }
        });
    }


}