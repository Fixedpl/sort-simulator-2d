

class SQTraceProcessor extends TraceProcessor {

    constructor(scene, trace) {
        super(trace);

        this.scene = scene;
    }

    next() {
        this.finished = true;

        const type = this.trace.type;

        if (type == QuickSortTraceType.CHOOSE_PIVOT) {
            return new SQChoosePivotAnim(this.scene, this.trace.idx);
        }
        
        if (type == QuickSortTraceType.COMPARE_TO_PIVOT) {
            return new SQCompareToPivotAnim(this.scene, this.trace.idx);
        }

        if (type == QuickSortTraceType.COMPARE_TO_PIVOT_END) {
            return new SQCompareToPivotEndAnim(this.scene);
        }

        if (type == QuickSortTraceType.PUSH_LEFT) {
            return new SQPushLeftAnim(this.scene, this.trace.idx);
        }

        if (type == QuickSortTraceType.PUSH_RIGHT) {
            return new SQPushRightAnim(this.scene, this.trace.idx);
        }

        if (type == QuickSortTraceType.PUSH_MIDDLE) {
            return new SQPushMiddleAnim(this.scene, this.trace.idx);
        }

        if (type == QuickSortTraceType.SORT_LEFT) {
            return new SQSortLeftAnim(this.scene);
        }

        if (type == QuickSortTraceType.SORT_RIGHT) {
            return new SQSortRightAnim(this.scene);
        }

        if (type == QuickSortTraceType.SORT_LEFT_END) {
            return new SQSortLeftEndAnim(this.scene);
        }

        if (type == QuickSortTraceType.SORT_RIGHT_END) {
            return new SQSortRightEndAnim(this.scene);
        }

        if (type == QuickSortTraceType.MERGE) {
            return new SQMergeAnim(this.scene);
        }

        return null;
    }

}

