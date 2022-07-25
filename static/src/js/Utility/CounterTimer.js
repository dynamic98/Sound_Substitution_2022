export class CounterTimer {
    constructor(speed = 1) {
        this.speed = speed
        this.counter = 0;
    }

    start() {
        this.counter += this.speed;
    }

    reset() {
        this.counter = 0;
    }

    getTimer() {
        return this.counter;
    }

}