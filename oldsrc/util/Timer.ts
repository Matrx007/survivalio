export class Timer {
    startTime: number;
    endTime: number;
    private currentTime: number;
    speed: number;

    private cycles: number = 0;

    public constructor(startTime?: number, endTime?: number, speed?: number, currentTime?: number) {
        this.startTime = startTime ? startTime : 0;
        this.endTime = endTime ? endTime : 0;
        this.currentTime = currentTime ? currentTime : 0;
        this.speed = speed ? speed : 0;
    }

    public update(timeSpeed?: number): void {
        this.currentTime += timeSpeed ? timeSpeed*this.speed : this.speed;

        if(this.currentTime > this.endTime) {
            this.currentTime = this.currentTime % this.endTime;
            this.cycles++;
        }
    }

    public cyclesFinsihed(): number {
        return this.cycles;
    }

    public resetCycles(): void {
        this.cycles = 0;
    }

    public getPercent(): number {
        return (this.currentTime - this.startTime) / (this.endTime - this.startTime);
    }

    public resetTimer(): void {
        this.cycles = 0;
        this.currentTime = this.startTime;
    }
}