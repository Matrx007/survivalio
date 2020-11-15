export class Renderable {
    readonly vertices: number[];
    readonly colors: number[];
    readonly numVertices: number;

    public constructor(
            vertices : number[],
            colors : number[],
            numVertices : number) {
        this.vertices = vertices;
        this.colors = colors;
        this.numVertices = numVertices;
    }

    public move(x: number, y: number) : this {
        for (let i = 0; i < this.numVertices; i++) {
            this.vertices[i*2+0] += x;
            this.vertices[i*2+1] += y;
        }

        return this;
    }

    public moveVoid(x: number, y: number) : void {
        for (let i = 0; i < this.numVertices; i++) {
            this.vertices[i*2+0] += x;
            this.vertices[i*2+1] += y;
        }
    }
}