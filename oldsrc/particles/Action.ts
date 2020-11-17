import { Particle } from "./Particle";

export interface Action {
    action(particles: Particle[], args: object): void;
}