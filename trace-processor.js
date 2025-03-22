

class TraceProcessor {

    constructor(trace) {
        this.trace = trace;

        this.finished = false;
    }

    hasNext() {
        return !this.finished;
    }

    next() {}

}
