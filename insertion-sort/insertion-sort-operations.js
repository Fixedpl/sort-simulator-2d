
class SIChooseKey extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class SICompareToKeyStart extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class SICompareToKeyEnd extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class SIMoveToRight extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class SIPlaceKey extends Operation {

    constructor(arrWithKey, keyIdx, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.keyIdx = keyIdx;
        this.idx = idx;
    }

}
