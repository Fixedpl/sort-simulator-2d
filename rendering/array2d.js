
class Array2D extends Object2D {

    constructor(arr, pos, cellGap, ctx) {
        super();
        this.pos = pos;
        this.cellGap = cellGap;
        this.ctx = ctx;

        const CELL_WIDTH = 80;

        this.cells = new ArrayCells2D(arr.length, CELL_WIDTH, [0, 0], this.cellGap, this.ctx);
        this.cells.parent = this;

        this.elems = new Array(arr.length);
        for(let i = 0; i < arr.length; i++) {
            this.elems[i] = new Text2D(
                arr[i].toString(), 
                this.cells.posAtCellCenterIdx(i), 
                COLORS_FACTORY.BLACK, 
                ctx
            );
            this.elems[i].parent = this;
        }

        this.height = CELL_WIDTH;
        this.width = CELL_WIDTH * this.elems.length + this.cellGap * (this.elems.length - 1);
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

    posAtCellCenterIdx(idx) {
        return this.cells.posAtCellCenterIdx(idx);
    }

    posAtGapCenterBeforeIdx(idx) {
        return this.cells.posAtGapCenterBeforeIdx(idx);
    }

    posAtGapCenterAfterIdx(idx) {
        return this.cells.posAtGapCenterAfterIdx(idx);
    }

    absPosAtGapCenterBeforeIdx(idx) {
        return this.cells.absPosAtGapCenterBeforeIdx(idx);
    }

    absPosAtGapCenterAfterIdx(idx) {
        return this.cells.absPosAtGapCenterAfterIdx(idx);
    }

    swap(idx1, idx2) {
        swap(this.elems, idx1, idx2);
    }
    
    values() {
        return this.elems.map(elem => elem.val);
    }

    slice(idxStart, idxEnd = -1) {
        const vals = this.values();

        const newArr = idxEnd == -1 ? 
            new Array2D(vals.slice(idxStart), vec2Add(this.pos, [idxStart * this.height + idxStart * this.cellGap, 0]), this.cellGap, this.ctx) : 
            new Array2D(vals.slice(idxStart, idxEnd), vec2Add(this.pos, [idxStart * this.height + idxStart * this.cellGap, 0]), this.cellGap, this.ctx);
        
        newArr.parent = this.parent;

        return newArr;
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
