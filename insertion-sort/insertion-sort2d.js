
class InsertionSort2D extends Canvas2D {

    constructor(trace, pos) {
        super(1200, 600, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '80px Arial';

        this.pos = pos;
        
        this.animPlayer = new AnimationPlayer();
        this.animPlayer.play();
        
        this.operationPlayer = new OperationPlayer();

        this.arrWithKey = {
            arr2d: new Array2D(trace.arr, pos, this.ctx),
            key: null
        };

        this.traceToOperations(trace.traces);
    }

    onUpdate(dt) {
        this.arrWithKey.arr2d.draw();
        if(this.arrWithKey.key !== null) {
            this.arrWithKey.key.draw();
        }

        this.animPlayer.onUpdate(dt);
    }

    traceToOperations(traces) {
        let keyIdx = null;
        let compareToKeyIdx = null;

        for(let trace of traces) {

            if (trace.type == InsertionSortTraceType.CHOOSE_KEY) {
                keyIdx = trace.idx;
                this.operationPlayer.push(new SIChooseKeyAnim(this.arrWithKey, trace.idx, this.animPlayer));
            }

            if (trace.type == InsertionSortTraceType.COMPARE_TO_KEY_START) {
                compareToKeyIdx = trace.idx;
                this.operationPlayer.push(new SICompareToKeyStartAnim(this.arrWithKey, trace.idx, this.animPlayer));
            }

            if (trace.type == InsertionSortTraceType.COMPARE_TO_KEY_END) {
                this.operationPlayer.push(new SICompareToKeyEndAnim(this.arrWithKey, compareToKeyIdx, this.animPlayer));
                compareToKeyIdx = null;
            }

            if (trace.type == InsertionSortTraceType.MOVE_TO_RIGHT) {
                if(trace.idx == compareToKeyIdx) {
                    compareToKeyIdx = trace.idx + 1;
                }
                this.operationPlayer.push(new SIMoveToRightAnim(this.arrWithKey, trace.idx, this.animPlayer));
            }

            if (trace.type == InsertionSortTraceType.PLACE_KEY) {
                this.operationPlayer.push(new SIPlaceKeyAnim(this.arrWithKey, keyIdx, trace.idx, this.animPlayer));
                keyIdx = null;
            }

        }
        
    
    }
}
