import { Renderable } from "./Renderable";
import { WebGLEngine } from "./WebGLEngine";
import { WebGLUtils } from "./WebGLUtils";
import { Input } from "./Input";

export class Test extends WebGLEngine {

    readonly renderable : Renderable = WebGLUtils.createRectangle(0, 0, 256, 256, 0xff404040);
    
    mouseX : number = 0;
    mouseY : number = 0;

    input : Input;

    public constructor() {
        super({});

        this.input = new Input(this.canvas);
        this.input.addEventListeners();
    }

    public init() : void {
        this.addRenderable(WebGLUtils.createRectangle(256, 256, 384, 384, 0x80c0c0c0));
        
        this.addRenderable(this.renderable);
    }

    public tick() : void {
        if(this.input.keys[" "]) return;

        this.renderable.moveVoid(-this.mouseX, -this.mouseY);

        let speedX : number = 0;
        let speedY : number = 0;

        if(this.input.keys["w"] || this.input.keys["W"]) {
            speedY -= 8;
        }
        if(this.input.keys["s"] || this.input.keys["S"]) {
            speedY += 8;
        }
        if(this.input.keys["a"] || this.input.keys["A"]) {
            speedX -= 8;
        }
        if(this.input.keys["d"] || this.input.keys["D"]) {
            speedX += 8;
        }
        
        this.mouseX+=speedX;
        this.mouseY+=speedY;

        this.renderable.moveVoid(this.mouseX, this.mouseY);
    }

    public preRender() : void {

    }
}