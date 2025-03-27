
class AnimFactory {

    constructor() {
        this.animTime = 300;
        this.pauseTime = 10;
        this.tweenFunc = TWEENS.EASE_IN_OUT_QUAD;
    }

    changeColor(obj, colStart, colEnd) {
        return new Animation(new ColorAnimationFunc(obj, colStart, colEnd, this.tweenFunc), this.animTime);
    }

    changeColorSimultaneously(objs, colStart, colEnd) {
        const anims = [];

        for(let obj of objs) {
            anims.push(new Animation(new ColorAnimationFunc(obj, colStart, colEnd, this.tweenFunc), this.animTime));
        }

        return new AnimationSync(anims);
    }

    pause() {
        return new Animation(new EmptyAnimationFunc(), this.pauseTime);
    }

    moveByVec(obj, vec) {
        return new Animation(new MovementAnimationFunc(obj, vec, this.tweenFunc), this.animTime);
    }

    show(obj) {
        return new Animation(new AlphaAnimationFunc(obj, 0.0, 1.0, this.tweenFunc), this.animTime);
    }

    showSync(arr) {
        const anims = [];

        for(let el of arr) {
            anims.push(this.show(el));
        }

        return new AnimationSync(anims);
    }

    hide(obj) {
        return new Animation(new AlphaAnimationFunc(obj, 1.0, 0.0, this.tweenFunc), this.animTime);
    }

}
