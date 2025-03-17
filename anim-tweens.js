
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
