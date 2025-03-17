
class Animation {

    constructor(animFunc, time, onFinishCallback = () => {}) {
        this.animFunc = animFunc;
        this.time = time;
        this.onFinishCallback = onFinishCallback;

        this.timeAcc = 0;
    }

    onUpdate(dt) {
        const timeAccNew = Math.min(this.time, this.timeAcc + dt);
        dt = fpSubtract(timeAccNew, this.timeAcc);

        this.animFunc.onUpdate(timeAccNew, this.time);
        
        this.timeAcc = timeAccNew;

        return dt;
    }

    onFinish() {
        this.onFinishCallback();
    }

}

class AnimationSync {

    constructor(anims, onFinishCallback = () => {}) {
        this.anims = anims;
        this.onFinishCallback = onFinishCallback;
    }

    onUpdate(dt) {
        let dtAnimMax = 0;

        for(let anim of this.anims) {
            dtAnimMax = Math.max(dtAnimMax, anim.onUpdate(dt));
        }

        return dtAnimMax;
    }

    onFinish() {
        this.onFinishCallback();
    }

}

class AnimationGroup {

    constructor(anims, onFinishCallback = () => {}) {
        this.anims = anims;
        this.onFinishCallback = onFinishCallback;
    }

    onUpdate(dt) {
        let dtLeft = dt;

        for(let anim of this.anims) {
            dtLeft -= anim.onUpdate(dtLeft);

            if(dtLeft == 0) {
                break;
            }
        }

        return dt - dtLeft;
    }

    onFinish() {
        this.onFinishCallback();
    }

}

class AnimationPlayer {

    constructor() {
        this.animQueue = [];

        this.curAnim = null;

        this.playing = false;
    }

    enqueue(anim) {
        if (this.curAnim === null) {
            this.curAnim = anim;
        } else {
            this.animQueue.push(anim);
        }
    }

    enqueueArr(anims) {
        this.animQueue.push(...anims);
        if(this.curAnim === null) {
            this.next();
        }
    }

    next() {
        this.curAnim.onFinish();
        this.curAnim = this.animQueue.length > 0 ? this.animQueue.shift() : null;
    }

    pause() {
        this.playing = false;
    }

    play() {
        this.playing = true;
    }

    canPlay() {
        return this.playing && this.curAnim !== null;
    }

    onUpdate(dt) {
        while (this.canPlay() && dt > 0) {
            const dtAnim = this.curAnim.onUpdate(dt);
            dt -= dtAnim;

            if(dtAnim === 0) {
                this.next();
            }
        }
    }

}
