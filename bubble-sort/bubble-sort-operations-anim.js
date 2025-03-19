
class SBShowSplitterAfterIdxAnim extends SBShowSplitterAfterIdx {

    constructor(arr, splitter, idx, animPlayer) {
        super(arr, splitter, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        this.splitter.pos = this.arr.absPosAtGapCenterAfterIdx(this.idx);

        const anims = [];

        anims.push(this.animFactory.show(this.splitter));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.splitter.col[3] = 0.0;
    }

    skip() {
        this.splitter.col[3] = 1.0;

        this.splitter.pos = this.arr.absPosAtGapCenterAfterIdx(this.idx);
    }

}

class SBMoveSplitterAfterIdxAnim extends SBMoveSplitterAfterIdx {

    constructor(arr, splitter, idxFrom, idxTo, animPlayer) {
        super(arr, splitter, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const changeVec = vec2Subtract(this.arr.absPosAtGapCenterAfterIdx(this.idxTo), this.arr.absPosAtGapCenterAfterIdx(this.idxFrom));

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.splitter, changeVec));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.splitter.pos = this.arr.absPosAtGapCenterAfterIdx(this.idxFrom);
    }

    skip() {
        this.splitter.pos = this.arr.absPosAtGapCenterAfterIdx(this.idxTo);
    }

}

class SBCompareStartAnim extends SBCompareStart {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const obj1 = this.arr.elemAtIdx(this.idx1);
        const obj2 = this.arr.elemAtIdx(this.idx2);

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

    skip() {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

}

class SBCompareEndAnim extends SBCompareEnd {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const obj1 = this.arr.elemAtIdx(this.idx1);
        const obj2 = this.arr.elemAtIdx(this.idx2);

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([obj1, obj2], COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

    skip() {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

}

class SBSwapAnim extends SBSwap {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const obj1 = this.arr.elemAtIdx(this.idx1);
        const obj2 = this.arr.elemAtIdx(this.idx2);

        const anims = [];

        const slot1Pos = this.arr.posAtCellCenterIdx(this.idx1);
        const slot2Pos = this.arr.posAtCellCenterIdx(this.idx2);

        const xDiff = slot2Pos[0] - slot1Pos[0];

        const arrHeight = this.arr.height;

        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [0, -arrHeight]),
            this.animFactory.moveByVec(obj2, [0, arrHeight])
        ]));
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [xDiff, 0]),
            this.animFactory.moveByVec(obj2, [-xDiff, 0])
        ]))
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(obj1, [0, arrHeight]),
            this.animFactory.moveByVec(obj2, [0, -arrHeight])
        ]));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));

        this.arr.swap(this.idx1, this.idx2);
    }

    reverse() {
        this.arr.elemAtIdx(this.idx1).pos = this.arr.posAtCellCenterIdx(this.idx2);
        this.arr.elemAtIdx(this.idx2).pos = this.arr.posAtCellCenterIdx(this.idx1);

        this.arr.swap(this.idx1, this.idx2);
    }

    skip() {
        this.arr.elemAtIdx(this.idx1).pos = this.arr.posAtCellCenterIdx(this.idx2);
        this.arr.elemAtIdx(this.idx2).pos = this.arr.posAtCellCenterIdx(this.idx1);

        this.arr.swap(this.idx1, this.idx2);
    }

}
