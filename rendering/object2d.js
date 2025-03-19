
class Object2D {

    constructor() {
        this._parent = null;
        this.pos = [0, 0];
        this.col = [0, 0, 0, 0.0];
    }

    get absPos() {
        let absPos = this.pos;

        if(this.parent !== null) {
            absPos = vec2Add(absPos, this.parent.absPos);
        }

        return absPos;
    }

    set parent(parent) {
        this._parent = parent;
    }

    get parent() {
        return this._parent;
    }

}
