var counter = 0;

abstract class GUIComponent {
    readonly id: number = counter++;

    public constructor() {
        
    }
}