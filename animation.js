
const TWEENS = {
    LINEAR: (t, duration) => { 
        return t / duration; 
    },
    EASE_IN_OUT_SIN: (t, duration) => { 
        t /= duration;
        return -(Math.cos(Math.PI * t) - 1) / 2;
    },
    EASE_IN_OUT_QUAD: (t, duration) => { 
        t /= duration;
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    },
    EASE_IN_OUT_CUBIC: (t, duration) => { 
        t /= duration;
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    EASE_IN_OUT_QUART: (t, duration) => { 
        t /= duration;
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    },
    EASE_IN_OUT_BACK: (t, duration) => { 
        t /= duration;
        const c1 = 1.70158;
		const c2 = c1 * 1.525;

		return t < 0.5
			? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2.0
			: (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2.0;
    },
    EASE_IN_OUT_ELASTIC: (t, duration) => { 
        t /= duration;
        const c5 = (2 * Math.PI) / 4.5;

		return t == 0.0 ? 0.0
			: t == 1.0
			? 1.0
			: t < 0.5
			? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2.0
			: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2.0 + 1;
    },
}

class AnimationFunc {

    constructor() {}

    onUpdate(t, duration) {}

}

class EmptyAnimationFunc extends AnimationFunc {

    constructor() {
        super();
    }

}

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
