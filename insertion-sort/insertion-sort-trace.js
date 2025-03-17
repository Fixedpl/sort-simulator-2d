
function traceInsertionSort(arr) {
    const trace = new InsertionSortTrace(arr);

    const n = arr.length;

    for (let i = 1; i < n; i++) {
        trace.chooseKey(i);
        let key = arr[i];
        let j = i - 1;

        while (j >= 0) {

            trace.compareToKeyStart(j);
            if(arr[j] > key) {
                trace.moveToRight(j);
                trace.compareToKeyEnd();
                arr[j + 1] = arr[j];
                j--;
            } else {
                trace.compareToKeyEnd();
                break;
            }
            
        }
        trace.placeKey(j + 1);
        arr[j + 1] = key;
    }

    return trace;
}

const InsertionSortTraceType = {
    CHOOSE_KEY: 'CHOOSE_KEY',
    COMPARE_TO_KEY_START: 'COMPARE_TO_KEY_START',
    COMPARE_TO_KEY_END: 'COMPARE_TO_KEY_END',
    PLACE_KEY: 'PLACE_KEY',
    MOVE_TO_RIGHT: 'MOVE_TO_RIGHT'
}

class InsertionSortTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    chooseKey(idx) {
        this.traces.push({
            type: InsertionSortTraceType.CHOOSE_KEY,
            idx: idx
        });
    }

    compareToKeyStart(idx) {
        this.traces.push({
            type: InsertionSortTraceType.COMPARE_TO_KEY_START,
            idx: idx
        });
    }

    compareToKeyEnd() {
        this.traces.push({
            type: InsertionSortTraceType.COMPARE_TO_KEY_END
        });
    }

    placeKey(idx) {
        this.traces.push({
            type: InsertionSortTraceType.PLACE_KEY,
            idx: idx
        });
    }

    moveToRight(idx) {
        this.traces.push({
            type: InsertionSortTraceType.MOVE_TO_RIGHT,
            idx: idx
        });
    }
    
}
