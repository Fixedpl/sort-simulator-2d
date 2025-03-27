

class Simulation {

    constructor(operationSource) {
        this.operationSource = operationSource;

        this.operations = [];
        this.operationIdx = 0;
        
        this.playing = true;
        this.playingObs = new Observable();
    }

    pause() {
        this.playing = false;
    }

    play()  {
        this.playing = true;

        this.playingObs.notify(true);

        this.loop();
    }

    pullOperationFromSource() {
        if(this.operationSource.hasNext()) {
            const operation = this.operationSource.next();
            this.operations.push(operation);
            return operation;
        }

        return null;
    }

    loop() {
        if(!this.playing) {
            this.playingObs.notify(false);
            return;
        }

        if(this.operationIdx >= this.operations.length && this.pullOperationFromSource() == null) {
            this.playing = false;
            this.playingObs.notify(false);
            return;
        }

        console.log(this.operations[this.operationIdx]);
        this.operations[this.operationIdx++].execute(() => this.loop());
    }
    
    skip() {
        if(this.operationIdx >= this.operations.length && this.pullOperationFromSource() == null) {
            return;
        }

        console.log(this.operations[this.operationIdx]);
        this.operations[this.operationIdx++].skip();
    }

    reverse() {
        if(this.operationIdx === 0) {
            return;
        }

        console.log(this.operations[this.operationIdx - 1]);
        this.operations[--this.operationIdx].reverse();
    }

}
