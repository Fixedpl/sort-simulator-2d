
function traceQuickSort(arr) {
    const trace = new QuickSortTrace(arr);

    quickSort(arr, trace);

    return trace;
}

function quickSort(arr, trace) {
    trace.choosePivot(arr.length - 1);
    if (arr.length <= 1) {
        return arr;
    } 

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    const middle = [pivot];

    for (let i = 0; i < arr.length - 1; i++) {
        trace.compareToPivot(i);
        if (arr[i] < pivot) {
            trace.pushLeft(i);
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            trace.pushRight(i);
            right.push(arr[i]);
        } 
        else {
            trace.pushMiddle(i);
            middle.push(arr[i]);
        }
        trace.compareToPivotEnd();
    }

    let leftSorted = left;
    if(left.length > 0) {
        trace.sortLeft();
        leftSorted = quickSort(left, trace);
        trace.sortLeftEnd();
    }
    
    let rightSorted = right;
    if(right.length > 0) {
        trace.sortRight();
        rightSorted = quickSort(right, trace);
        trace.sortRightEnd();
    }
    
    trace.merge();
    return [...leftSorted, ...middle, ...rightSorted];
}

const QuickSortTraceType = {
    CHOOSE_PIVOT: 'CHOOSE_PIVOT',
    COMPARE_TO_PIVOT: 'COMPARE_TO_PIVOT',
    COMPARE_TO_PIVOT_END: 'COMPARE_TO_PIVOT_END',
    PUSH_LEFT: 'PUSH_LEFT',
    PUSH_MIDDLE: 'PUSH_MIDDLE',
    PUSH_RIGHT: 'PUSH_RIGHT',
    SORT_LEFT: 'SORT_LEFT',
    SORT_LEFT_END: 'SORT_LEFT_END',
    SORT_RIGHT: 'SORT_RIGHT',
    SORT_RIGHT_END: 'SORT_RIGHT_END',
    MERGE: 'MERGE'
}

class QuickSortTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    choosePivot(idx) {
        this.traces.push({
            type: QuickSortTraceType.CHOOSE_PIVOT,
            idx: idx
        });
    }

    compareToPivot(idx) {
        this.traces.push({
            type: QuickSortTraceType.COMPARE_TO_PIVOT,
            idx: idx
        });
    }

    compareToPivotEnd() {
        this.traces.push({
            type: QuickSortTraceType.COMPARE_TO_PIVOT_END
        });
    }

    pushLeft(idx) {
        this.traces.push({
            type: QuickSortTraceType.PUSH_LEFT,
            idx: idx
        });
    }

    pushRight(idx) {
        this.traces.push({
            type: QuickSortTraceType.PUSH_RIGHT,
            idx: idx
        });
    }

    pushMiddle(idx) {
        this.traces.push({
            type: QuickSortTraceType.PUSH_MIDDLE,
            idx: idx
        });
    }

    sortLeft() {
        this.traces.push({
            type: QuickSortTraceType.SORT_LEFT
        });
    }

    sortRight() {
        this.traces.push({
            type: QuickSortTraceType.SORT_RIGHT
        });
    }

    sortLeftEnd() {
        this.traces.push({
            type: QuickSortTraceType.SORT_LEFT_END
        });
    }

    sortRightEnd() {
        this.traces.push({
            type: QuickSortTraceType.SORT_RIGHT_END
        });
    }

    merge() {
        this.traces.push({
            type: QuickSortTraceType.MERGE
        });
    }
}
