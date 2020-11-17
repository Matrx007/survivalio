export class IDGenerator {
    private static nextID: number = 0;

    public static getNextID(): number {
        return this.nextID++;
    }
}