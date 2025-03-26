
class SMHighlightArrayAnim extends Operation {

    constructor(arr, animPlayer) {
        super(arr);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const obj = this.arr.cells;

        const anims = [];

        anims.push(this.animFactory.changeColor(obj, COLORS.BLACK, COLORS.YELLOW));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col = this.arr.cells.col;

        vec4CopyValues(col, COLORS.BLACK);
    }

    skip() {
        const col = this.arr.cells.col;

        vec4CopyValues(col, COLORS.YELLOW);
    }

}

class SMUnhighlightArrayAnim extends Operation {

    constructor(arr, animPlayer) {
        super(arr);
        this.animPlayer = animPlayer;

        this.animFactory = new AnimFactory();
    }

    execute(onFinishCallback) {
        const obj = this.arr.cells;

        const anims = [];

        anims.push(this.animFactory.changeColor(obj, COLORS.YELLOW, COLORS.BLACK));

        this.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {
        const col = this.arr.cells.col;

        vec4CopyValues(col, COLORS.YELLOW);
    }

    skip() {
        const col = this.arr.cells.col;

        vec4CopyValues(col, COLORS.BLACK);
    }

}

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
            currentNode.left.sorted = currentNode.left;
        }

        if(arrRight.elems.length == 1) {
            currentNode.right.sorted = currentNode.right;
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
            currentNode.left.sorted = currentNode.left;
        }

        if(arrRight.elems.length == 1) {
            currentNode.right.sorted = currentNode.right;
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
        const currentNode = this.scene.data.get('currentNode');
        
        const leftChild = currentNode.left;
        const rightChild = currentNode.right;

        const anims = [];
        anims.push(new AnimationSync([
            this.scene.animFactory.moveByVec(currentNode.left,  [-changeVec[0], changeVec[1]]),
            this.scene.animFactory.moveByVec(currentNode.right, [changeVec[0], changeVec[1]])
        ]));

        this.scene.animPlayer.enqueue(new AnimationGroup(anims, onFinishCallback));
    }

    reverse() {

    }

    skip() {

    }

}
