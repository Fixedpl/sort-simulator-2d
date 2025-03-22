
class InsertionSort2D extends Canvas2D {

    constructor(trace, pos) {
        super(1200, 600, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '80px Arial';

        this.canvasScene = new CanvasScene(this.ctx);

        const traceProcessors = trace.traces.map(tr => new SITraceProcessor(this.canvasScene, tr));

        this.operationSource = new TraceOperationSource(traceProcessors);

        this.simulation = new Simulation(this.operationSource);
        
        const CELL_GAP = 40;
        this.arr2d = new Array2D(trace.arr, pos, CELL_GAP, this.ctx);

        this.canvasScene.drawables.set('array', this.arr2d);
    }

    onUpdate(dt) {
        this.canvasScene.onUpdate(dt);
    }
}
