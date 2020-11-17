import { Graphics } from "pixi.js";
import { Input } from "../Input";
import { Bush } from "./particles/Bush";
import { Player } from "./Player";
import { WorldController } from "./WorldController";
import * as Keyboard from "pixi.js-keyboard";
import * as Mouse from "pixi.js-mouse";
import { APP } from "../index";

export class Game {
    // ### ENGINE ###
    readonly app: PIXI.Application;
    readonly graphics: PIXI.Graphics;
    private readonly inputGraphics: PIXI.Graphics;

    // ### WORLD ###
    public worldController: WorldController;

    lastPressed: boolean = false;
    timer: number = 0;
    frames: number = 0;
    frameRate: number = 0;

    input: Input;

    public constructor() {
        this.app = APP;

        this.input = new Input(this.app);

        this.graphics = new Graphics();

        this.inputGraphics = new Graphics();
        this.inputGraphics.beginFill(0x888888, 255);
        this.inputGraphics.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.inputGraphics.endFill();
        this.inputGraphics.interactive = true;
        this.inputGraphics.on("pointerdown", this.input.pointerDown);
        this.inputGraphics.on("pointerup", this.input.pointerUp);

        this.app.stage.addChild(this.inputGraphics);
        this.app.stage.addChild(this.graphics);
    }

    public setup(): void {

        console.log("setup()");
        this.worldController = new WorldController();

        // Test objects
        this.worldController.world.add(new Player(320, 320, 32, 32));
        this.worldController.world.add(new Bush(256, 256));

        //this.default = game.p.loadFont("default.otf");
        //console.log(game.p.loadStrings("test.txt"));
    }

    public update(delta: number): void {  
        /* this.timer += game.p.deltaTime;
        this.frames++;

        if(this.timer >= 1000) {
            this.frameRate = this.frames;
            this.frames = 0;
            this.timer-=1000;

            console.log("fps: "+this.frameRate);
        }  */

        this.worldController.update();

        if(this.input.isMousePressed()) {
            this.worldController.world.add(new Bush(this.input.mouseX, this.input.mouseY));
        }
    }

    public render(delta: number): void {
        let t0 = performance.now();
        this.graphics.clear();
        this.graphics.beginFill(0, 255).lineStyle().drawRect(0, 0, APP.renderer.width, APP.renderer.height).endFill();
        
        // game.p.translate(-game.p.windowWidth/2, -game.p.windowHeight/2, 0);
        // game.p.image(this.img, 0, 0);

        // game.p.textFont(game.default);
        
        let t1 = performance.now();
        this.worldController.render();
        let t2 = performance.now();
        // console.log("time for clearing screen: "+(t1-t0));
        // console.log("time for drawing world: "+(t2-t1));
        // game.p.text("fps: "+(this.frameRate), 16, 16);
    }
}

export const game = new Game();