export class Input {

    // ### HTML STUFF ###
    canvas : HTMLCanvasElement;

    // ### INPUT STATE ###
    mouseX : number;
    mouseY : number;

    keys : {};
    keysPrev : {};
    

    public constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;

        this.keys = {};
        this.keysPrev = {};
    }

    public addEventListeners() {
        this.canvas.addEventListener("mousemove", 
        this.onMouseOver.bind(this));

        window.addEventListener("keydown", 
        this.onKeyPressed.bind(this), true);
        window.addEventListener("keyup", 
        this.onKeyReleased.bind(this), true);
    }

    // ### GETTERS ###

    public isKeyPressed(key: string) : boolean {
        return !this.keysPrev[key] && this.keys[key];
    }

    public isKeyReleased(key: string) : boolean {
        return this.keysPrev[key] && !this.keys[key];
    }

    public isKeyDown(key: string) : boolean {
        return this.keys[key];
    }
    
    // ### EVENT LISTENERS ###

    private onMouseOver(evt: MouseEvent) {
        let rect = this.canvas.getBoundingClientRect();
        this.mouseX = evt.clientX - rect.left;
        this.mouseY = evt.clientY - rect.top;
    }

    private onKeyPressed(evt: KeyboardEvent) {
        this.keysPrev[evt.key] = this.keys[evt.key];
        this.keys[evt.key] = true;
    }

    private onKeyReleased(evt: KeyboardEvent) {
        this.keysPrev[evt.key] = this.keys[evt.key];
        this.keys[evt.key] = false;
    }
}