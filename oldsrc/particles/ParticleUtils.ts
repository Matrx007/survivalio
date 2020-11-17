import { Particle } from "./Particle";

export class ParticleUtils {
    public static readonly setParticleValues = 
            (particles: Particle[], scope: object): void => {
        if(scope["setParticleValues"]) {
            let values: {name: string, value: any}[] = scope["setParticleValues"];

            particles.forEach((p) => {
                values.forEach((value) => p[value.name] = value.value);
            });
        }
    };

    public static readonly createEmptyParticles = 
            (particles: Particle[], scope: object): void => {
        if(scope["createEmptyParticles"]) {
            let minAmount: number = ParticleUtils.parse<number>(
                    scope["createEmptyParticles"], "minAmount", scope
            );
            let maxAmount: number = ParticleUtils.parse<number>(
                    scope["createEmptyParticles"], "minAmount", scope
            );

            // let minAmount = scope["createEmptyParticles"]["minAmount"];
            // let maxAmount = scope["createEmptyParticles"]["maxAmount"];

            
            let amount = minAmount + Math.random() * (maxAmount-minAmount);
            for(let i = 0; i < amount; i++) {
                particles.push(new Particle());
            }
        }
    };

    private static parse<T>(value: object, key: string, scope: object): T {
        if(value[key]) {
            let val = value[key];

            if(typeof val === "function") {
                let func: (scope: object) => T = val;
                return func(scope);
            } else {
                return val;
            }
        }
    }
}