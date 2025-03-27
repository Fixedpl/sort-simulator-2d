

class SMSplitAnim extends Operation {

    constructor(scene, idx) {
        super();
        
        this.scene = scene;

        this.idx = idx;

        this.NODE_GAP = 20;

        this.nodeShifts = [];
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const array = currentNode.el;
        
        let arrLeft = array.slice(0, this.idx);
        let arrRight = array.slice(this.idx);

        currentNode.left = new Node2D(arrLeft, [0, 0], currentNode);
        currentNode.right = new Node2D(arrRight, [0, 0], currentNode);

        if(arrLeft.elems.length == 1) {
            currentNode.left.sorted = arrLeft;
        }

        if(arrRight.elems.length == 1) {
            currentNode.right.sorted = arrRight;
        }

        this.shiftNodesToFitNew(currentNode, currentNode.left, this.NODE_GAP);
        this.shiftNodesToFitNew(currentNode, currentNode.right, this.NODE_GAP);
        
        const anims = [];
        
        for(let nodeShift of this.nodeShifts.reverse()) {
            anims.push(this.scene.animFactory.moveByVec(nodeShift.node, nodeShift.pos));
        }
        
        
        const childrenYShift = array.height * 1.5;
        const changeVec = [this.NODE_GAP, childrenYShift];
        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));


        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, [-nodeShift.pos[0], 0]);
        }
        this.nodeShifts = [];

        const currentNode = this.scene.data.get('currentNode');

        currentNode.left = null;
        currentNode.right = null;
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const array = currentNode.el;

        let arrLeft = array.slice(0, this.idx);
        let arrRight = array.slice(this.idx);

        currentNode.left = new Node2D(arrLeft, [0, 0], currentNode);
        currentNode.right = new Node2D(arrRight, [0, 0], currentNode);

        if(arrLeft.elems.length == 1) {
            currentNode.left.sorted = arrLeft;
        }

        if(arrRight.elems.length == 1) {
            currentNode.right.sorted = arrRight;
        }

        const childrenYShift = array.height * 1.5;

        this.shiftNodesToFitNew(currentNode, currentNode.left, this.NODE_GAP);
        this.shiftNodesToFitNew(currentNode, currentNode.right, this.NODE_GAP);

        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, nodeShift.pos);
        }

        const changeVec = [this.NODE_GAP, childrenYShift];

        currentNode.left.pos = [-changeVec[0], changeVec[1]];
        currentNode.right.pos = [changeVec[0], changeVec[1]];
    }

    shiftNodesToFitNew(currentNode, callingNode, addedWidth) {
        const parent = currentNode.parent;
        if(parent == null) {
            return;
        }

        if(parent.isLeftSon(currentNode) && currentNode.isRightSon(callingNode)) {
            this.nodeShifts.push({node: currentNode, pos: [-addedWidth, 0]});
        } else if(parent.isRightSon(currentNode) && currentNode.isLeftSon(callingNode)) {
            this.nodeShifts.push({node: currentNode, pos: [addedWidth, 0]});
        }

        this.shiftNodesToFitNew(parent, currentNode, addedWidth);
    }

}

class SMSortLeftStartAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeLeft = currentNode.left;

        this.scene.data.set('currentNode', currentNodeLeft);

        onFinishCallback();
        /*
        const anims = [];

        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
        */
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeLeft = currentNode.left;

        this.scene.data.set('currentNode', currentNodeLeft);
    }
}

class SMSortLeftEndAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);

        onFinishCallback();
        /*
        const anims = [];

        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
        */
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeLeft = currentNode.left;

        this.scene.data.set('currentNode', currentNodeLeft);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);
    }
}

class SMSortRightStartAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeRight = currentNode.right;

        this.scene.data.set('currentNode', currentNodeRight);

        onFinishCallback();
        /*
        const anims = [];

        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
        */
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeRight = currentNode.right;

        this.scene.data.set('currentNode', currentNodeRight);
    }
}

class SMSortRightEndAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);

        onFinishCallback();
        /*
        const anims = [];

        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
        */
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeRight = currentNode.right;

        this.scene.data.set('currentNode', currentNodeRight);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const currentNodeParent = currentNode.parent;

        this.scene.data.set('currentNode', currentNodeParent);
    }
}

class SMMergeAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const mergeArray = this.createMergeArray();

        const anims = [];
        anims.push(this.scene.animFactory.showSync(mergeArray.cells.cells));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        currentNode.sorted = null;

        this.scene.data.delete('mergeArray');
        this.scene.data.delete('mergeArrayIdx');

        this.scene.data.delete('i');
        this.scene.data.delete('j');
    }

    skip() {
        const mergeArray = this.createMergeArray();

        alpha1Arr(mergeArray.cells.cells);
    }

    createMergeArray() {
        const currentNode = this.scene.data.get('currentNode');
        
        const leftChild = currentNode.left.sorted;
        const rightChild = currentNode.right.sorted;

        const leftChildPos = leftChild.absPos;
        const rightChildPos = rightChild.absPos;

        let destY = leftChildPos[1] > rightChildPos[1] ? leftChildPos[1] : rightChildPos[1];
        destY += leftChild.height * 1.5;

        const mergeArray = currentNode.el.slice(0);
        mergeArray.clear();
        mergeArray.pos[1] += destY;
        mergeArray.pos[1] -= currentNode.el.absPos[1];

        alpha0Arr(mergeArray.cells.cells);

        currentNode.sorted = mergeArray;

        this.scene.data.set('mergeArray', mergeArray);
        this.scene.data.set('mergeArrayIdx', 0);

        this.scene.data.set('i', 0);
        this.scene.data.set('j', 0);

        return mergeArray;
    }

}

class SMMergeCompareAnim extends Operation {

    constructor(scene, idx1, idx2) {
        super();
        
        this.scene = scene;

        this.idx1 = idx1;
        this.idx2 = idx2;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        const anims = [];
        anims.push(new AnimationSync([
            ArrayOperations.highlightText(leftSortedArr, this.idx1),
            ArrayOperations.highlightText(rightSortedArr, this.idx2)
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        this.scene.data.delete('compareIdx1');
        this.scene.data.delete('compareIdx2');

        ArrayOperations.unhighlightTextInstant(leftSortedArr, this.idx1);
        ArrayOperations.unhighlightTextInstant(rightSortedArr, this.idx2);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        this.scene.data.set('compareIdx1', this.idx1);
        this.scene.data.set('compareIdx2', this.idx2);

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        ArrayOperations.highlightTextInstant(leftSortedArr, this.idx1);
        ArrayOperations.highlightTextInstant(rightSortedArr, this.idx2);
    }

}

class SMMergePickLeftAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const elem = this.copyToMergeArray();

        const anims = [];
        anims.push(this.scene.animFactory.show(elem));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const i = this.scene.data.get('i');

        const mergeArray = this.scene.data.get('mergeArray');
        const mergeArrayIdx = this.scene.data.get('mergeArrayIdx');

        this.scene.data.set('mergeArrayIdx', mergeArrayIdx - 1);
        this.scene.data.set('i', i - 1);

        mergeArray.elems[mergeArrayIdx - 1] = null;
    }

    skip() {
        const elem = this.copyToMergeArray();

        alpha1(elem.col);
    }

    copyToMergeArray() {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;

        const i = this.scene.data.get('i');

        const mergeArray = this.scene.data.get('mergeArray');
        const mergeArrayIdx = this.scene.data.get('mergeArrayIdx');

        ArrayOperations.copyArrayText(leftSortedArr, i, mergeArray, mergeArrayIdx);
        alpha0(mergeArray.elems[mergeArrayIdx].col);

        this.scene.data.set('mergeArrayIdx', mergeArrayIdx + 1);
        this.scene.data.set('i', i + 1);

        return mergeArray.elems[mergeArrayIdx];
    }

}

class SMMergePickRightAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;
    }

    execute(onFinishCallback) {
        const elem = this.copyToMergeArray();

        const anims = [];
        anims.push(this.scene.animFactory.show(elem));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const j = this.scene.data.get('j');

        const mergeArray = this.scene.data.get('mergeArray');
        const mergeArrayIdx = this.scene.data.get('mergeArrayIdx');

        this.scene.data.set('mergeArrayIdx', mergeArrayIdx - 1);
        this.scene.data.set('j', j - 1);

        mergeArray.elems[mergeArrayIdx - 1] = null;
    }

    skip() {
        const elem = this.copyToMergeArray();

        alpha1(elem.col);
    }

    copyToMergeArray() {
        const currentNode = this.scene.data.get('currentNode');

        const rightSortedArr = currentNode.right.sorted;

        const j = this.scene.data.get('j');

        const mergeArray = this.scene.data.get('mergeArray');
        const mergeArrayIdx = this.scene.data.get('mergeArrayIdx');

        ArrayOperations.copyArrayText(rightSortedArr, j, mergeArray, mergeArrayIdx);
        alpha0(mergeArray.elems[mergeArrayIdx].col);

        this.scene.data.set('mergeArrayIdx', mergeArrayIdx + 1);
        this.scene.data.set('j', j + 1);

        return mergeArray.elems[mergeArrayIdx];
    }

}

class SMMergePickRestAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;

        this.mergeArray = null;
        this.mergeArrayIdxStart = null;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        let i = this.scene.data.get('i');
        let j = this.scene.data.get('j');

        const mergeArray = this.scene.data.get('mergeArray');
        let mergeArrayIdx = this.scene.data.get('mergeArrayIdx');
        this.mergeArrayIdxStart = mergeArrayIdx;
        this.mergeArray = mergeArray;

        const anims = [];

        while(i != leftSortedArr.length) {
            ArrayOperations.copyArrayText(leftSortedArr, i++, mergeArray, mergeArrayIdx++);
            alpha0(mergeArray.elems[mergeArrayIdx - 1].col);

            anims.push(this.scene.animFactory.show(mergeArray.elems[mergeArrayIdx - 1]));
        }

        while(j != rightSortedArr.length) {
            ArrayOperations.copyArrayText(rightSortedArr, j++, mergeArray, mergeArrayIdx++);
            alpha0(mergeArray.elems[mergeArrayIdx - 1].col);

            anims.push(this.scene.animFactory.show(mergeArray.elems[mergeArrayIdx - 1]));
        }

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        for(let i = this.mergeArrayIdxStart; i < this.mergeArray.length; i++) {
            this.mergeArray.elems[i] = null;
        }

        this.scene.data.set('mergeArray', this.mergeArray);
        this.scene.data.set('mergeArrayIdx', this.mergeArrayIdxStart);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        let i = this.scene.data.get('i');
        let j = this.scene.data.get('j');

        const mergeArray = this.scene.data.get('mergeArray');
        let mergeArrayIdx = this.scene.data.get('mergeArrayIdx');
        this.mergeArrayIdxStart = mergeArrayIdx;
        this.mergeArray = mergeArray;

        while(i != leftSortedArr.length) {
            ArrayOperations.copyArrayText(leftSortedArr, i++, mergeArray, mergeArrayIdx++);
        }

        while(j != rightSortedArr.length) {
            ArrayOperations.copyArrayText(rightSortedArr, j++, mergeArray, mergeArrayIdx++);
        }
    }

}

class SMMergeCompareEndAnim extends Operation {

    constructor(scene) {
        super();
        
        this.scene = scene;

        this.compareIdx1 = null;
        this.compareIdx2 = null;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        const anims = [];
        anims.push(new AnimationSync([
            ArrayOperations.unhighlightText(leftSortedArr, this.compareIdx1),
            ArrayOperations.unhighlightText(rightSortedArr, this.compareIdx2)
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        ArrayOperations.highlightTextInstant(leftSortedArr, this.compareIdx1);
        ArrayOperations.highlightTextInstant(rightSortedArr, this.compareIdx2);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const leftSortedArr = currentNode.left.sorted;
        const rightSortedArr = currentNode.right.sorted;

        this.compareIdx1 = this.scene.data.get('compareIdx1');
        this.compareIdx2 = this.scene.data.get('compareIdx2');

        ArrayOperations.unhighlightTextInstant(leftSortedArr, this.compareIdx1);
        ArrayOperations.unhighlightTextInstant(rightSortedArr, this.compareIdx2);
    }

}
