
class SSShowSplitterBeforeIdx extends Operation {

    constructor(arr, splitter, idx) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idx = idx;
    }

}

class SSMoveSplitterBeforeIdx extends Operation {

    constructor(arr, splitter, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class SSMinIndexChoose extends Operation {

    constructor(arr, idx) {
        super();
        this.arr = arr;
        this.idx = idx;
    }

}

class SSMinIndexChange extends Operation {

    constructor(arr, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class SSMinIndexRelease extends Operation {

    constructor(arr, idx) {
        super();
        this.arr = arr;
        this.idx = idx;
    }

}

class SSCompareStart extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class SSCompareEnd extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class SSSwap extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

