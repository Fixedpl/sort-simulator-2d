
function fpSubtract(a, b) {
    return Math.abs(a - b) < Number.EPSILON ? 0 : a - b;
}

function vec2Length(vec) {
    return Math.hypot(vec[0], vec[1]);
}

function vecs2Length(vecs) {
    return vecs.reduce((sum, vec) => sum + vec2Length(vec), 0);
}

function vec2Multiply(vec, scalar) {
    return vec.map(num => num * scalar);
}

function vec2Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
}

function vec2Subtract(vec1, vec2) {
    return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
}

function vec2LengthProportions(vecs) {
    const lengthSum = vecs2Length(vecs);

    return vecs.map(vec => vec2Length(vec) / lengthSum);
}

function vec3Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2]];
}

function vec3Multiply(vec, scalar) {
    return vec.map(num => num * scalar);
}

function vec4Add(vec1, vec2) {
    return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec1[2] + vec2[2], vec1[3] + vec2[3]];
}

function vec4Multiply(vec, scalar) {
    return vec.map(num => num * scalar);
}

function vec4CopyValues(dstVec, srcVec) {
    dstVec[0] = srcVec[0];
    dstVec[1] = srcVec[1];
    dstVec[2] = srcVec[2];
    dstVec[3] = srcVec[3];
}

function swap(arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

function generateRandomArray(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1);
}

class Observable {

    constructor() {
        this.subscribers = [];
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify(data) {
        this.subscribers.forEach((callback) => callback(data));
    }
}

const COLORS = {
    BLACK: [0, 0, 0, 1.0],
    YELLOW: [255, 255, 0, 1.0],
    LIGHTBLUE: [173, 216, 230, 1.0],
    RED: [255, 0, 0, 1.0]
}

const COLORS_FACTORY = {
    get BLACK() {
        return [0, 0, 0, 1.0];
    },
    get YELLOW() {
        return [255, 255, 0, 1.0];
    },
    get LIGHTBLUE() {
        return [173, 216, 230, 1.0];
    },
    get RED() {
        return [255, 0, 0, 1.0];
    }
}

function alpha0(col) {
    col[3] = 0.0;
    return col;
}

function alpha0Arr(arr) {
    for(let el of arr) {
        alpha0(el.col);
    }
    return arr;
}

function alpha1(col) {
    col[3] = 1.0;
    return col;
}

function alpha1Arr(arr) {
    for(let el of arr) {
        alpha1(el.col);
    }
    return arr;
}

function mapIncrement(map, key) {
    const value = map.get(key);

    if(value != null) {
        map.set(key, value + 1);
    } else {
        map.set(key, 1);
    }
}

function mapDecrement(map, key) {
    const value = map.get(key);

    if (value != null) {
        map.set(key, value - 1);
    }
}
