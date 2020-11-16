import { InteractionManager } from "pixi.js";
import { Disposable } from "./Disposable";
import * as Keyboard from "pixi.js-keyboard";
import * as Mouse from "pixi.js-mouse";

export class Input implements Disposable {

    // ### ENGINE ###
    app: PIXI.Application;
    static interactionManager: InteractionManager;

    // ### MOUSE INPUT ###

    mouseX: number = 0;
    mouseY: number = 0;

    static mouseState: boolean = false;
    static mouseLastState: boolean = false;
    
    mouseIsDown: boolean = false;
    private mouseIsPressed: boolean = false;
    private mouseIsReleased: boolean = false;

    static buttons: {[key: number]: {isDown: boolean, lastState: boolean}} = {};

    // ### KEYBOARD INPUT ###
    static keys: {[key: string]: {isDown: boolean, lastState: boolean}} = {};

    public constructor(app: PIXI.Application) {
        this.app = app;

        // ### MOUSE INPUT ###
        Input.interactionManager = app.renderer.plugins.interaction;

        // ### KEYBOARD INPUT ###
        window.addEventListener("keydown", this.onKeyDown, false);
        window.addEventListener("keyup", this.onKeyUp, false);
    }

    public preUpdate(): void {
        this.mouseX = Input.interactionManager.mouse.global.x;
        this.mouseY = Input.interactionManager.mouse.global.y;
        
        this.mouseIsDown = Input.mouseState;
        this.mouseIsPressed = Input.mouseState && !Input.mouseLastState;
        this.mouseIsReleased = !Input.mouseState && Input.mouseLastState;
        Input.mouseLastState = Input.mouseState; 
    }

    public postUpdate(): void {
        let keyObject: {isDown: boolean, lastState: boolean};
        for(let key in Input.keys) {
            keyObject = Input.keys[key];

            keyObject.lastState = keyObject.isDown;
        }        
    }

    public isMouseDown(): boolean {
        return this.mouseIsDown;
    }

    public isMousePressed(): boolean {
        return this.mouseIsPressed;
    }

    public isMouseReleased(): boolean {
        return this.mouseIsReleased;
    }

    public isKeyPressed(key: string) {
        let keyObject = Input.keys[key];
        
        if(keyObject == undefined) return false;

        return keyObject.isDown && !keyObject.lastState;
    }

    public isKeyReleased(key: string) {
        let keyObject = Input.keys[key];
        
        if(keyObject == undefined) return false;

        return !keyObject.isDown && keyObject.lastState;
    }

    public isKey(key: string) {
        let keyObject = Input.keys[key];
        
        if(keyObject == undefined) return false;

        return keyObject.isDown;
    }

    private onKeyDown(this: Window, ev: KeyboardEvent): any {
        let key = ev.key;

        if(Input.keys[key] == null) {
            Input.keys[key] = {isDown: true, lastState: false};
        } else {
            let keyObject = Input.keys[key];

            keyObject.lastState = keyObject.isDown;
            keyObject.isDown = true;
        }
    }

    private onKeyUp(this: Window, ev: KeyboardEvent): any {
        let key = ev.key;

        if(Input.keys[key] == null) {
            Input.keys[key] = {isDown: false, lastState: true};
        } else {
            let keyObject = Input.keys[key];

            keyObject.lastState = keyObject.isDown;
            keyObject.isDown = false;
        }
    }

    pointerDown(): void {
        Input.mouseState = true;
    }

    pointerUp(): void {
        Input.mouseState = false;
    }

    dispose(): void {
        window.removeEventListener("keydown", this.onKeyDown);
        window.removeEventListener("keyup", this.onKeyUp);
    }
}