
class ArrayTrace {

    constructor(arr) {
        this.arr = Array.from(arr);

        this.traces = [];
    }

    compareStart(idx1, idx2) {
        this.traces.push({
            type: ArrayTraceType.COMPARE_START,
            idxs: [idx1, idx2]
        });
    }

    compareEnd() {
        this.traces.push({
            type: ArrayTraceType.COMPARE_END
        });
    }

    swap(idx1, idx2) {
        this.traces.push({
            type: ArrayTraceType.SWAP,
            idxs: [idx1, idx2]
        });
    }

    innerLoopBoundaryEvaluation(idx) {
        this.traces.push({
            type: ArrayTraceType.INNER_LOOP_BOUNDARY_EVALUATION,
            idx: idx
        });
    }

    chooseKey(idx) {
        this.traces.push({
            type: ArrayTraceType.CHOOSE_KEY,
            idx: idx
        });
    }

    compareToKeyStart(idx) {
        this.traces.push({
            type: ArrayTraceType.COMPARE_TO_KEY_START,
            idx: idx
        });
    }

    compareToKeyEnd() {
        this.traces.push({
            type: ArrayTraceType.COMPARE_TO_KEY_END
        });
    }

    placeKey(idx) {
        this.traces.push({
            type: ArrayTraceType.PLACE_KEY,
            idx: idx
        });
    }

    moveToRight(idx) {
        this.traces.push({
            type: ArrayTraceType.MOVE_TO_RIGHT,
            idx: idx
        });
    }

    minIndexChoose(idx) {
        this.traces.push({
            type: ArrayTraceType.MIN_INDEX_CHOOSE,
            idx: idx
        });
    }

    minIndexChange(idx) {
        this.traces.push({
            type: ArrayTraceType.MIN_INDEX_CHANGE,
            idx: idx
        });
    }

    minIndexRelease() {
        this.traces.push({
            type: ArrayTraceType.MIN_INDEX_RELEASE
        });
    }

}

const ArrayTraceType = {
    COMPARE_START: 'COMPARE_START',
    COMPARE_END: 'COMPARE_END',
    SWAP: 'SWAP',
    INNER_LOOP_BOUNDARY_EVALUATION: 'INNER_LOOP_BOUNDARY_EVALUATION',
    CHOOSE_KEY: 'CHOOSE_KEY',
    COMPARE_TO_KEY_START: 'COMPARE_TO_KEY_START',
    COMPARE_TO_KEY_END: 'COMPARE_TO_KEY_END',
    MOVE_TO_RIGHT: 'MOVE_TO_RIGHT',
    PLACE_KEY: 'PLACE_KEY',
    MIN_INDEX_CHOOSE: 'MIN_INDEX_CHOOSE',
    MIN_INDEX_CHANGE: 'MIN_INDEX_CHANGE',
    MIN_INDEX_RELEASE: 'MIN_INDEX_RELEASE',
}
