
class Array2D {

    constructor(arr, pos, ctx) {
        this.pos = pos;
        this.ctx = ctx;

        const ARRAY_WIDTH = 110;

        this.cells = new ArrayCells2D(arr.length, ARRAY_WIDTH, this.pos, this.ctx);

        this.elems = new Array(arr.length);
        for(let i = 0; i < arr.length; i++) {
            this.elems[i] = new Text2D(
                arr[i].toString(), 
                this.cells.posAtIdx(i), 
                COLORS_FACTORY.BLACK, 
                ctx
            );
        }

        this.height = ARRAY_WIDTH;
    }
    
    removeElemAtIdx(idx) {
        const elem = this.elems[idx];
        
        this.elems[idx] = null;
        
        return elem;
    }

    putElemAtIdx(elem, idx) {
        this.elems[idx] = elem;
    }

    moveElemAtIdxRight(idx) {
        this.elems[idx + 1] = this.elems[idx];
    }

    moveElemAtIdxLeft(idx) {
        this.elems[idx - 1] = this.elems[idx];
    }

    elemAtIdx(idx) {
        return this.elems[idx];
    }

    cellAtIdx(idx) {
        return this.cells.elemAtIdx(idx);
    }

    posAtIdxEnd(idx) {
        return vec2Add(this.cells.posAtIdx(idx), [(this.cells.width / 2) + (this.cells.CELL_GAP / 2), 0]);
    }

    posAtIdxStart(idx) {
        return vec2Add(this.cells.posAtIdx(idx), [-1.0 * ((this.cells.width / 2) + (this.cells.CELL_GAP / 2)), 0]);
    }

    posAtIdx(idx) {
        return this.cells.posAtIdx(idx);
    }

    swap(idx1, idx2) {
        swap(this.elems, idx1, idx2);
    }

    draw() {
        for(let i = 0; i < this.elems.length; i++) {
            let elem = this.elems[i];
            if(elem !== null) {
                elem.draw();
            }
        }
        this.cells.draw();
    }

}
