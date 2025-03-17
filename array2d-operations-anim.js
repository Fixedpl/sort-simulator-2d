
class Arr2dCompareStartAnim extends Arr2dCompareStart {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dCompareEndAnim extends Arr2dCompareEnd {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dSwapAnim extends Arr2dSwap {

    constructor(arr, idx1, idx2, animPlayer) {
        super(arr, idx1, idx2);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dShowSplitterBeforeIdxAnim extends Arr2dShowSplitterBeforeIdx {

    constructor(arr, splitter, idx, animPlayer) {
        super(arr, splitter, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dShowSplitterAfterIdxAnim extends Arr2dShowSplitterAfterIdx {

    constructor(arr, splitter, idx, animPlayer) {
        super(arr, splitter, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        this.splitter.pos = this.arr.posAtIdxEnd(this.idx);

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

        this.splitter.pos = this.arr.posAtIdxEnd(this.idx);
    }

}

class Arr2dMoveSplitterBeforeIdxAnim extends Arr2dMoveSplitterBeforeIdx {

    constructor(arr, splitter, idxFrom, idxTo, animPlayer) {
        super(arr, splitter, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dMoveSplitterAfterIdxAnim extends Arr2dMoveSplitterAfterIdx {

    constructor(arr, splitter, idxFrom, idxTo, animPlayer) {
        super(arr, splitter, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const changeVec = vec2Subtract(this.arr.posAtIdxEnd(this.idxTo), this.arr.posAtIdxEnd(this.idxFrom));

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.splitter.pos, changeVec));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.splitter.pos = this.arr.posAtIdxEnd(this.idxFrom);
    }

    skip() {
        this.splitter.pos = this.arr.posAtIdxEnd(this.idxTo);
    }

}

class Arr2dChooseKeyAnim extends Arr2dChooseKey {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const changeVec = [0, -this.arrWithKey.arr2d.height * 2];

        this.arrWithKey.key = this.arrWithKey.arr2d.removeElemAtIdx(this.idx);

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.arrWithKey.key.pos, changeVec));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const newY = this.arrWithKey.key.pos[1] + this.arrWithKey.arr2d.height * 2;

        this.arrWithKey.key.pos[1] = newY;

        this.arrWithKey.arr2d.putElemAtIdx(this.arrWithKey.key, this.idx);
        this.arrWithKey.key = null;
    }

    skip() {
        this.arrWithKey.key = this.arrWithKey.arr2d.removeElemAtIdx(this.idx);

        const newY = this.arrWithKey.key.pos[1] - this.arrWithKey.arr2d.height * 2;

        this.arrWithKey.key.pos[1] = newY;
    }

}

class Arr2dCompareToKeyStartAnim extends Arr2dCompareToKeyStart {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([col1, col2], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.animFactory.pause());

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

    skip() {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

}

class Arr2dCompareToKeyEndAnim extends Arr2dCompareToKeyEnd {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        const anims = [];

        anims.push(this.animFactory.changeColorSimultaneously([col1, col2], COLORS.YELLOW, COLORS.BLACK));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        vec4CopyValues(col1, COLORS.YELLOW);
        vec4CopyValues(col2, COLORS.YELLOW);
    }

    skip() {
        const col1 = this.arrWithKey.arr2d.elemAtIdx(this.idx).col;
        const col2 = this.arrWithKey.key.col;

        vec4CopyValues(col1, COLORS.BLACK);
        vec4CopyValues(col2, COLORS.BLACK);
    }

}

class Arr2dMoveToRightAnim extends Arr2dMoveToRight {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const pos = this.arrWithKey.arr2d.posAtIdx(this.idx);
        const posToRight = this.arrWithKey.arr2d.posAtIdx(this.idx + 1);

        const changeVec = [posToRight[0] - pos[0], 0];

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.arrWithKey.arr2d.elemAtIdx(this.idx).pos, changeVec));

        this.arrWithKey.arr2d.moveElemAtIdxRight(this.idx);

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.arrWithKey.arr2d.moveElemAtIdxLeft(this.idx + 1);

        this.arrWithKey.arr2d.elemAtIdx(this.idx).pos = this.arrWithKey.arr2d.posAtIdx(this.idx);
    }

    skip() {
        this.arrWithKey.arr2d.elemAtIdx(this.idx).pos = this.arrWithKey.arr2d.posAtIdx(this.idx + 1);

        this.arrWithKey.arr2d.moveElemAtIdxRight(this.idx);
    }

}

class Arr2dPlaceKeyAnim extends Arr2dPlaceKey {

    constructor(arrWithKey, keyIdx, idx, animPlayer) {
        super(arrWithKey, keyIdx, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
    }

    execute(onFinishCallback) {
        const keyPos = vec2Add(this.arrWithKey.arr2d.posAtIdx(this.keyIdx), [0, -this.arrWithKey.arr2d.height * 2]);

        const changeVec = vec2Subtract(this.arrWithKey.arr2d.posAtIdx(this.idx), keyPos);

        const anims = [];

        anims.push(this.animFactory.moveByVec(this.arrWithKey.key.pos, [changeVec[0], 0]));
        anims.push(this.animFactory.moveByVec(this.arrWithKey.key.pos, [0, changeVec[1]]));

        this.arrWithKey.arr2d.putElemAtIdx(this.arrWithKey.key, this.idx);
        this.arrWithKey.key = null;

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        this.arrWithKey.key = this.arrWithKey.arr2d.removeElemAtIdx(this.idx);

        this.arrWithKey.key.pos = vec2Add(this.arrWithKey.arr2d.posAtIdx(this.keyIdx), [0, -this.arrWithKey.arr2d.height * 2]);
    }

    skip() {
        this.arrWithKey.arr2d.putElemAtIdx(this.arrWithKey.key, this.idx);
        this.arrWithKey.key = null;

        this.arrWithKey.arr2d.elemAtIdx(this.idx).pos = this.arrWithKey.arr2d.posAtIdx(this.idx);
    }

}

class Arr2dMinIndexChooseAnim extends Arr2dMinIndexChoose {

    constructor(arr, idx, animPlayer) {
        super(arr, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dMinIndexChangeAnim extends Arr2dMinIndexChange {

    constructor(arr, idxFrom, idxTo, animPlayer) {
        super(arr, idxFrom, idxTo);
        this.animPlayer = animPlayer;
        
        this.animFactory = new Arr2dAnimFactory();
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

class Arr2dMinIndexReleaseAnim extends Arr2dMinIndexRelease {

    constructor(arr, idx, animPlayer) {
        super(arr, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new Arr2dAnimFactory();
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
