
class ArrayCells2D {

    constructor(length, width, pos, ctx) {
        this.length = length;
        this.width = width;
        this.pos = pos;
        this.ctx = ctx;

        this.cells = new Array(length);

        this.CELL_GAP = 40;

        this.init();
    }

    init() {
        let shift = this.width / 2;

        for (let i = 0; i < this.length; i++) {

            this.cells[i] = {
                pos: [shift, 0],
                col: COLORS_FACTORY.BLACK
            };

            shift += this.width + this.CELL_GAP;
        }
    }

    elemAtIdx(idx) {
        return this.cells[idx];
    }

    posAtIdx(idx) {
        return vec2Add(this.pos, vec2Add(this.cells[idx].pos, [this.width / 2, -this.width / 2]));
    }

    draw() {
        for(let cell of this.cells) {
            this.drawCellBorder(cell);
        }
    }

    drawCellBorder(cell) {
        const linePos = vec2Add(this.pos, cell.pos);
        const col = cell.col;

        const LINE_WIDTH = 4;

        const downLeftShift =   [0,          0];
        const upLeftShift =     [0,          -this.width];
        const upRightShift =    [this.width, -this.width];
        const downRightShift =  [this.width, 0];

        const downLeft =  vec2Add(linePos, downLeftShift);
        const upLeft =    vec2Add(linePos, upLeftShift);
        const upRight =   vec2Add(linePos, upRightShift);
        const downRight = vec2Add(linePos, downRightShift);

        this.ctx.beginPath();
        this.ctx.moveTo(...downLeft);
        this.ctx.lineTo(...upLeft);
        this.ctx.lineTo(...upRight);
        this.ctx.lineTo(...downRight);
        this.ctx.lineTo(...downLeft);
        this.ctx.lineTo(...upLeft);
        this.ctx.strokeStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`;
        this.ctx.lineWidth = LINE_WIDTH;
        this.ctx.stroke();
    }

}
