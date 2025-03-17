
class ArraySplitter2D {

    constructor(pos, col, height, ctx) {
        this.pos = pos;
        this.col = col;
        this.height = height;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pos[0], this.pos[1] + (this.height / 2));
        this.ctx.lineTo(this.pos[0], this.pos[1] - (this.height / 2));
        this.ctx.strokeStyle = `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, ${this.col[3]})`;
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
    }

}
