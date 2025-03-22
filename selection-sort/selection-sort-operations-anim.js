
class SSCreateSplitterBeforeIdxAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const splitter = this.createSplitter();

        const anims = [];

        anims.push(this.scene.animFactory.show(splitter));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.scene.drawables.delete('splitter');
        this.scene.data.delete('splitterIdx');
    }

    skip() {
        const splitter = this.createSplitter();
        alpha1(splitter.col);
    }

    createSplitter() {
        const array = this.scene.drawables.get('array');
        
        const splitterIdx = this.idx;
        const splitterPos = array.absPosAtGapCenterBeforeIdx(splitterIdx);
        const splitterColor = alpha0(COLORS_FACTORY.RED);
        const splitterHeight = array.height * 1.5;

        this.scene.drawables.set('splitter', new ArraySplitter2D(splitterPos, splitterColor, splitterHeight, this.scene.ctx));

        const splitter = this.scene.drawables.get('splitter');

        this.scene.data.set('splitterIdx', splitterIdx);

        return splitter;
    }

}

class SSMoveSplitterBeforeIdxAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const idxFrom = this.idx - 1;
        const idxTo = this.idx;

        const changeVec = vec2Subtract(this.posAtIdx(idxTo), this.posAtIdx(idxFrom));

        this.scene.data.set('splitterIdx', idxTo);

        const anims = [];

        anims.push(this.scene.animFactory.moveByVec(this.scene.drawables.get('splitter'), changeVec));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const splitterIdx = this.idx - 1;

        this.scene.drawables.get('splitter').pos = this.posAtIdx(splitterIdx);
        this.scene.data.set('splitterIdx', splitterIdx);
    }

    skip() {
        this.scene.drawables.get('splitter').pos = this.posAtIdx(this.idx);
        this.scene.data.set('splitterIdx', this.idx);
    }

    posAtIdx(idx) {
        return this.scene.drawables.get('array').absPosAtGapCenterBeforeIdx(idx);
    }
}

class SSMinIndexChooseAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        let cell = array.cellAtIdx(this.idx);

        this.scene.data.set('minValueIdx', this.idx);

        const anims = [];

        anims.push(this.scene.animFactory.changeColor(cell, COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        let cell = array.cellAtIdx(this.idx);

        this.scene.data.delete('minValueIdx');

        vec4CopyValues(cell.col, COLORS.BLACK);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        let cell = array.cellAtIdx(this.idx);

        this.scene.data.set('minValueIdx', this.idx);

        vec4CopyValues(cell.col, COLORS.YELLOW);
    }

}

class SSMinIndexChangeAnim extends Operation {

    constructor(scene, newIdx) {
        super();
        
        this.scene = scene;

        this.prevIdx = null;
        this.newIdx = newIdx;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        this.prevIdx = this.scene.data.get('minValueIdx');
        this.scene.data.set('minValueIdx', this.newIdx);

        let cellFrom = array.cellAtIdx(this.prevIdx);
        let cellTo = array.cellAtIdx(this.newIdx);

        const anims = [];

        anims.push(this.scene.animFactory.changeColor(cellFrom, COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.scene.animFactory.pause());
        anims.push(this.scene.animFactory.changeColor(cellTo, COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('minValueIdx', this.prevIdx);

        let cellFrom = array.cellAtIdx(this.prevIdx);
        let cellTo = array.cellAtIdx(this.newIdx);

        vec4CopyValues(cellFrom.col, COLORS.YELLOW);
        vec4CopyValues(cellTo.col, COLORS.BLACK);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.prevIdx = this.scene.data.get('minValueIdx');
        this.scene.data.set('minValueIdx', this.newIdx);

        let cellFrom = array.cellAtIdx(this.prevIdx);
        let cellTo = array.cellAtIdx(this.newIdx);

        vec4CopyValues(cellFrom.col, COLORS.BLACK);
        vec4CopyValues(cellTo.col, COLORS.YELLOW);
    }

}

class SSMinIndexReleaseAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;

        this.idx = null;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        this.idx = this.scene.data.get('minValueIdx');

        const cell = array.cellAtIdx(this.idx);

        this.scene.data.delete('minValueIdx');

        const anims = [];

        anims.push(this.scene.animFactory.changeColor(cell, COLORS.YELLOW, COLORS.BLACK));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        const cell = array.cellAtIdx(this.idx);

        this.scene.data.set('minValueIdx', this.idx);

        vec4CopyValues(cell.col, COLORS.YELLOW);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.idx = this.scene.data.get('minValueIdx');

        const cell = array.cellAtIdx(this.idx);

        this.scene.data.delete('minValueIdx');

        vec4CopyValues(cell.col, COLORS.BLACK);
    }

}

class SSCompareStartAnim extends Operation {

    constructor(scene, idx1, idx2) {
        super();
        
        this.scene = scene;

        this.idx1 = idx1;
        this.idx2 = idx2;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        const obj1 = array.elemAtIdx(this.idx1);
        const obj2 = array.elemAtIdx(this.idx2);

        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        const obj1 = array.elemAtIdx(this.idx1);
        const obj2 = array.elemAtIdx(this.idx2);

        vec4CopyValues(obj1.col, COLORS.BLACK);
        vec4CopyValues(obj2.col, COLORS.BLACK);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        const obj1 = array.elemAtIdx(this.idx1);
        const obj2 = array.elemAtIdx(this.idx2);

        vec4CopyValues(obj1.col, COLORS.YELLOW);
        vec4CopyValues(obj2.col, COLORS.YELLOW);
    }

}

class SSCompareEndAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;

        this.compareIdx1 = null;
        this.compareIdx2 = null;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        const obj1 = array.elemAtIdx(this.compareIdx1);
        const obj2 = array.elemAtIdx(this.compareIdx2);

        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        const obj1 = array.elemAtIdx(this.compareIdx1);
        const obj2 = array.elemAtIdx(this.compareIdx2);

        vec4CopyValues(obj1.col, COLORS.YELLOW);
        vec4CopyValues(obj2.col, COLORS.YELLOW);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        const obj1 = array.elemAtIdx(this.compareIdx1);
        const obj2 = array.elemAtIdx(this.compareIdx2);

        vec4CopyValues(obj1.col, COLORS.BLACK);
        vec4CopyValues(obj2.col, COLORS.BLACK);
    }

}

class SSSwapAnim extends Operation {

    constructor(scene, idx1, idx2) {
        super();
        
        this.scene = scene;

        this.idx1 = idx1;
        this.idx2 = idx2;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        const obj1 = array.elemAtIdx(this.idx1);
        const obj2 = array.elemAtIdx(this.idx2);

        const anims = [];

        const slot1Pos = array.posAtCellCenterIdx(this.idx1);
        const slot2Pos = array.posAtCellCenterIdx(this.idx2);

        const xDiff = slot2Pos[0] - slot1Pos[0];

        const arrHeight = array.height;

        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(obj1, [0, -arrHeight]),
            this.scene.animFactory.moveByVec(obj2, [0, arrHeight])
        ]));
        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(obj1, [xDiff, 0]),
            this.scene.animFactory.moveByVec(obj2, [-xDiff, 0])
        ]))
        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(obj1, [0, arrHeight]),
            this.scene.animFactory.moveByVec(obj2, [0, -arrHeight])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));

        array.swap(this.idx1, this.idx2);
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        array.elemAtIdx(this.idx1).pos = array.posAtCellCenterIdx(this.idx2);
        array.elemAtIdx(this.idx2).pos = array.posAtCellCenterIdx(this.idx1);

        array.swap(this.idx1, this.idx2);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        array.elemAtIdx(this.idx1).pos = array.posAtCellCenterIdx(this.idx2);
        array.elemAtIdx(this.idx2).pos = array.posAtCellCenterIdx(this.idx1);

        array.swap(this.idx1, this.idx2);
    }

}
