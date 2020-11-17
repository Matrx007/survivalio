export interface Hashable {
    hash(): number;
    equals(other: Hashable): boolean;
}