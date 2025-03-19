
class Text2D extends Object2D {

    constructor(val, pos, col, ctx) {
        super();
        this.val = val;

        const textMeasure = ctx.measureText(val);
        this.width = textMeasure.actualBoundingBoxRight - textMeasure.actualBoundingBoxLeft;
        this.height = textMeasure.actualBoundingBoxAscent - textMeasure.actualBoundingBoxDescent;

        this.shift = [-this.width / 2, this.height / 2];

        this.pos = pos;
        this.col = col;
        this.ctx = ctx;
    }
    
    draw() {
        let absPos = this.absPos;
        
        absPos = vec2Add(absPos, this.shift);
        
        this.ctx.fillStyle = `rgb(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, ${this.col[3]})`;
        this.ctx.fillText(this.val, absPos[0], absPos[1]);
    }

}
