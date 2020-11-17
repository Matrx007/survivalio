import { game } from "../game/Game";
import { Color } from "../util/Color";


export class Particle {
    static primitiveCounter: number = 0;
    x: number = 0;
    y: number = 0;
    size: number = 0;
    color: Color = null;

    onUpdate: ((p: this) => void)[];
    onRender: (p: this, offX: number, offY: number) => void = Particle.drawRectangle;

    public static readonly drawRectangle = 
            (p: Particle, offX: number, offY: number) => {
        game.graphics.lineStyle();
        game.graphics.beginFill(p.color.rgb, 1);
        game.graphics.drawRect(offX + p.x - p.size, offY + p.y - p.size, p.size*2, p.size*2);
        game.graphics.endFill();

        Particle.primitiveCounter++;
    }

    public static readonly drawCircle = 
            (p: Particle, offX: number, offY: number) => {
        game.graphics.lineStyle();
        game.graphics.beginFill(p.color.rgb, 1);
        game.graphics.drawCircle(offX + p.x, offY + p.y, p.size);
        game.graphics.endFill();

        Particle.primitiveCounter++;
    }
}