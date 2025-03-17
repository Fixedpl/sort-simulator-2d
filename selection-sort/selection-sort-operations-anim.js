
class SSShowSplitterBeforeIdxAnim extends SSShowSplitterBeforeIdx {

    constructor(arr, splitter, idx, animPlayer) {
        super(arr, splitter, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        this.splitter.pos = this.arr.posAtIdxStart(this.idx);

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

        this.splitter.pos = this.arr.posAtIdxStart(this.idx);
    }

}

class SSMoveSplitterBeforeIdxAnim extends SSMoveSplitterBeforeIdx {

    constructor(arr, splitter, idxFrom, idxTo, animPlayer) {
        super(arr, splitter, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const changeVec = vec2Subtract(this.arr.posAtIdxStart(this.idxTo), this.arr.posAtIdxStart(this.idxFrom));

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.splitter.pos, changeVec));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.splitter.pos = this.arr.posAtIdxStart(this.idxFrom);
    }

    skip() {
        this.splitter.pos = this.arr.posAtIdxStart(this.idxTo);
    }

}

class SSMinIndexChooseAnim extends SSMinIndexChoose {

    constructor(arr, idx, animPlayer) {
        super(arr, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        let col = this.arr.cellAtIdx(this.idx).col;

        const anims = [];

        anims.push(this.animFactory.changeColor(col, COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        let col = this.arr.cellAtIdx(this.idx).col;

        vec4CopyValues(col, COLORS.BLACK);
    }

    skip() {
        let col = this.arr.cellAtIdx(this.idx).col;

        vec4CopyValues(col, COLORS.YELLOW);
    }

}

class SSMinIndexChangeAnim extends SSMinIndexChange {

    constructor(arr, idxFrom, idxTo, animPlayer) {
        super(arr, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        let colFrom = this.arr.cellAtIdx(this.idxFrom).col;
        let colTo = this.arr.cellAtIdx(this.idxTo).col;

        const anims = [];

        anims.push(this.animFactory.changeColor(colFrom, COLORS.YELLOW, COLORS.BLACK));
        anims.push(this.animFactory.pause());
        anims.push(this.animFactory.changeColor(colTo, COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        let colFrom = this.arr.cellAtIdx(this.idxFrom).col;
        let colTo = this.arr.cellAtIdx(this.idxTo).col;

        vec4CopyValues(colFrom, COLORS.YELLOW);
        vec4CopyValues(colTo, COLORS.BLACK);
    }

    skip() {
        let colFrom = this.arr.cellAtIdx(this.idxFrom).col;
        let colTo = this.arr.cellAtIdx(this.idxTo).col;

        vec4CopyValues(colFrom, COLORS.BLACK);
        vec4CopyValues(colTo, COLORS.YELLOW);
    }

}

class SSMinIndexReleaseAnim extends SSMinIndexRelease {

    constructor(arr, idx, animPlayer) {
        super(arr, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        let col = this.arr.cellAtIdx(this.idx).col;

        const anims = [];

        anims.push(this.animFactory.changeColor(col, COLORS.YELLOW, COLORS.BLACK));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        let col = this.arr.cellAtIdx(this.idx).col;

        vec4CopyValues(col, COLORS.YELLOW);
    }

    skip() {
        let col = this.arr.cellAtIdx(this.idx).col;

        vec4CopyValues(col, COLORS.BLACK);
    }

}

class SSCompareStartAnim extends SSCompareStart {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([col1, col2], COLORS.BLACK, COLORS.YELLOW));
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

class SSCompareEndAnim extends SSCompareEnd {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const col1 = this.arr.elemAtIdx(this.idx1).col;
        const col2 = this.arr.elemAtIdx(this.idx2).col;

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([col1, col2], COLORS.YELLOW, COLORS.BLACK));
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

class SSSwapAnim extends SSSwap {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const pos1 = this.arr.elemAtIdx(this.idx1).pos;
        const pos2 = this.arr.elemAtIdx(this.idx2).pos;

        const anims = [];

        const slot1Pos = this.arr.posAtIdx(this.idx1);
        const slot2Pos = this.arr.posAtIdx(this.idx2);

        const xDiff = slot2Pos[0] - slot1Pos[0];

        const arrHeight = this.arr.height;

        anims.push(new AnimationSync([
            this.animFactory.moveByVec(pos1, [0, -arrHeight]),
            this.animFactory.moveByVec(pos2, [0, arrHeight])
        ]));
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(pos1, [xDiff, 0]),
            this.animFactory.moveByVec(pos2, [-xDiff, 0])
        ]))
        anims.push(new AnimationSync([
            this.animFactory.moveByVec(pos1, [0, arrHeight]),
            this.animFactory.moveByVec(pos2, [0, -arrHeight])
        ]));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));

        this.arr.swap(this.idx1, this.idx2);
    }

    reverse() {
        this.arr.elemAtIdx(this.idx1).pos = this.arr.posAtIdx(this.idx2);
        this.arr.elemAtIdx(this.idx2).pos = this.arr.posAtIdx(this.idx1);

        this.arr.swap(this.idx1, this.idx2);
    }

    skip() {
        this.arr.elemAtIdx(this.idx1).pos = this.arr.posAtIdx(this.idx2);
        this.arr.elemAtIdx(this.idx2).pos = this.arr.posAtIdx(this.idx1);

        this.arr.swap(this.idx1, this.idx2);
    }

}
