
class ArrayCell2D extends Object2D {

    constructor(width, pos, col, ctx) {
        super();
        this.width = width;
        this.pos = pos;
        this.col = col;
        this.ctx = ctx;
    }

    get center() {
        return vec2Add(this.pos, [this.width / 2, -this.width / 2]);
    }

    draw() {
        const absPos = this.absPos;
        const col = this.col;

        const LINE_WIDTH = 4;

        const downLeftShift =   [0,          0];
        const upLeftShift =     [0,          -this.width];
        const upRightShift =    [this.width, -this.width];
        const downRightShift =  [this.width, 0];

        const downLeft =  vec2Add(absPos, downLeftShift);
        const upLeft =    vec2Add(absPos, upLeftShift);
        const upRight =   vec2Add(absPos, upRightShift);
        const downRight = vec2Add(absPos, downRightShift);

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

class ArrayCells2D extends Object2D {

    constructor(length, width, pos, gap, ctx) {
        super();
        this.width = width;
        this.pos = pos;
        this.gap = gap;
        this.ctx = ctx;

        this.cells = new Array(length);

        this.init();
    }

    init() {
        let shift = this.width / 2;

        for (let i = 0; i < this.cells.length; i++) {

            this.cells[i] = new ArrayCell2D(this.width, [shift, 0], COLORS_FACTORY.BLACK, this.ctx);
            this.cells[i].parent = this;

            shift += this.width + this.gap;
        }
    }

    elemAtIdx(idx) {
        return this.cells[idx];
    }

    posAtCellCenterIdx(idx) {
        return this.cells[idx].center;
    }

    posAtGapCenterBeforeIdx(idx) {
        return vec2Add(this.cells[idx].pos, [-this.gap / 2, -this.width / 2]);
    }

    posAtGapCenterAfterIdx(idx) {
        return vec2Add(this.cells[idx].pos, [this.width + (this.gap / 2), -this.width / 2]);
    }
    
    absPosAtGapCenterBeforeIdx(idx) {
        return vec2Add(this.cells[idx].absPos, [-this.gap / 2, -this.width / 2]);
    }

    absPosAtGapCenterAfterIdx(idx) {
        return vec2Add(this.cells[idx].absPos, [this.width + (this.gap / 2), -this.width / 2]);
    }

    draw() {
        for(let cell of this.cells) {
            cell.draw();
        }
    }

}
