
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
    
        const splitter = ArrayOperations.createSplitterBeforeIdx(array, this.idx, this.scene);

        this.scene.drawables.set('splitter', splitter);
        this.scene.data.set('splitterIdx', this.idx);

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
        const array = this.scene.drawables.get('array');
        const splitter = this.scene.drawables.get('splitter');

        this.scene.data.set('splitterIdx', this.idx);

        const anims = [];

        anims.push(ArrayOperations.moveSplitterRight(array, splitter));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');
        const splitter = this.scene.drawables.get('splitter');

        this.scene.data.set('splitterIdx', this.idx - 1);

        ArrayOperations.moveSplitterLeftInstant(array, splitter);
    }

    skip() {
        const array = this.scene.drawables.get('array');
        const splitter = this.scene.drawables.get('splitter');

        this.scene.data.set('splitterIdx', this.idx);

        ArrayOperations.moveSplitterRightInstant(array, splitter);
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

        this.scene.data.set('minValueIdx', this.idx);

        const anims = ArrayOperations.highlightCell(array, this.idx);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        this.scene.data.delete('minValueIdx');

        ArrayOperations.unhighlightCellInstant(array, this.idx);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('minValueIdx', this.idx);

        ArrayOperations.highlightCellInstant(array, this.idx);
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

        const anims = [];

        anims.push(...ArrayOperations.unhighlightCell(array, this.prevIdx));
        anims.push(...ArrayOperations.highlightCell(array, this.newIdx));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('minValueIdx', this.prevIdx);

        ArrayOperations.unhighlightCellInstant(array, this.newIdx);
        ArrayOperations.highlightCellInstant(array, this.prevIdx)
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.prevIdx = this.scene.data.get('minValueIdx');
        this.scene.data.set('minValueIdx', this.newIdx);

        ArrayOperations.unhighlightCellInstant(array, this.prevIdx);
        ArrayOperations.highlightCellInstant(array, this.newIdx)
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
        this.scene.data.delete('minValueIdx');

        const anims = ArrayOperations.unhighlightCell(array, this.idx);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('minValueIdx', this.idx);

        ArrayOperations.highlightCellInstant(array, this.idx);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.idx = this.scene.data.get('minValueIdx');
        this.scene.data.delete('minValueIdx');

        ArrayOperations.unhighlightCellInstant(array, this.idx);
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

        const anims = ArrayOperations.highlightText(array, this.idx1, this.idx2);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        ArrayOperations.unhighlightTextInstant(array, this.idx1, this.idx2);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        ArrayOperations.highlightTextInstant(array, this.idx1, this.idx2);
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

        const anims = ArrayOperations.unhighlightText(array, this.compareIdx1, this.compareIdx2);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        ArrayOperations.highlightTextInstant(array, this.compareIdx1, this.compareIdx2);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        ArrayOperations.unhighlightTextInstant(array, this.compareIdx1, this.compareIdx2);
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

        const anims = ArrayOperations.swap(array, this.idx1, this.idx2);

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const array = this.scene.drawables.get('array');

        ArrayOperations.swapInstant(array, this.idx1, this.idx2);
    }

    skip() {
        const array = this.scene.drawables.get('array');

        ArrayOperations.swapInstant(array, this.idx1, this.idx2);
    }

}
