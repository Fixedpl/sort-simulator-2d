
class SelectionSort2D extends Canvas2D {

    constructor(trace) {
        super(1400, 900, COLORS_FACTORY.LIGHTBLUE);
        this.ctx.font = '60px Arial';

        this.canvasScene = new CanvasScene(this.ctx);

        const traceProcessors = trace.traces.map(tr => new SSTraceProcessor(this.canvasScene, tr));

        this.operationSource = new TraceOperationSource(traceProcessors);

        this.simulation = new Simulation(this.operationSource);
        
        const CELL_GAP = 20;
        this.arr2d = new Array2D(trace.arr, [460, 150], CELL_GAP, this.ctx);

        this.canvasScene.drawables.set('array', this.arr2d);
    }

    onUpdate(dt) {
        this.canvasScene.onUpdate(dt);
    }
}
