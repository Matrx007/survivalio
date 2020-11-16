import { Action } from "../Action";
import { Particle } from "../Particle";

export class SimpleSpreader implements Action {
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

        particles.forEach((p) => {
            p.x = areaX + Math.random() * areaWidth;
            p.y = areaY + Math.random() * areaHeight;
        });
    }

    private spreadToRadius(particles: Particle[], args: object): void {
        let middleX: number = args["middleX"];
        let middleY: number = args["middleY"];
        let radius: number = args["radius"];

        let angle: number = Math.random() * Math.PI * 2;
        let distance: number = Math.random() * radius;

        particles.forEach((p) => {
            p.x = middleX + Math.cos(angle) * distance;
            p.y = middleY + Math.sin(angle) * distance;
        });
    }
}