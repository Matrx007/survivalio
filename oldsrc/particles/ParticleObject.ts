import { Game, game } from "../game/Game";
import { WorldObject } from "../world/WorldObject";
import { Particle } from "./Particle";

export class ParticleObject extends WorldObject {

    particles: Particle[];

    particlesMinX: number = 0;
    particlesMinY: number = 0;
    particlesMaxX: number = 0;
    particlesMaxY: number = 0;

    originX: number;
    originY: number;
    printed: boolean = false;


    public constructor(originX: number, originY: number, particles?: Particle[]) {
        super(originX, originY, 0, 0);

        this.originX = originX;
        this.originY = originY;

        this.particles = particles ? particles : [];
    }

    public setup(): void {
        
    }

    public update(): void {
        this.particlesMinX = 0;
        this.particlesMinY = 0;
        this.particlesMaxX = 0;
        this.particlesMaxY = 0;

        this.updateParticles();

        if(!this.printed) {
            this.printed = true;
        }

        this.x = this.originX + this.particlesMinX;
        this.y = this.originY + this.particlesMinY;
        this.width = Math.abs(this.particlesMinX) + Math.abs(this.particlesMaxX);
        this.height = Math.abs(this.particlesMinY) + Math.abs(this.particlesMaxY);
    }

    public render(offX: number, offY: number): void {
        this.renderParticles(offX + this.originX, offY + this.originY);

        game.graphics.beginFill(0, 0);
        game.graphics.lineStyle(0x000000, 255);
        game.graphics.drawRect(offX+this.x, offY+this.y, this.width, this.height);
        game.graphics.endFill();
    }

    // ### UTIL ###

    private updateParticles(): void {
        this.particles.forEach((p) => {
            if(p.onUpdate != undefined) {
                p.onUpdate.forEach((func) => {
                    func(p);
                });
            }
            
            this.particlesMinX = Math.min(this.particlesMinX, p.x-p.size);
            this.particlesMinY = Math.min(this.particlesMinY, p.y-p.size);
            this.particlesMaxX = Math.max(this.particlesMaxX, p.x+p.size);
            this.particlesMaxY = Math.max(this.particlesMaxY, p.y+p.size);
        });
    }

    private renderParticles(offX: number, offY: number): void {
        this.particles.forEach((p) => {
            p.onRender(p, offX, offY);
        });
    }
    
}