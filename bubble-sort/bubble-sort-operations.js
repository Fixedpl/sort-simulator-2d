
class SBShowSplitterAfterIdx extends Operation {

    constructor(arr, splitter, idx) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idx = idx;
    }

}

class SBMoveSplitterAfterIdx extends Operation {

    constructor(arr, splitter, idxFrom, idxTo) {
        super();
        this.arr = arr;
        this.splitter = splitter;
        this.idxFrom = idxFrom;
        this.idxTo = idxTo;
    }

}

class SBCompareStart extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class SBCompareEnd extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}

class SBSwap extends Operation {

    constructor(arr, idx1, idx2) {
        super();
        this.arr = arr;
        this.idx1 = idx1;
        this.idx2 = idx2;
    }

}
