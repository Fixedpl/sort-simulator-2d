
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
