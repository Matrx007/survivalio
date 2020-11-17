/*enum INSTRUCTIONS {ADD, SUBTRACT, MULTIPLY, DIVIDE, PERCENT};

class Link {
    obj: object;
    variable: string;

    constructor(obj: object, variable: string) {
        this.obj = obj;
        this.variable = variable;
    }

    get() {
        let value: any;
        if(this.variable in this.obj) {
            value = this.obj[this.variable];
            return value;
        } else {
            return undefined;
        }
    }
}

class Instruction {
    a: number | Link;
    b: number | Link;
    instruction: INSTRUCTIONS;

    constructor(a: number | Link, instruction: INSTRUCTIONS, b: number | Link) {
        this.a = a;
        this.instruction = instruction;
        this.b = b;
    }

    calculate(): number {
        let valueA: number;
        let valueB: number;
        
        if(typeof this.a == 'number') valueA = this.a;
        else valueA = this.a.get();
        if(typeof this.b == 'number') valueB = this.b;
        else valueB = this.b.get();

        switch (this.instruction) {
            case INSTRUCTIONS.ADD:
                return valueA + valueB;
                break;
            case INSTRUCTIONS.SUBTRACT:
                return valueA - valueB;
                break;
            case INSTRUCTIONS.MULTIPLY:
                return valueA * valueB;
                break;
            case INSTRUCTIONS.DIVIDE:
                return valueA / valueB;
                break;
            case INSTRUCTIONS.PERCENT:
                return valueA * (valueB / 100);
                break;
        }
    }
}

export class Constraint {


    constructor(equation: string) {

    }

    private compile() {
        
    }

    public calculate(equation: string, parameters : Constraint[]) : number {

    }
}*/