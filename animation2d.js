
class MovementAnimationFunc extends AnimationFunc {

    constructor(pos, vec, tweenFunc) {
        super();
        this.pos = pos;
        this.vec = vec;
        this.tweenFunc = tweenFunc;

        this.vecAcc = [0, 0];
    }

    onUpdate(t, duration) {
        const vecAccNew = vec2Multiply(this.vec, this.tweenFunc(t, duration));

        const vecDt = vec2Subtract(vecAccNew, this.vecAcc);

        this.pos[0] += vecDt[0];
        this.pos[1] += vecDt[1];

        this.vecAcc = vecAccNew;
    }

}

class ColorAnimationFunc extends AnimationFunc {
    
    constructor(col, colStart, colEnd, tweenFunc) {
        super();
        this.col = col;
        this.colStart = colStart;
        this.colEnd = colEnd;
        this.tweenFunc = tweenFunc;
    }

    onUpdate(t, duration) {
        const multiplier = this.tweenFunc(t, duration);

        const newCol = vec4Add(vec4Multiply(this.colStart, (1 - multiplier)), vec4Multiply(this.colEnd, multiplier));

        vec4CopyValues(this.col, newCol);
    }

}

class AlphaAnimationFunc extends AnimationFunc {
    
    constructor(col, alphaStart, alphaEnd, tweenFunc) {
        super();
        this.col = col;
        this.alphaStart = alphaStart;
        this.alphaEnd = alphaEnd;
        this.tweenFunc = tweenFunc;
    }

    onUpdate(t, duration) {
        const multiplier = this.tweenFunc(t, duration);

        const newAlpha = this.alphaStart * (1 - multiplier) + (this.alphaEnd * multiplier);

        this.col[3] = newAlpha;
    }

}
