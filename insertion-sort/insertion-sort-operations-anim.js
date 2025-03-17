
class SIChooseKeyAnim extends SIChooseKey {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
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

class SICompareToKeyStartAnim extends SICompareToKeyStart {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
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

class SICompareToKeyEndAnim extends SICompareToKeyEnd {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
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

class SIMoveToRightAnim extends SIMoveToRight {

    constructor(arrWithKey, idx, animPlayer) {
        super(arrWithKey, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
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

class SIPlaceKeyAnim extends SIPlaceKey {

    constructor(arrWithKey, keyIdx, idx, animPlayer) {
        super(arrWithKey, keyIdx, idx);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
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
