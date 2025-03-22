

class TraceOperationSource extends OperationSource {

    constructor(traces) {
        super();

        this.traces = traces;
        this.curTraceIdx = 0;
    }

    hasNext() {
        return this.curTraceIdx < this.traces.length && this.traces[this.curTraceIdx].hasNext();
    }

    next() {
        const operation = this.traces[this.curTraceIdx].next();
        
        if(!this.traces[this.curTraceIdx].hasNext()) {
            this.curTraceIdx++;
        }

        return operation;
    }

}
