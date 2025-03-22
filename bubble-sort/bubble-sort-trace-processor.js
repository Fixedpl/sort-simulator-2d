
class SBTraceProcessor extends TraceProcessor {

    constructor(scene, trace) {
        super(trace);
        
        this.scene = scene;
    }

    next() {
        this.finished = true;

        const type = this.trace.type;

        if(type == BubbleSortTraceType.INNER_LOOP_BOUNDARY_EVALUATION) {

            const splitterIdx = this.scene.data.get('splitterIdx');
            if(splitterIdx == null) {
                return new SBCreateSplitterAfterIdxAnim(this.scene, this.trace.idx);
            }

            return new SBMoveSplitterAfterIdxAnim(this.scene, this.trace.idx);
        }

        if(type == BubbleSortTraceType.COMPARE_START) {
            return new SBCompareStartAnim(this.scene, this.trace.idxs[0], this.trace.idxs[1]);
        }
    
        if(type == BubbleSortTraceType.COMPARE_END) {
            return new SBCompareEndAnim(this.scene);
        }
    
        if(type == BubbleSortTraceType.SWAP) {
            return new SBSwapAnim(this.scene, this.trace.idxs[0], this.trace.idxs[1]);
        }

        return null;
    }

}
