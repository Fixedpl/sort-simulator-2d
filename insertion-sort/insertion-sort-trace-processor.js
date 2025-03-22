
class SITraceProcessor extends TraceProcessor {

    constructor(scene, trace) {
        super(trace);

        this.scene = scene;
    }

    next() {
        this.finished = true;

        const type = this.trace.type;

        if (type == InsertionSortTraceType.CHOOSE_KEY) {
            return new SIChooseKeyAnim(this.scene, this.trace.idx);
        }

        if (type == InsertionSortTraceType.COMPARE_TO_KEY_START) {
            return new SICompareToKeyStartAnim(this.scene, this.trace.idx);
        }

        if (type == InsertionSortTraceType.COMPARE_TO_KEY_END) {
            return new SICompareToKeyEndAnim(this.scene);
        }

        if (type == InsertionSortTraceType.MOVE_TO_RIGHT) {
            return new SIMoveToRightAnim(this.scene, this.trace.idx);
        }

        if (type == InsertionSortTraceType.PLACE_KEY) {
            return new SIPlaceKeyAnim(this.scene, this.trace.idx);
        }

        return null;
    }

}
