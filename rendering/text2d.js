
class Text2D {

    constructor(val, pos, col, ctx) {
        this.val = val;

        const textMeasure = ctx.measureText(val);
        this.width = textMeasure.actualBoundingBoxRight - textMeasure.actualBoundingBoxLeft;
        this.height = textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent;

        this.pos = pos;
        this.col = col;
        this.ctx = ctx;
    }
    
    set pos(pos) {
        this._pos = vec2Add(pos, [-this.width / 2, this.height / 2]);
    }

    get pos() {
        return this._pos;
    }

    draw() {
        this.ctx.fillStyle = `rgb(${this.col[0]}, ${this.col[1]}, ${this.col[2]})`;
        this.ctx.fillText(this.val, this.pos[0], this.pos[1]);
    }

}
