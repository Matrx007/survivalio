import { Particle } from "../../particles/Particle";
import { ParticleFactory } from "../../particles/ParticleFactory";
import { ParticleObject } from "../../particles/ParticleObject";
import { ParticleUtils } from "../../particles/ParticleUtils";
import { SmartFactory } from "../../particles/SmartFactory";
import { Color } from "../../util/Color";

export class Bush extends ParticleObject {
    public constructor(originX: number, originY: number) {
        let scope = {

            "groups": [
                {   

                }
            ],




            "variables": {
                "sizeGroup": 2+Math.floor(Math.random()*2)*2,
                "originX": 0,
                "originY": 0,
                "randomOffset": Math.random()
            },
            "setParticleValues": [
                {"name": "onUpdate", "value": undefined},
                {"name": "onRender", "value": Particle.drawCircle},
            ],
            "createEmptyParticles": {
                "minAmount": 30,
                "maxAmount": 40
            },
            "instructions": [
                {
                    "type": "once",
                    "functions": [
                        ParticleUtils.createEmptyParticles
                    ]
                },
                {
                    "type": "batch",
                    "functions": [
                        ParticleUtils.setParticleValues
                    ]
                },
                {
                    "type": "forEach",
                    "functions": [
                        Bush.spread,
                        Bush.setSize,
                        Bush.setColor
                    ]
                }
            ]
        };
        
        let particles = new SmartFactory(scope).do().particles;

        super(originX, originY, particles);
    }

    private static setSize = (p: Particle, scope: object, i: number) => {
        p.size = Math.random() * 8 + 24;
    }

    private static spread = (p: Particle, scope: object, i: number) => {
        let angle: number = Math.random() * Math.PI * 2;
        let distance: number = Math.pow(Math.random(), 2) * 
                (24 + scope["variables"]["sizeGroup"] * 16);

        p.x = Math.cos(angle) * distance;
        p.y = Math.sin(angle) * distance;
    }

    private static setColor = (p: Particle, scope: object, i: number) => {
        let multiplier = (Math.floor(i / 14) * 0.04 + 1);
        p.color = Color.createRGB255(
            58 * multiplier, 
            199 * multiplier, 
            107 * multiplier
        );
    }
}