
class SIChooseKeyAnim extends Operation {

    constructor(scene, idx) {
        super();

        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        const key = array.removeElemAtIdx(this.idx);
        this.scene.drawables.set('key', key);
        this.scene.data.set('keyIdx', this.idx);
        
        const changeVec = [0, -array.height * 2];

        const anims = [];
        anims.push(this.scene.animFactory.moveByVec(key, changeVec));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const array = this.scene.drawables.get('array');
        const key = this.scene.drawables.get('key');

        const newY = key.pos[1] + array.height * 2;

        key.pos[1] = newY;

        array.putElemAtIdx(key, this.idx);
        
        this.scene.drawables.delete('key');
        this.scene.data.delete('keyIdx');
    }

    skip() {
        const array = this.scene.drawables.get('array');

        const key = array.removeElemAtIdx(this.idx);
        this.scene.drawables.set('key', key);
        this.scene.data.set('keyIdx', this.idx);

        const newY = key.pos[1] - array.height * 2;

        key.pos[1] = newY;
    }

}

class SICompareToKeyStartAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const compared = this.scene.drawables.get('array').elemAtIdx(this.idx);
        const key = this.scene.drawables.get('key');

        this.scene.data.set('compareIdx', this.idx);

        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([compared, key], COLORS.BLACK, COLORS.YELLOW));
        anims.push(this.scene.animFactory.pause());

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const compared = this.scene.drawables.get('array').elemAtIdx(this.idx);
        const key = this.scene.drawables.get('key');

        vec4CopyValues(compared.col, COLORS.BLACK);
        vec4CopyValues(key.col, COLORS.BLACK);
    }

    skip() {
        const compared = this.scene.drawables.get('array').elemAtIdx(this.idx);
        const key = this.scene.drawables.get('key');

        this.scene.data.set('compareIdx', this.idx);

        vec4CopyValues(compared.col, COLORS.YELLOW);
        vec4CopyValues(key.col, COLORS.YELLOW);
    }

}

class SICompareToKeyEndAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;

        this.compareIdx = null;
    }

    execute(onFinishCallback) {
        this.compareIdx = this.scene.data.get('compareIdx');

        const compared = this.scene.drawables.get('array').elemAtIdx(this.compareIdx);
        const key = this.scene.drawables.get('key');

        const anims = [];

        anims.push(this.scene.animFactory.changeColorSimultaneously([compared, key], COLORS.YELLOW, COLORS.BLACK));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const compared = this.scene.drawables.get('array').elemAtIdx(this.compareIdx);
        const key = this.scene.drawables.get('key');

        vec4CopyValues(compared.col, COLORS.YELLOW);
        vec4CopyValues(key.col, COLORS.YELLOW);
    }

    skip() {
        this.compareIdx = this.scene.data.get('compareIdx');

        const compared = this.scene.drawables.get('array').elemAtIdx(this.compareIdx);
        const key = this.scene.drawables.get('key');

        vec4CopyValues(compared.col, COLORS.BLACK);
        vec4CopyValues(key.col, COLORS.BLACK);
    }

}

class SIMoveToRightAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const array = this.scene.drawables.get('array');

        const pos = array.posAtCellCenterIdx(this.idx);
        const posToRight = array.posAtCellCenterIdx(this.idx + 1);

        const changeVec = [posToRight[0] - pos[0], 0];

        const anims = [];

        anims.push(this.scene.animFactory.moveByVec(array.elemAtIdx(this.idx), changeVec));

        this.scene.data.set('compareIdx', this.scene.data.get('compareIdx') + 1);

        array.moveElemAtIdxRight(this.idx);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('compareIdx', this.scene.data.get('compareIdx') - 1);

        array.moveElemAtIdxLeft(this.idx + 1);

        array.elemAtIdx(this.idx).pos = array.posAtCellCenterIdx(this.idx);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        array.elemAtIdx(this.idx).pos = array.posAtCellCenterIdx(this.idx + 1);

        this.scene.data.set('compareIdx', this.scene.data.get('compareIdx') + 1);

        array.moveElemAtIdxRight(this.idx);
    }

}

class SIPlaceKeyAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.prevIdx = null;
        this.idx = idx;
    }

    execute(onFinishCallback) {
        this.prevIdx = this.scene.data.get('keyIdx');

        const array = this.scene.drawables.get('array');
        const key = this.scene.drawables.get('key');

        const keyPos = vec2Add(array.posAtCellCenterIdx(this.prevIdx), [0, -array.height * 2]);

        const changeVec = vec2Subtract(array.posAtCellCenterIdx(this.idx), keyPos);

        const anims = [];

        anims.push(this.scene.animFactory.moveByVec(key, [changeVec[0], 0]));
        anims.push(this.scene.animFactory.moveByVec(key, [0, changeVec[1]]));

        array.putElemAtIdx(key, this.idx);

        this.scene.drawables.delete('key');
        this.scene.data.delete('keyIdx');

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        const key = array.removeElemAtIdx(this.idx);
        this.scene.drawables.set('key', key);
        this.scene.data.set('keyIdx', this.prevIdx);

        key.pos = vec2Add(array.posAtCellCenterIdx(this.prevIdx), [0, -array.height * 2]);
    }

    skip() {
        this.prevIdx = this.scene.data.get('keyIdx');

        const array = this.scene.drawables.get('array');
        const key = this.scene.drawables.get('key');

        array.putElemAtIdx(key, this.idx);

        this.scene.drawables.delete('key');
        this.scene.data.delete('keyIdx');

        array.elemAtIdx(this.idx).pos = array.posAtCellCenterIdx(this.idx);
    }

}
