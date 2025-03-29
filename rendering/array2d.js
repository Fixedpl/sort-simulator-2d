
class Array2D extends Object2D {

    constructor(arr, pos, cellGap, ctx) {
        super();
        this.pos = pos;
        this.cellGap = cellGap;
        this.ctx = ctx;

        this.cellWidth = 80;

        this.cells = new Array(arr.length);
        this.initCells();

        this.elems = new Array(arr.length);
        for(let i = 0; i < arr.length; i++) {
            if(arr[i] != null) {
                this.elems[i] = new Text2D(
                    arr[i].toString(), 
                    this.posAtCellCenterIdx(i), 
                    COLORS_FACTORY.BLACK, 
                    ctx
                );
                this.elems[i].parent = this;
            }
            
        }

        this.height = this.cellWidth;
        this.width = this.calculateWidth();
    }
    
    get length() {
        return this.elems.length;
    }

    calculateWidth() {
        return this.cellWidth * this.cells.length + this.cellGap * (Math.max(this.cells.length - 1, 0));
    }

    initCells() {
        let shift = 0;

        for (let i = 0; i < this.cells.length; i++) {

            this.cells[i] = new ArrayCell2D(this.cellWidth, [shift, 0], COLORS_FACTORY.BLACK, this.ctx);
            this.cells[i].parent = this;

            shift += this.cellWidth + this.cellGap;
        }
    }

    addCell() {
        let addCellGap = 0;
        if(this.cells.length != 0) {
            addCellGap += this.cellGap;
        }

        const newCellPos = [this.width + addCellGap, 0];

        const newCell = new ArrayCell2D(this.cellWidth, newCellPos, COLORS_FACTORY.BLACK, this.ctx);
        newCell.parent = this;

        this.cells.push(newCell);

        this.elems.push(null);

        this.width = this.calculateWidth();
    }

    addText(text) {
        this.addCell();

        const lastIdx = this.elems.length - 1;

        const textPos = this.posAtCellCenterIdx(lastIdx);
        const newText = new Text2D(text.toString(), textPos, COLORS_FACTORY.BLACK, this.ctx);
        newText.parent = this;

        this.elems[lastIdx] = newText;
    }

    pop() {
        this.elems.pop();
        this.cells.pop();

        this.width = this.calculateWidth();
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
        return this.cells[idx];
    }

    posAtCellCenterIdx(idx) {
        return this.cells[idx].center;
    }

    posAtGapCenterBeforeIdx(idx) {
        return vec2Add(this.cells[idx].pos, [-this.cellGap / 2, -this.height / 2]);
    }

    posAtGapCenterAfterIdx(idx) {
        return vec2Add(this.cells[idx].pos, [this.cellWidth + (this.cellGap / 2), -this.height / 2]);
    }

    absPosAtGapCenterBeforeIdx(idx) {
        return vec2Add(this.cells[idx].absPos, [-this.cellGap / 2, -this.cellWidth / 2]);
    }

    absPosAtGapCenterAfterIdx(idx) {
        return vec2Add(this.cells[idx].absPos, [this.cellWidth + (this.cellGap / 2), -this.height / 2]);
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

    clear() {
        this.elems.fill(null);
    }

    draw() {
        for(let i = 0; i < this.elems.length; i++) {
            let elem = this.elems[i];
            if(elem != null) {
                elem.draw();
            }
        }
        
        for(let cell of this.cells) {
            cell.draw();
        }
    }

}
