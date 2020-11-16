import { HashMap } from "../util/data/HashMap";
import { StringKey } from "../util/data/StringKey";
import { Action } from "./Action";
import { Particle } from "./Particle";
import { SimpleSizeSetter } from "./sizeSetters/SimpleSizeSetter";
import { GaussianSpreader } from "./spreaders/GaussianSpreader";
import { SimpleSpreader } from "./spreaders/SimpleSpreader";

export class ParticleFactory {

    // ### STATIC ###

    static spreaders: HashMap<Action> = new HashMap();
    static sizeSetters: HashMap<Action> = new HashMap();
    static colorSetters: HashMap<Action> = new HashMap();

    // ### PARTICLE FACTORY ###

    particles: Particle[];

    private readonly scope: object;

    public constructor(scope: object) {
        this.scope = scope;
    }

    public createParticles(min: number, max: number): this {
        if(max < min) {
            console.log("Error: max < min");
            return null;
        }

        let num = Math.floor(min + Math.random() * (max-min));

        this.particles = [];
        
        for(let i = 0; i < num; i++) {
            this.particles.push(new Particle());
        }
        
        return this;
    }

    public spreadParticles(spreader: string, args: object): this {
        
        ParticleFactory.spreaders.
            get(new StringKey(spreader)).
            action(this.particles, args);
        
        return this;
    }

    public setSizes(spreader: string, args: object): this {
        
        ParticleFactory.sizeSetters.
            get(new StringKey(spreader)).
            action(this.particles, args);
        
        return this;
    }

    public setColors(spreader: string, args: object): this {
        
        ParticleFactory.colorSetters.
            get(new StringKey(spreader)).
            action(this.particles, args);
        
        return this;
    }

    public do(func: (p: Particle, scope: object) => void): this {
        this.particles.forEach((p) => func(p, this.scope));

        return this;
    }

    public doBatch(func: (particles: Particle[], scope: object) => void): this {
        func(this.particles, this.scope);

        return this;
    }

    public doI(func: (p: Particle, scope: object, i: number) => void): this {
        let i = 0;
        this.particles.forEach((p) => {
            func(p, this.scope, i++);
        });

        return this;
    }

    public addFunction(func: (p: Particle) => void): this {
        this.particles.forEach((p) => p.onUpdate.push(func));
        
        return this;
    }

    public addFunctions(funcs: ((p: Particle) => void)[]): this {
        this.particles.forEach((p) => p.onUpdate.concat(funcs));
        
        return this;
    }

    public setDrawFunction(func: (p: Particle, offX: number, offY: number) => void): this {
        this.particles.forEach((p) => p.onRender = func);
        
        return this;
    }
}



ParticleFactory.spreaders.put(new StringKey("SimpleSpreader"), new SimpleSpreader());
ParticleFactory.spreaders.put(new StringKey("GaussianSpreader"), new GaussianSpreader());

ParticleFactory.sizeSetters.put(new StringKey("SimpleSizeSetter"), new SimpleSizeSetter());




