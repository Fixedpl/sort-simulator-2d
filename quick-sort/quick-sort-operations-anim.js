
class SQChoosePivotAnim extends Operation {

    constructor(scene, idx) {
        super();

        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        this.scene.data.set('pivotIdx', this.idx);

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapIncrement(pivotCounter, array.elems[this.idx].val);

        if(array.length == 1) {
            currentNode.sorted = array;
        }

        const anims = [];
        anims.push(ArrayOperations.highlightCell(array, this.idx));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        this.scene.data.delete('pivotIdx');

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapDecrement(pivotCounter, array.elems[this.idx].val);

        ArrayOperations.unhighlightCellInstant(array, this.idx)
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        this.scene.data.set('pivotIdx', this.idx);

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapIncrement(pivotCounter, array.elems[this.idx].val);

        if(array.length == 1) {
            currentNode.sorted = array;
        }

        ArrayOperations.highlightCellInstant(array, this.idx)
    }

}

class SQCompareToPivotAnim extends Operation {

    constructor(scene, idx) {
        super();

        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        this.scene.data.set('compareIdx', this.idx);

        const anims = [];
        anims.push(ArrayOperations.highlightText(currentNode.el, this.idx, pivotIdx));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        this.scene.data.delete('compareIdx');

        ArrayOperations.unhighlightTextInstant(currentNode.el, this.idx, pivotIdx);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        this.scene.data.set('compareIdx', this.idx);

        ArrayOperations.highlightTextInstant(currentNode.el, this.idx, pivotIdx);
    }

}

class SQCompareToPivotEndAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;

        this.compareIdx = null;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        this.compareIdx = this.scene.data.get('compareIdx');

        const anims = [];
        anims.push(ArrayOperations.unhighlightText(currentNode.el, this.compareIdx, pivotIdx));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        ArrayOperations.highlightTextInstant(currentNode.el, this.compareIdx, pivotIdx);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const pivotIdx = this.scene.data.get('pivotIdx');

        this.compareIdx = this.scene.data.get('compareIdx');

        ArrayOperations.unhighlightTextInstant(currentNode.el, this.compareIdx, pivotIdx);
    }

}

class SQPushLeftAnim extends Operation {

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

        if(currentNode.left == null) {
            this.createChildArray();
        }
        const leftChild = currentNode.left;
        const leftChildArr = leftChild.el;
        const leftChildArrWidthBefore = leftChildArr.width;

        const pushText = array.elems[this.idx].val;
        leftChildArr.addText(pushText);

        const leftChildArrWidthAfter = leftChildArr.width;

        const leftChildArrLastIdx = leftChildArr.length - 1;

        alpha0(leftChildArr.cells[leftChildArrLastIdx].col);
        alpha0(leftChildArr.elems[leftChildArrLastIdx].col);

        const outsideDistBefore = Math.max(leftChildArrWidthBefore - (array.width / 2) + this.NODE_GAP, 0);
        const outsideDistAfter = Math.max(leftChildArrWidthAfter - (array.width / 2) + this.NODE_GAP, 0);

        const addedWidth = outsideDistAfter - outsideDistBefore;
        if(addedWidth > 0) {
            this.shiftNodesToFitNew(currentNode, leftChild, addedWidth);
        }

        const leftNodeShift = [-(leftChildArr.cellGap + leftChildArr.cellWidth), 0];

        const anims = [];

        for(let nodeShift of this.nodeShifts.reverse()) {
            anims.push(this.scene.animFactory.moveByVec(nodeShift.node, nodeShift.pos));
        }

        anims.push(this.scene.animFactory.moveByVec(leftChild, leftNodeShift));
        anims.push(this.scene.animFactory.show(leftChildArr.cells[leftChildArrLastIdx]));
        anims.push(this.scene.animFactory.pause());
        anims.push(this.scene.animFactory.show(leftChildArr.elems[leftChildArrLastIdx]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, [-nodeShift.pos[0], 0]);
        }
        this.nodeShifts = [];

        const currentNode = this.scene.data.get('currentNode');
        const leftChild = currentNode.left;
        const leftChildArr = leftChild.el;

        if(leftChildArr.length == 1) {
            currentNode.left = null;
        } else {
            const leftNodeShift = [(leftChildArr.cellGap + leftChildArr.cellWidth), 0];
            
            leftChild.pos = vec2Add(leftChild.pos, leftNodeShift);

            leftChildArr.pop();
        }
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        if(currentNode.left == null) {
            this.createChildArray();
        }
        const leftChild = currentNode.left;
        const leftChildArr = leftChild.el;
        const leftChildArrWidthBefore = leftChildArr.width;

        const pushText = array.elems[this.idx].val;
        leftChildArr.addText(pushText);

        const leftChildArrWidthAfter = leftChildArr.width;

        const leftChildArrLastIdx = leftChildArr.length - 1;

        alpha0(leftChildArr.cells[leftChildArrLastIdx].col);
        alpha0(leftChildArr.elems[leftChildArrLastIdx].col);

        const outsideDistBefore = Math.max(leftChildArrWidthBefore - (array.width / 2) + this.NODE_GAP, 0);
        const outsideDistAfter = Math.max(leftChildArrWidthAfter - (array.width / 2) + this.NODE_GAP, 0);

        const addedWidth = outsideDistAfter - outsideDistBefore;
        if(addedWidth > 0) {
            this.shiftNodesToFitNew(currentNode, leftChild, addedWidth);
        }

        const leftNodeShift = [-(leftChildArr.cellGap + leftChildArr.cellWidth), 0];

        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, nodeShift.pos);
        }

        leftChild.pos = vec2Add(leftChild.pos, leftNodeShift);

        alpha1(leftChildArr.cells[leftChildArrLastIdx].col);
        alpha1(leftChildArr.elems[leftChildArrLastIdx].col);
    }

    createChildArray() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const changeVec = [-this.NODE_GAP + (array.width / 2) + array.cellGap, array.height * 1.5];

        const leftArray = new Array2D([], [0, 0], array.cellGap, this.scene.ctx);
        currentNode.left = new Node2D(leftArray, changeVec, currentNode);
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

class SQPushRightAnim extends Operation {

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

        if(currentNode.right == null) {
            this.createChildArray();
        }
        const rightChild = currentNode.right;
        const rightChildArr = rightChild.el;
        const rightChildArrWidthBefore = rightChildArr.width;

        const pushText = array.elems[this.idx].val;
        rightChildArr.addText(pushText);

        const rightChildArrWidthAfter = rightChildArr.width;

        const rightChildArrLastIdx = rightChildArr.length - 1;
        
        alpha0(rightChildArr.cells[rightChildArrLastIdx].col);
        alpha0(rightChildArr.elems[rightChildArrLastIdx].col);

        const outsideDistBefore = Math.max(rightChildArrWidthBefore - (array.width / 2) + this.NODE_GAP, 0);
        const outsideDistAfter = Math.max(rightChildArrWidthAfter - (array.width / 2) + this.NODE_GAP, 0);

        const addedWidth = outsideDistAfter - outsideDistBefore;
        if(addedWidth > 0) {
            this.shiftNodesToFitNew(currentNode, rightChild, addedWidth);
        }

        const anims = [];

        for(let nodeShift of this.nodeShifts.reverse()) {
            anims.push(this.scene.animFactory.moveByVec(nodeShift.node, nodeShift.pos));
        }

        anims.push(this.scene.animFactory.pause());
        anims.push(this.scene.animFactory.show(rightChildArr.cells[rightChildArrLastIdx]));
        anims.push(this.scene.animFactory.pause());
        anims.push(this.scene.animFactory.show(rightChildArr.elems[rightChildArrLastIdx]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, [-nodeShift.pos[0], 0]);
        }
        this.nodeShifts = [];

        const currentNode = this.scene.data.get('currentNode');
        const rightChild = currentNode.right;
        const rightChildArr = rightChild.el;

        if(rightChildArr.length == 1) {
            currentNode.right = null;
        } else {
            rightChildArr.pop();
        }
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        if(currentNode.right == null) {
            this.createChildArray();
        }
        const rightChild = currentNode.right;
        const rightChildArr = rightChild.el;
        const rightChildArrWidthBefore = rightChildArr.width;

        const pushText = array.elems[this.idx].val;
        rightChildArr.addText(pushText);

        const rightChildArrWidthAfter = rightChildArr.width;

        const rightChildArrLastIdx = rightChildArr.length - 1;
        
        alpha0(rightChildArr.cells[rightChildArrLastIdx].col);
        alpha0(rightChildArr.elems[rightChildArrLastIdx].col);

        const outsideDistBefore = Math.max(rightChildArrWidthBefore - (array.width / 2) + this.NODE_GAP, 0);
        const outsideDistAfter = Math.max(rightChildArrWidthAfter - (array.width / 2) + this.NODE_GAP, 0);

        const addedWidth = outsideDistAfter - outsideDistBefore;
        if(addedWidth > 0) {
            this.shiftNodesToFitNew(currentNode, rightChild, addedWidth);
        }

        for(let nodeShift of this.nodeShifts.reverse()) {
            nodeShift.node.pos = vec2Add(nodeShift.node.pos, nodeShift.pos);
        }

        alpha1(rightChildArr.cells[rightChildArrLastIdx].col);
        alpha1(rightChildArr.elems[rightChildArrLastIdx].col);
    }

    createChildArray() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const changeVec = [this.NODE_GAP + (array.width / 2), array.height * 1.5];

        const rightArray = new Array2D([], [0, 0], array.cellGap, this.scene.ctx);
        currentNode.right = new Node2D(rightArray, changeVec, currentNode);
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

class SQPushMiddleAnim extends Operation {

    constructor(scene, idx) {
        super();

        this.scene = scene;

        this.idx = idx;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapIncrement(pivotCounter, array.elems[this.idx].val);

        const anims = [];

        anims.push(ArrayOperations.highlightCell(array, this.idx));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapDecrement(pivotCounter, array.elems[this.idx].val);

        ArrayOperations.unhighlightCellInstant(array, this.idx);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const pivotCounter = this.scene.data.get('pivotCounter');
        mapIncrement(pivotCounter, array.elems[this.idx].val);

        ArrayOperations.highlightCellInstant(array, this.idx);
    }

}

class SQSortLeftAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const leftChild = currentNode.left;

        this.scene.data.set('currentNode', leftChild);

        onFinishCallback();
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const leftChild = currentNode.left;

        this.scene.data.set('currentNode', leftChild);
    }
}

class SQSortRightAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const rightChild = currentNode.right;

        this.scene.data.set('currentNode', rightChild);

        onFinishCallback();
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const rightChild = currentNode.right;

        this.scene.data.set('currentNode', rightChild);
    }
}

class SQSortLeftEndAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);

        onFinishCallback();
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const leftChild = currentNode.left;

        this.scene.data.set('currentNode', leftChild);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);
    }
}

class SQSortRightEndAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);

        onFinishCallback();
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        const rightChild = currentNode.right;

        this.scene.data.set('currentNode', rightChild);
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');

        const parent = currentNode.parent;

        this.scene.data.set('currentNode', parent);
    }
}

class SQMergeAnim extends Operation {

    constructor(scene) {
        super();

        this.scene = scene;
    }

    execute(onFinishCallback) {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const leftChild = currentNode.left;
        const rightChild = currentNode.right;

        const pivotCounter = this.scene.data.get('pivotCounter');

        const leftChildPos = leftChild != null ? leftChild.sorted.absPos : [0, 0];
        const rightChildPos = rightChild != null ? rightChild.sorted.absPos : [0, 0];

        let childY = leftChildPos[1] > rightChildPos[1] ? leftChildPos[1] : rightChildPos[1];;
        let destY = array.height * 1.5 + childY;

        const newArray = array.slice(0);
        newArray.clear();
        newArray.pos[1] += destY;
        if(childY != 0) {
            newArray.pos[1] -= array.absPos[1];
        }
        alpha0Arr(newArray.cells);
        
        let newArrayIdx = 0;

        if(leftChild != null) {
            const leftChildArr = leftChild.sorted;
            ArrayOperations.copyWholeArrayText(leftChildArr, newArray, newArrayIdx);

            newArrayIdx += leftChildArr.length;
        }

        const pivotValue = array.elems[array.elems.length - 1].val;

        const pivotRepeats = pivotCounter.get(pivotValue);

        ArrayOperations.fillArrayWithValue(pivotValue, newArray, newArrayIdx, pivotRepeats);
        newArrayIdx += pivotRepeats;


        if(rightChild != null) {
            const rightChildArr = rightChild.sorted;

            ArrayOperations.copyWholeArrayText(rightChildArr, newArray, newArrayIdx);
        }

        alpha0Arr(newArray.elems);

        currentNode.sorted = newArray;

        const anims = [];

        anims.push(this.scene.animFactory.showSync(newArray.cells));

        anims.push(this.scene.animFactory.pause());
        newArrayIdx = 0;
        if(leftChild != null) {
            const leftChildArr = leftChild.sorted;

            newArrayIdx += leftChildArr.length;

            anims.push(this.scene.animFactory.showSync(newArray.elems.slice(0, newArrayIdx)));
        }

        anims.push(this.scene.animFactory.pause());
        anims.push(this.scene.animFactory.showSync(newArray.elems.slice(newArrayIdx, newArrayIdx + pivotRepeats)));
        newArrayIdx += pivotRepeats;

        anims.push(this.scene.animFactory.pause());
        if(rightChild != null) {
            anims.push(this.scene.animFactory.showSync(newArray.elems.slice(newArrayIdx)));
        }

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback))
    }

    reverse() {
        const currentNode = this.scene.data.get('currentNode');

        currentNode.sorted = null;
    }

    skip() {
        const currentNode = this.scene.data.get('currentNode');
        const array = currentNode.el;

        const leftChild = currentNode.left;
        const rightChild = currentNode.right;

        const pivotCounter = this.scene.data.get('pivotCounter');

        const leftChildPos = leftChild != null ? leftChild.sorted.absPos : [0, 0];
        const rightChildPos = rightChild != null ? rightChild.sorted.absPos : [0, 0];

        let childY = leftChildPos[1] > rightChildPos[1] ? leftChildPos[1] : rightChildPos[1];;
        let destY = array.height * 1.5 + childY;

        const newArray = array.slice(0);
        newArray.clear();
        newArray.pos[1] += destY;
        if(childY != 0) {
            newArray.pos[1] -= array.absPos[1];
        }

        let newArrayIdx = 0;

        if(leftChild != null) {
            const leftChildArr = leftChild.sorted;
            ArrayOperations.copyWholeArrayText(leftChildArr, newArray, newArrayIdx);

            newArrayIdx += leftChildArr.length;
        }

        const pivotValue = array.elems[array.elems.length - 1].val;

        const pivotRepeats = pivotCounter.get(pivotValue);

        ArrayOperations.fillArrayWithValue(pivotValue, newArray, newArrayIdx, pivotRepeats);
        newArrayIdx += pivotRepeats;

        if(rightChild != null) {
            const rightChildArr = rightChild.sorted;

            ArrayOperations.copyWholeArrayText(rightChildArr, newArray, newArrayIdx);
        }

        currentNode.sorted = newArray;
    }

}
