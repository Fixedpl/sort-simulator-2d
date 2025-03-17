

class Arr2dCompareStart extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class Arr2dCompareEnd extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class Arr2dSwap extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class Arr2dShowSplitterBeforeIdx extends Operation {

    constructor(arr, splitter, idx) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idx = idx;
    }

}

class Arr2dShowSplitterAfterIdx extends Operation {

    constructor(arr, splitter, idx) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idx = idx;
    }

}

class Arr2dMoveSplitterBeforeIdx extends Operation {

    constructor(arr, splitter, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class Arr2dMoveSplitterAfterIdx extends Operation {

    constructor(arr, splitter, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class Arr2dChooseKey extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class Arr2dCompareToKeyStart extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class Arr2dCompareToKeyEnd extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class Arr2dMoveToRight extends Operation {

    constructor(arrWithKey, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.idx = idx;
    }

}

class Arr2dPlaceKey extends Operation {

    constructor(arrWithKey, keyIdx, idx) {
        super();
        this.arrWithKey = arrWithKey;
        this.keyIdx = keyIdx;
        this.idx = idx;
    }

}

class Arr2dMinIndexChoose extends Operation {

    constructor(arr, idx) {
        super();
        this.arr = arr;
        this.idx = idx;
    }

}

class Arr2dMinIndexChange extends Operation {

    constructor(arr, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class Arr2dMinIndexRelease extends Operation {

    constructor(arr, idx) {
        super();
        this.arr = arr;
        this.idx = idx;
    }

}
