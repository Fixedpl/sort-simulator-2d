
class BubbleSort2D extends Canvas2D {

    constructor(trace, pos) {
        super(1200, 600, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '80px Arial';

        this.pos = pos;
        
        this.animPlayer = new AnimationPlayer();
        this.animPlayer.play();
        
        this.operationPlayer = new OperationPlayer();

        this.arr2d = new Array2D(trace.arr, pos, this.ctx);

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

            if(trace.type == ArrayTraceType.INNER_LOOP_BOUNDARY_EVALUATION) {
                if(splitterVisible === false) {
                    splitterVisible = true;
                    splitterIdx = trace.idx;
                    
                    this.operationPlayer.push(new Arr2dShowSplitterAfterIdxAnim(this.arr2d, this.arrSplitter2D, trace.idx, this.animPlayer));
                } else {
                    const splitterIdxFrom = splitterIdx;
                    const splitterIdxTo = trace.idx;
    
                    splitterIdx = splitterIdxTo;
    
                    this.operationPlayer.push(new Arr2dMoveSplitterAfterIdx(this.arr2d, this.arrSplitter2D, splitterIdxFrom, splitterIdxTo,  this.animPlayer));
                }
            }
    
            if (trace.type == ArrayTraceType.COMPARE_START) {
                compareIdx1 = trace.idxs[0];
                compareIdx2 = trace.idxs[1];

                this.operationPlayer.push(new Arr2dCompareStartAnim(this.arr2d, compareIdx1, compareIdx2, this.animPlayer));
            }
        
            if (trace.type == ArrayTraceType.COMPARE_END) {
                this.operationPlayer.push(new Arr2dCompareEndAnim(this.arr2d, compareIdx1, compareIdx2, this.animPlayer));
            }
        
            if (trace.type == ArrayTraceType.SWAP) {
                this.operationPlayer.push(new Arr2dSwapAnim(this.arr2d, trace.idxs[0], trace.idxs[1], this.animPlayer));
            }

        }

    }
}
