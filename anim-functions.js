
class AnimationFunc {

    constructor() {}

    onUpdate(t, duration) {}

}

class EmptyAnimationFunc extends AnimationFunc {

    constructor() {
        super();
    }

}

class MovementAnimationFunc extends AnimationFunc {

    constructor(obj, vec, tweenFunc) {
        super();
        this.obj = obj;
        this.vec = vec;
        this.tweenFunc = tweenFunc;

        this.vecAcc = [0, 0];
    }

    onUpdate(t, duration) {
        const vecAccNew = vec2Multiply(this.vec, this.tweenFunc(t, duration));

        const vecDt = vec2Subtract(vecAccNew, this.vecAcc);

        this.obj.pos = vec2Add(this.obj.pos, vecDt);

        this.vecAcc = vecAccNew;
    }

}

class ColorAnimationFunc extends AnimationFunc {
    
    constructor(obj, colStart, colEnd, tweenFunc) {
        super();
        this.obj = obj;
        this.colStart = colStart;
        this.colEnd = colEnd;
        this.tweenFunc = tweenFunc;
    }

    onUpdate(t, duration) {
        const multiplier = this.tweenFunc(t, duration);

        const newCol = vec4Add(vec4Multiply(this.colStart, (1 - multiplier)), vec4Multiply(this.colEnd, multiplier));

        vec4CopyValues(this.obj.col, newCol);
    }

}

class AlphaAnimationFunc extends AnimationFunc {
    
    constructor(obj, alphaStart, alphaEnd, tweenFunc) {
        super();
        this.obj = obj;
        this.alphaStart = alphaStart;
        this.alphaEnd = alphaEnd;
        this.tweenFunc = tweenFunc;
    }

    onUpdate(t, duration) {
        const multiplier = this.tweenFunc(t, duration);

        const newAlpha = this.alphaStart * (1 - multiplier) + (this.alphaEnd * multiplier);

        this.obj.col[3] = newAlpha;
    }

}
