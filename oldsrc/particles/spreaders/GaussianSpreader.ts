import { Action } from "../Action";
import { Particle } from "../Particle";

export class GaussianSpreader implements Action {
    action(particles: Particle[], args: object): void {
        if(args["type"]) {
            switch(args["type"]) {
                case "area":
                    this.spreadToArea(particles, args["area"]);
                    break;
                case "radius":
                    this.spreadToRadius(particles, args["radius"]);
                    break;
                default:
                    console.log("Invalid type!");
                    break;
                }
            } else {
                console.log("No type given!");
            }
    }

    private spreadToArea(particles: Particle[], args: object): void {
        let areaX: number = args["areaMinX"];
        let areaY: number = args["areaMinX"];
        let areaWidth: number = args["areaMaxX"] - areaX;
        let areaHeight: number = args["areaMaxY"] - areaY;
        
        let mean: number = args["mean"];
        let sd: number = args["sd"];

        particles.forEach((p) => {
            p.x = areaX + areaWidth/2 + game.p.randomGaussian(mean, sd) * areaWidth  - areaWidth/2;
            p.y = areaY + areaWidth/2 + game.p.randomGaussian(mean, sd) * areaHeight - areaHeight/2;
        });
    }

    private spreadToRadius(particles: Particle[], args: object): void {
        let middleX: number = args["middleX"];
        let middleY: number = args["middleY"];
        let mean: number = args["mean"];
        let sd: number = args["sd"];

        let angle: number;
        let distance: number;

        particles.forEach((p) => {

            angle = Math.random() * Math.PI * 2;
            distance = game.p.randomGaussian(mean, sd);

            p.x = middleX + Math.cos(angle) * distance;
            p.y = middleY + Math.sin(angle) * distance;
        });
    }
}