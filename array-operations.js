

class ArrayOperations {

    static animFactory = new AnimFactory();

    constructor() {
    }

    static swap(array, idx1, idx2) {
        const obj1 = array.elemAtIdx(idx1);
        const obj2 = array.elemAtIdx(idx2);

        const slot1Pos = array.posAtCellCenterIdx(idx1);
        const slot2Pos = array.posAtCellCenterIdx(idx2);

        const xDiff = slot2Pos[0] - slot1Pos[0];
        const yDiff = array.height;
        
        array.swap(idx1, idx2);
        
        const anims = [];
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [0, -yDiff]),
            this.animFactory.moveByVec(obj2, [0, yDiff])
        ]));
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [xDiff, 0]),
            this.animFactory.moveByVec(obj2, [-xDiff, 0])
        ]))
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [0, yDiff]),
            this.animFactory.moveByVec(obj2, [0, -yDiff])
        ]));

        return anims;
    }

    static swapInstant(array, idx1, idx2) {
        array.elemAtIdx(idx1).pos = array.posAtCellCenterIdx(idx2);
        array.elemAtIdx(idx2).pos = array.posAtCellCenterIdx(idx1);

        array.swap(idx1, idx2);
    }

    static highlightText(array, idx1, idx2) {
        const obj1 = array.elemAtIdx(idx1)
        const obj2 = array.elemAtIdx(idx2)

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        return anims;
    }

    static highlightTextInstant(array, idx1, idx2 = -1) {
        const objs = [array.elemAtIdx(idx1)];

        if(idx2 != -1) {
            objs.push(array.elemAtIdx(idx2));
        }

        vec4CopyValues(objs[0].col, COLORS.YELLOW);

        if(idx2 != -1) {
            vec4CopyValues(objs[1].col, COLORS.YELLOW);
        }
    }

    static unhighlightText(array, idx1, idx2 = -1) {
        const objs = [array.elemAtIdx(idx1)];

        if(idx2 != -1) {
            objs.push(array.elemAtIdx(idx2));
        }

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously(objs, COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.animFactory.pause());

        return anims;
    }

    static unhighlightTextInstant(array, idx1, idx2 = -1) {
        const objs = [array.elemAtIdx(idx1)];

        if(idx2 != -1) {
            objs.push(array.elemAtIdx(idx2));
        }

        vec4CopyValues(objs[0].col, COLORS.BLACK);
        
        if(idx2 != -1) {
            vec4CopyValues(objs[1].col, COLORS.BLACK);
        }
    }

    static highlightCell(array, idx) {
        let cell = array.cellAtIdx(idx);

        const anims = [];

        anims.push(this.animFactory.changeColor(cell, COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        return anims;
    }

    static highlightCellInstant(array, idx) {
        let cell = array.cellAtIdx(idx);

        vec4CopyValues(cell.col, COLORS.YELLOW);
    }

    static unhighlightCell(array, idx) {
        let cell = array.cellAtIdx(idx);

        const anims = [];

        anims.push(this.animFactory.changeColor(cell, COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.animFactory.pause());

        return anims;
    }

    static unhighlightCellInstant(array, idx) {
        let cell = array.cellAtIdx(idx);

        vec4CopyValues(cell.col, COLORS.BLACK);
    }

    static moveSplitterLeft(array, splitter) {
        const changeVec = [-(array.cells.width + array.cells.gap), 0];

        return this.animFactory.moveByVec(splitter, changeVec);
    }

    static moveSplitterLeftInstant(array, splitter) {
        const changeVec = [-(array.cells.width + array.cells.gap), 0];

        splitter.pos = vec2Add(splitter.pos, changeVec);
    }

    static moveSplitterRight(array, splitter) {
        const changeVec = [array.cells.width + array.cells.gap, 0];

        return this.animFactory.moveByVec(splitter, changeVec)
    }

    static moveSplitterRightInstant(array, splitter) {
        const changeVec = [array.cells.width + array.cells.gap, 0];

        splitter.pos = vec2Add(splitter.pos, changeVec);
    }

    static createSplitterBeforeIdx(array, idx, scene) {
        const splitterPos = array.absPosAtGapCenterBeforeIdx(idx);
        const splitterColor = alpha0(COLORS_FACTORY.RED);
        const splitterHeight = array.height * 1.5;

        return new ArraySplitter2D(splitterPos, splitterColor, splitterHeight, scene.ctx);
    }

    static createSplitterAfterIdx(array, idx, scene) {
        const splitterPos = array.absPosAtGapCenterAfterIdx(idx);
        const splitterColor = alpha0(COLORS_FACTORY.RED);
        const splitterHeight = array.height * 1.5;

        return new ArraySplitter2D(splitterPos, splitterColor, splitterHeight, scene.ctx);
    }
}
