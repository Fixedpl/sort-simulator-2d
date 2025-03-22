
class SSTraceProcessor extends TraceProcessor {

    constructor(scene, trace) {
        super(trace);

        this.scene = scene;
        
        this.firstMinIndexChoose = true;
    }

    next() {
        const type = this.trace.type;
        
        if (type == SelectionSortTraceType.MIN_INDEX_CHOOSE) {

            if(this.firstMinIndexChoose) {
                this.firstMinIndexChoose = false;

                const splitterIdx = this.scene.data.get('splitterIdx');
                if(splitterIdx == null) {
                    return new SSCreateSplitterBeforeIdxAnim(this.scene, this.trace.idx);
                }
    
                return new SSMoveSplitterBeforeIdxAnim(this.scene, this.trace.idx);
            } else {
                this.finished = true;
                return new SSMinIndexChooseAnim(this.scene, this.trace.idx);
            }

        }
        
        this.finished = true;
        if (type == SelectionSortTraceType.MIN_INDEX_CHANGE) {
            return new SSMinIndexChangeAnim(this.scene, this.trace.idx);
        }

        if (type == SelectionSortTraceType.MIN_INDEX_RELEASE) {
            return new SSMinIndexReleaseAnim(this.scene);
        }

        if (type == SelectionSortTraceType.COMPARE_START) {
            return new SSCompareStartAnim(this.scene, this.trace.idxs[0], this.trace.idxs[1]);
        }
    
        if (type == SelectionSortTraceType.COMPARE_END) {
            return new SSCompareEndAnim(this.scene);
        }
    
        if (type == SelectionSortTraceType.SWAP) {
            return new SSSwapAnim(this.scene, this.trace.idxs[0], this.trace.idxs[1]);
        }


        return null;
    }

}
