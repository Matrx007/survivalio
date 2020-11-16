/*import p5 from "p5";
import { game } from "../../Sketch";
import { Action } from "../Action";
import { Particle } from "../Particle";

/*

{
    "mode":"rgb",
    "color": {
        "r": {
            "type": "fixed",
            "value": 0
        },
        "g": {
            "type": "range",
            "min": 64,
            "max": 196
        },
        "b": {
            "type": "range",
            "min": 64,
            "max": 196
        }
    }
}




export class SimpleSizeSetter implements Action {
    mode: number = 0; // 0 - err, 1 - rgb(a), 2 - hsb(a), 3 - grayscaleRGB 

    action(particles: Particle[], args: object): void {
        if(!args["color"]) {
            console.log("No color defined!");
            return;
        }

        if(args["mode"]) {
            switch(args["mode"]) {
                case "rgb":
                    this.mode = 1;
                    this.setColorsRGB(particles, args["color"]);
                    break;
                case "hsb":
                    this.mode = 2;
                    break;
                case "grayscaleRGB":
                    this.mode = 3;
                    break;
                default:
                    console.log("Invalid color mode!");
                    return;
            }
        }
    }

    createColor(args: object): number {
        if(args["type"]) {
            switch(args["type"]) {
                case "range":
                    let min = args["min"];
                    let range = args["max"] - min;

                    return min + Math.random() * range;

                    break;
                case "choose":
                    let sizes: number[] = args["sizes"];

                    return sizes[Math.floor(Math.random() * sizes.length)];

                    break;
                case "fixed":
                    let size: number = args["size"];

                    return size;

                    break;
                case "gaussian":
                    min = args["min"];
                    let mean: number = args["mean"];
                    let sd: number = args["standardDeviation"];

                    return min + game.p.randomGaussian(mean, sd);

                    break;
                default:
                    console.log("Invalid type!");
                    return;
            }
        } else {
            console.log("No type given!");
        }
    }

    setColorsRGB(particles: Particle[], args: object): void {
        particles.forEach((p) => {
            p.color = new p5.Color();

            if(!args["r"] || !args["g"] || !args["b"]) {
                console.log("Missing color channels!");
                return;
            }
            p.color.setRed(this.createColor(args["r"]));
            p.color.setGreen(this.createColor(args["g"]));
            p.color.setBlue(this.createColor(args["b"]));

            if(args["a"]) {
                p.color.setAlpha(this.createColor(args["r"]));
            }
        });
    }

    setListedColors(particles: Particle[], args: object): void {
        let sizes: number[] = args["sizes"];
        
        particles.forEach((p) => {
            p.size = sizes[Math.floor(Math.random() * sizes.length)];
        });
    }

    setFixedColor(particles: Particle[], args: object): void {
        let size: number = args["size"];
        
        particles.forEach((p) => {
            p.size = size;
        });
    }

    setGaussianColors(particles: Particle[], args: object): void {
        let min = args["min"];
        
        let mean: number = args["mean"];
        let sd: number = args["standardDeviation"];
        
        particles.forEach((p) => {
            p.size = min + game.p.randomGaussian(mean, sd);
        });
    }
}*/