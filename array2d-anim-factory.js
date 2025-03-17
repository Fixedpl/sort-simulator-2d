
class Arr2dAnimFactory {

    constructor() {
        this.animTime = 300;
        this.pauseTime = 10;
        this.tweenFunc = TWEENS.EASE_IN_OUT_QUAD;
    }

    changeColor(col, colStart, colEnd) {
        return new Animation(new ColorAnimationFunc(col, colStart, colEnd, this.tweenFunc), this.animTime);
    }

    changeColorSimultaneously(cols, colStart, colEnd) {
        const anims = [];

        for(let col of cols) {
            anims.push(new Animation(new ColorAnimationFunc(col, colStart, colEnd, this.tweenFunc), this.animTime));
        }

        return new AnimationSync(anims);
    }

    pause() {
        return new Animation(new EmptyAnimationFunc(), this.pauseTime);
    }

    moveByVec(pos, vec) {
        return new Animation(new MovementAnimationFunc(pos, vec, this.tweenFunc), this.animTime);
    }

    show(obj) {
        return new Animation(new AlphaAnimationFunc(obj.col, 0.0, 1.0, this.tweenFunc), this.animTime);
    }

    hide(obj) {
        return new Animation(new AlphaAnimationFunc(obj.col, 1.0, 0.0, this.tweenFunc), this.animTime);
    }

}
