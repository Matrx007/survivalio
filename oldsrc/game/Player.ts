import { WorldObject } from "../world/WorldObject";
import { game } from "./Game";

export class Player extends WorldObject {

    public constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    public setup(): void {
        
    }

    public update(): void {
        this.x = game.input.mouseX + game.worldController.cameraX;
        this.y = game.input.mouseY + game.worldController.cameraY;
    }

    public render(offX: number, offY: number): void {
        game.graphics.lineStyle();
        game.graphics.beginFill(0, 255);
        game.graphics.drawRect(this.x + offX, this.y + offY, this.width, this.height);
        game.graphics.endFill();
    }
}