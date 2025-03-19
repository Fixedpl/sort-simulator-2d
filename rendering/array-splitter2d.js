
class ArraySplitter2D extends Object2D {

    constructor(pos, col, height, ctx) {
        super();
        this.pos = pos;
        this.col = col;
        this.height = height;
        this.ctx = ctx;
    }

    draw() {
        const absPos = this.absPos;

        this.ctx.beginPath();
        this.ctx.moveTo(absPos[0], absPos[1] + (this.height / 2));
        this.ctx.lineTo(absPos[0], absPos[1] - (this.height / 2));
        this.ctx.strokeStyle = `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, ${this.col[3]})`;
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
    }

}
