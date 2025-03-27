
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
            return new SMMergeAnim(this.scene);
        }

        if(type == MergeSortTraceType.MERGE_COMPARE) {
            return new SMMergeCompareAnim(this.scene, this.trace.idxs[0], this.trace.idxs[1]);
        }

        if(type == MergeSortTraceType.MERGE_PICK_LEFT) {
            return new SMMergePickLeftAnim(this.scene);
        }

        if(type == MergeSortTraceType.MERGE_PICK_RIGHT) {
            return new SMMergePickRightAnim(this.scene);
        }

        if(type == MergeSortTraceType.MERGE_PICK_REST) {
            return new SMMergePickRestAnim(this.scene);
        }

        if(type == MergeSortTraceType.MERGE_COMPARE_END) {
            return new SMMergeCompareEndAnim(this.scene);
        }

        return null;
    }

}
