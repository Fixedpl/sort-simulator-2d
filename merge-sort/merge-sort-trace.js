
function traceMergeSort(arr) {
    const trace = new MergeSortTrace(arr);

    mergeSort(arr, trace);

    return trace;
}

function mergeSort(arr, trace) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    trace.split(mid);

    trace.sortLeftStart();
    const left = mergeSort(arr.slice(0, mid), trace);
    trace.sortLeftEnd();
    trace.sortRightStart();
    const right = mergeSort(arr.slice(mid), trace);
    trace.sortRightEnd();
    
    trace.merge();
    return merge(left, right, trace);
}

function merge(left, right, trace) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        trace.mergeCompare(i, j);
        if (left[i] < right[j]) {
            trace.mergePickLeft();
            result.push(left[i]);
            i++;
        } else {
            trace.mergePickRight();
            result.push(right[j]);
            j++;
        }
        trace.mergeCompareEnd();
    }
    
    trace.mergePickRest();
    return result.concat(left.slice(i)).concat(right.slice(j));
}

const MergeSortTraceType = {
    SPLIT: 'SPLIT',
    SORT_LEFT_START: 'SORT_LEFT_START',
    SORT_LEFT_END: 'SORT_LEFT_END',
    SORT_RIGHT_START: 'SORT_RIGHT_START',
    SORT_RIGHT_END: 'SORT_RIGHT_END',
    MERGE: 'MERGE',
    MERGE_COMPARE: 'MERGE_COMPARE',
    MERGE_PICK_LEFT: 'MERGE_PICK_LEFT',
    MERGE_PICK_RIGHT: 'MERGE_PICK_RIGHT',
    MERGE_PICK_REST: 'MERGE_PICK_REST',
    MERGE_COMPARE_END: 'MERGE_COMPARE_END',
}

class MergeSortTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    split(idx) {
        this.traces.push({
            type: MergeSortTraceType.SPLIT,
            idx: idx
        });
    }

    sortLeftStart() {
        this.traces.push({
            type: MergeSortTraceType.SORT_LEFT_START
        });
    }

    sortLeftEnd() {
        this.traces.push({
            type: MergeSortTraceType.SORT_LEFT_END
        });
    }

    sortRightStart() {
        this.traces.push({
            type: MergeSortTraceType.SORT_RIGHT_START
        });
    }

    sortRightEnd() {
        this.traces.push({
            type: MergeSortTraceType.SORT_RIGHT_END
        });
    }

    merge() {
        this.traces.push({
            type: MergeSortTraceType.MERGE
        })
    }

    mergeCompare(idx1, idx2) {
        this.traces.push({
            type: MergeSortTraceType.MERGE_COMPARE,
            idxs: [idx1, idx2]
        })
    }
    
    mergePickLeft() {
        this.traces.push({
            type: MergeSortTraceType.MERGE_PICK_LEFT
        })
    }

    mergePickRight() {
        this.traces.push({
            type: MergeSortTraceType.MERGE_PICK_RIGHT
        })
    }

    mergePickRest() {
        this.traces.push({
            type: MergeSortTraceType.MERGE_PICK_REST
        })
    }

    mergeCompareEnd() {
        this.traces.push({
            type: MergeSortTraceType.MERGE_COMPARE_END
        })
    }
}
