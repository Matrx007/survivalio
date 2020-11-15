import { Renderable } from "./Renderable";
import { WebGLEngine } from "./WebGLEngine";
import { WebGLUtils } from "./WebGLUtils";

export class Test extends WebGLEngine {

    readonly renderable : Renderable = WebGLUtils.createRectangle(0, 0, 256, 256, 0xff404040);
    
    mouseX : number = 0;
    mouseY : number = 0;

    public constructor() {
        super({});
    }

    public init() : void {
        this.addRenderable(WebGLUtils.createRectangle(256, 256, 384, 384, 0x80c0c0c0));
        
        this.addRenderable(this.renderable);
    }

    public tick() : void {
        this.renderable.moveVoid(-this.mouseX, -this.mouseY);
        
        this.mouseX+=4;
        this.mouseY+=4;

        this.renderable.moveVoid(this.mouseX, this.mouseY);
    }

    public preRender() : void {

    }
}