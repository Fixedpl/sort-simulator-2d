
class BubbleSort2D extends Canvas2D {

    constructor(trace, pos) {
        super(1200, 600, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '80px Arial';

        this.pos = pos;
        
        this.animPlayer = new AnimationPlayer();
        this.animPlayer.play();
        
        this.operationPlayer = new OperationPlayer();

        const CELL_GAP = 40;

        this.arr2d = new Array2D(trace.arr, pos, CELL_GAP, this.ctx);

        let RED = COLORS_FACTORY.RED;
        RED[3] = 0.0;

        this.arrSplitter2D = new ArraySplitter2D([110, 110], RED, this.arr2d.height * 1.5, this.ctx);

        this.traceToOperations(trace.traces);
    }

    onUpdate(dt) {
        this.arr2d.draw();
        this.arrSplitter2D.draw();

        this.animPlayer.onUpdate(dt);
    }

    traceToOperations(traces) {
        let splitterVisible = false;
        let splitterIdx = 0;

        let compareIdx1 = 0;
        let compareIdx2 = 0;

        for (let trace of traces) {

            if(trace.type == BubbleSortTraceType.INNER_LOOP_BOUNDARY_EVALUATION) {
                if(splitterVisible === false) {
                    splitterVisible = true;
                    splitterIdx = trace.idx;
                    
                    this.operationPlayer.push(new SBShowSplitterAfterIdxAnim(this.arr2d, this.arrSplitter2D, trace.idx, this.animPlayer));
                } else {
                    const splitterIdxFrom = splitterIdx;
                    const splitterIdxTo = trace.idx;
    
                    splitterIdx = splitterIdxTo;
    
                    this.operationPlayer.push(new SBMoveSplitterAfterIdxAnim(this.arr2d, this.arrSplitter2D, splitterIdxFrom, splitterIdxTo,  this.animPlayer));
                }
            }
    
            if (trace.type == BubbleSortTraceType.COMPARE_START) {
                compareIdx1 = trace.idxs[0];
                compareIdx2 = trace.idxs[1];

                this.operationPlayer.push(new SBCompareStartAnim(this.arr2d, compareIdx1, compareIdx2, this.animPlayer));
            }
        
            if (trace.type == BubbleSortTraceType.COMPARE_END) {
                this.operationPlayer.push(new SBCompareEndAnim(this.arr2d, compareIdx1, compareIdx2, this.animPlayer));
            }
        
            if (trace.type == BubbleSortTraceType.SWAP) {
                this.operationPlayer.push(new SBSwapAnim(this.arr2d, trace.idxs[0], trace.idxs[1], this.animPlayer));
            }

        }

    }
}
