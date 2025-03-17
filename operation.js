

class Operation {

    constructor() {}

    execute(onFinishCallback) {}

    reverse() {}

    skip() {}

}

class OperationPlayer {

    constructor() {
        this.operations = [];
        this.i = 0;

        this.playing = false;
        this.playingObs = new Observable();
    }

    playingObservable() {
        return this.playingObs;
    }

    play() {
        this.playing = true;
        this.playingObs.notify(true);
        this.loop();
    }

    stop() {
        this.playing = false;
    }

    push(operation) {
        this.operations.push(operation);
    }

    loop() {
        if(!this.playing || this.i >= this.operations.length) {
            this.playingObs.notify(false);
            return;
        }

        this.operations[this.i++].execute(() => this.loop());
    }

    prev() {
        if(this.i === 0) {
            return false;
        }

        this.operations[--this.i].reverse();

        return true;
    }

    next() {
        if(this.i >= this.operations.length) {
            return false;
        }

        this.operations[this.i++].skip();

        return true;
    }

    clear() {
        if(this.playing == false) {
            this.operations = [];
            this.i = 0;
        }
    }

}
