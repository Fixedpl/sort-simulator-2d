
class SBCreateSplitterAfterIdxAnim extends Operation {

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
        const splitterPos = array.absPosAtGapCenterAfterIdx(splitterIdx);
        const splitterColor = alpha0(COLORS_FACTORY.RED);
        const splitterHeight = array.height * 1.5;

        this.scene.drawables.set('splitter', new ArraySplitter2D(splitterPos, splitterColor, splitterHeight, this.scene.ctx));

        const splitter = this.scene.drawables.get('splitter');

        this.scene.data.set('splitterIdx', splitterIdx);

        return splitter;
    }

}

class SBMoveSplitterAfterIdxAnim extends Operation {

    constructor(scene, idx) {
        super();

        this.scene = scene;
        this.idx = idx;
    }

    execute(onFinishCallback) {
        const idxFrom = this.idx + 1;
        const idxTo = this.idx;

        const changeVec = vec2Subtract(this.posAtIdx(idxTo), this.posAtIdx(idxFrom));

        this.scene.data.set('splitterIdx', idxTo);

        const anims = [];

        anims.push(this.scene.animFactory.moveByVec(this.scene.drawables.get('splitter'), changeVec));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const splitterIdx = this.idx + 1;

        this.scene.drawables.get('splitter').pos = this.posAtIdx(splitterIdx);
        this.scene.data.set('splitterIdx', splitterIdx);
    }

    skip() {
        this.scene.drawables.get('splitter').pos = this.posAtIdx(this.idx);
        this.scene.data.set('splitterIdx', this.idx);
    }

    posAtIdx(idx) {
        return this.scene.drawables.get('array').absPosAtGapCenterAfterIdx(idx);
    }

}

class SBCompareStartAnim extends Operation {

    constructor(scene, idx1, idx2) {
        super();

        this.scene = scene;

        this.idx1 = idx1;
        this.idx2 = idx2;
    }

    execute(onFinishCallback) {
        const obj1 = this.scene.drawables.get('array').elemAtIdx(this.idx1);
        const obj2 = this.scene.drawables.get('array').elemAtIdx(this.idx2);

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.scene.drawables.get('array').elemAtIdx(this.idx1).col;
        const col2 = this.scene.drawables.get('array').elemAtIdx(this.idx2).col;

        this.scene.data.delete('compareIdx1');
        this.scene.data.delete('compareIdx2');

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

    skip() {
        const col1 = this.scene.drawables.get('array').elemAtIdx(this.idx1).col;
        const col2 = this.scene.drawables.get('array').elemAtIdx(this.idx2).col;

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

}

class SBCompareEndAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;

        this.compareIdx1 = null;
        this.compareIdx2 = null;
    }

    execute(onFinishCallback) {
        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        const obj1 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx1);
        const obj2 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx2);
        
        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx1).col;
        const col2 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx2).col;

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

    skip() {
        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        const col1 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx1).col;
        const col2 = this.scene.drawables.get('array').elemAtIdx(this.compareIdx2).col;

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

}

class SBSwapAnim extends Operation {

    constructor(scene, idx1, idx2) {
        super();

        this.scene = scene;

        this.idx1 = idx1;
        this.idx2 = idx2;
    }

    execute(onFinishCallback) {
        const obj1 = this.scene.drawables.get('array').elemAtIdx(this.idx1);
        const obj2 = this.scene.drawables.get('array').elemAtIdx(this.idx2);

        const anims = [];

        const slot1Pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx1);
        const slot2Pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx2);

        const xDiff = slot2Pos[0] - slot1Pos[0];

        const arrHeight = this.scene.drawables.get('array').height;

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

        this.scene.drawables.get('array').swap(this.idx1, this.idx2);
    }

    reverse() {
        this.scene.drawables.get('array').elemAtIdx(this.idx1).pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx2);
        this.scene.drawables.get('array').elemAtIdx(this.idx2).pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx1);

        this.scene.drawables.get('array').swap(this.idx1, this.idx2);
    }

    skip() {
        this.scene.drawables.get('array').elemAtIdx(this.idx1).pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx2);
        this.scene.drawables.get('array').elemAtIdx(this.idx2).pos = this.scene.drawables.get('array').posAtCellCenterIdx(this.idx1);

        this.scene.drawables.get('array').swap(this.idx1, this.idx2);
    }

}
