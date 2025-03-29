
class QuickSort2D extends Canvas2D {

    constructor(trace, pos) {
        super(1400, 900, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '60px Arial';

        this.canvasScene = new CanvasScene(this.ctx);

        const traceProcessors = trace.traces.map(tr => new SQTraceProcessor(this.canvasScene, tr));

        this.operationSource = new TraceOperationSource(traceProcessors);

        this.simulation = new Simulation(this.operationSource);
        
        const CELL_GAP = 10;
        this.arr2d = new Array2D(trace.arr, [0, 0], CELL_GAP, this.ctx);

        const root = new Node2D(this.arr2d, pos);

        this.canvasScene.drawables.set('root', root);
        this.canvasScene.data.set('currentNode', root);
        this.canvasScene.data.set('pivotCounter', new Map());
    }

    onUpdate(dt) {
        this.canvasScene.onUpdate(dt);
    }
}
