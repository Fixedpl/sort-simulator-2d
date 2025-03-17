
function traceBubbleSort(arr) {
    const trace = new BubbleSortTrace(arr);

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        
        trace.innerLoopBoundaryEvaluation(n - 1 - i);
        for (let j = 0; j < n - 1 - i; j++) {

            trace.compareStart(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                trace.swap(j, j + 1);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            trace.compareEnd();
        }
    }

    return trace;
}

const BubbleSortTraceType = {
    COMPARE_START: 'COMPARE_START',
    COMPARE_END: 'COMPARE_END',
    SWAP: 'SWAP',
    INNER_LOOP_BOUNDARY_EVALUATION: 'INNER_LOOP_BOUNDARY_EVALUATION'
}

class BubbleSortTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    compareStart(idx1, idx2) {
        this.traces.push({
            type: BubbleSortTraceType.COMPARE_START,
            idxs: [idx1, idx2]
        });
    }

    compareEnd() {
        this.traces.push({
            type: BubbleSortTraceType.COMPARE_END
        });
    }

    swap(idx1, idx2) {
        this.traces.push({
            type: BubbleSortTraceType.SWAP,
            idxs: [idx1, idx2]
        });
    }

    innerLoopBoundaryEvaluation(idx) {
        this.traces.push({
            type: BubbleSortTraceType.INNER_LOOP_BOUNDARY_EVALUATION,
            idx: idx
        });
    }
    
}
