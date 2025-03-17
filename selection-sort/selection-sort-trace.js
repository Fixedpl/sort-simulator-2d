
function traceSelectionSort(arr) {
    const trace = new SelectionSortTrace(arr);

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        trace.minIndexChoose(minIndex);

        for (let j = i + 1; j < n; j++) {
            trace.compareStart(j, minIndex);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                trace.minIndexChange(minIndex);
            }
            trace.compareEnd();
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            trace.swap(i, minIndex);
        }
        trace.minIndexRelease();
    }

    return trace;
}

const SelectionSortTraceType = {
    MIN_INDEX_CHOOSE: 'MIN_INDEX_CHOOSE',
    MIN_INDEX_CHANGE: 'MIN_INDEX_CHANGE',
    MIN_INDEX_RELEASE: 'MIN_INDEX_RELEASE',
    COMPARE_START: 'COMPARE_START',
    COMPARE_END: 'COMPARE_END',
    SWAP: 'SWAP'
}

class SelectionSortTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    minIndexChoose(idx) {
        this.traces.push({
            type: SelectionSortTraceType.MIN_INDEX_CHOOSE,
            idx: idx
        });
    }

    minIndexChange(idx) {
        this.traces.push({
            type: SelectionSortTraceType.MIN_INDEX_CHANGE,
            idx: idx
        });
    }

    minIndexRelease() {
        this.traces.push({
            type: SelectionSortTraceType.MIN_INDEX_RELEASE
        });
    }

    compareStart(idx1, idx2) {
        this.traces.push({
            type: SelectionSortTraceType.COMPARE_START,
            idxs: [idx1, idx2]
        });
    }

    compareEnd() {
        this.traces.push({
            type: SelectionSortTraceType.COMPARE_END
        });
    }

    swap(idx1, idx2) {
        this.traces.push({
            type: SelectionSortTraceType.SWAP,
            idxs: [idx1, idx2]
        });
    }

}
