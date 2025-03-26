

class Node2D extends Object2D {

    constructor(el, pos, parent = null, left = null, right = null) {
        super(parent);

        this.el = el;
        this.el.parent = this;

        this.pos = pos;
        this.left = left;
        this.right = right;

        this.width = el.width;
    }

    isLeftSon(node) {
        return this.left === node;
    }

    isRightSon(node) {
        return this.right === node;
    }

    draw() {
        this.el.draw();

        if(this.left != null) {
            this.left.draw();
        }

        if(this.right != null) {
            this.right.draw();
        }
    }

}
