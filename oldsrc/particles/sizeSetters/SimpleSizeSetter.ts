import { Action } from "../Action";
import { Particle } from "../Particle";

export class SimpleSizeSetter implements Action {
    action(particles: Particle[], args: object): void {
        if(args["type"]) {
            switch(args["type"]) {
                case "range":
                    this.setRandomSizes(particles, args["range"]);
                    break;
                case "choose":
                    this.setListedSizes(particles, args["choose"]);
                    break;
                case "fixed":
                    this.setFixedSize(particles, args["fixed"]);
                    break;
                case "gaussian":
                    this.setGaussianSizes(particles, args["gaussian"]);
                    break;
                default:
                    console.log("Invalid type!");
                    break;
            }
        } else {
            console.log("No type given!");
        }
    }

    setRandomSizes(particles: Particle[], args: object): void {
        let min = args["min"];
        let range = args["max"] - min;
        
        particles.forEach((p) => {
            p.size = min + Math.random() * range;
        });
    }

    setListedSizes(particles: Particle[], args: object): void {
        let sizes: number[] = args["sizes"];
        
        particles.forEach((p) => {
            p.size = sizes[Math.floor(Math.random() * sizes.length)];
        });
    }

    setFixedSize(particles: Particle[], args: object): void {
        let size: number = args["size"];
        
        particles.forEach((p) => {
            p.size = size;
        });
    }

    setGaussianSizes(particles: Particle[], args: object): void {
        let min = args["min"];
        
        let mean: number = args["mean"];
        let sd: number = args["standardDeviation"];
        
        particles.forEach((p) => {
            p.size = min + game.p.randomGaussian(mean, sd);
        });
    }
}