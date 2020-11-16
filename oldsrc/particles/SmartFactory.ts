import { Particle } from "./Particle";

export class SmartFactory {
    particles: Particle[];
    readonly scope: object;

    public constructor(scope: object) {
        this.scope = scope;
        this.particles = [];
    }

    public doBatch(func: (particles: Particle[], scope: object) => void): this {
        func(this.particles, this.scope);
        
        return this;
    }

    public doForEach(func: (p: Particle, scope: object, i: number) => void): this {
        let i = 0;
        this.particles.forEach((p) => {
            func(p, this.scope, i++);
        });
        
        return this;
    }

    public doMultipleForEach(funcs: ((p: Particle, scope: object, i: number) => void)[]): this {
        let i = 0;
        this.particles.forEach((p) => {
            funcs.forEach((func) => func(p, this.scope, i));
            i++;
        });
        
        return this;
    }

    // ### SMART FACTORY ###

    public do(): this {
        if(this.scope["instructions"]) {
            let instructions = this.scope["instructions"];
            if(Array.isArray(instructions)) {
                instructions.forEach((inst) => {
                    this.executeInstruction(inst);
                });
            }
        } else {
            console.log("Scope is missing \"instructions\"");
        }

        return this;
    }

    private executeInstruction(inst: object): void {
        if(inst["type"]) {
            let type: string = inst["type"];
            
            switch(type) {
                case "forEach":
                    if(inst["functions"]) {
                        if(Array.isArray(inst["functions"])) {
                            let funcs: ((p: Particle, scope: object, i: number) => void)[] = inst["functions"];

                            this.doMultipleForEach(funcs);
                        } else {
                            console.log("\"functions\" is not an array!");
                        }
                    } else if(inst["function"]) {
                        let func: ((p: Particle, scope: object, i: number) => void) = inst["function"];
                        
                        this.doForEach(func);
                    } else {
                        console.log("Instruction is missing functions!");
                    }
                    break;
                case "batch":
                    if(inst["functions"]) {
                        if(Array.isArray(inst["functions"])) {
                            let funcs: ((particles: Particle[], scope: object) => void)[] =
                                    inst["functions"];
                            
                            funcs.forEach((func) => this.doBatch(func));
                        } else {
                            console.log("\"functions\" is not an array!");
                        }
                    } else if(inst["function"]) {
                        let func: ((particles: Particle[], scope: object) => void) = type["function"];
                        
                        this.doBatch(func);
                    } else {
                        console.log("Instruction is missing functions!");
                    }
                    break;
                case "once":
                    if(inst["functions"]) {
                        if(Array.isArray(inst["functions"])) {
                            let funcs: ((particles: Particle[], scope: object) => void)[] =
                                    inst["functions"];
                            
                            funcs.forEach((func) => func(this.particles, this.scope));
                        } else {
                            console.log("\"functions\" is not an array!");
                        }
                    } else if(inst["function"]) {
                        let func: ((particles: Particle[], scope: object) => void) = type["function"];
                        
                        func(this.particles, this.scope);
                    } else {
                        console.log("Instruction is missing functions!");
                    }
                    break;
            }
        } else {
            console.log("Instruction is missing \"type\"!");
        }
    }
}