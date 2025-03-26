
class SMTraceProcessor extends TraceProcessor {

    constructor(scene, trace) {
        super(trace);

        this.scene = scene;
    }

    next() {
        this.finished = true;

        const type = this.trace.type;

        if (type == MergeSortTraceType.SPLIT) {
            return new SMSplitAnim(this.scene, this.trace.idx);
        }

        if (type == MergeSortTraceType.SORT_LEFT_START) {
            return new SMSortLeftStartAnim(this.scene);
        }

        if (type == MergeSortTraceType.SORT_LEFT_END) {
            return new SMSortLeftEndAnim(this.scene);
        }

        if (type == MergeSortTraceType.SORT_RIGHT_START) {
            return new SMSortRightStartAnim(this.scene);
        }

        if (type == MergeSortTraceType.SORT_RIGHT_END) {
            return new SMSortRightEndAnim(this.scene);
        }

        if(type == MergeSortTraceType.MERGE) {
            
        }

        if(type == MergeSortTraceType.MERGE_COMPARE) {

        }

        if(type == MergeSortTraceType.MERGE_PICK_LEFT) {
            
        }

        if(type == MergeSortTraceType.MERGE_PICK_RIGHT) {
            
        }

        return null;
    }

}
