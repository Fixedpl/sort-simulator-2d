
let canvas2d = null;
this.setupChosenSort();

function setupChosenSort() {
    if (canvas2d !== null) {
        document.body.removeChild(canvas2d.htmlObj());
    }

    const sortType = document.getElementById('sort-type').value;

    switch (sortType) {
        case 'bubble':
            canvas2d = new BubbleSort2D(traceBubbleSort(generateRandomArray(6)), [120, 400]);
            break;
        case 'insertion':
            canvas2d = new InsertionSort2D(traceInsertionSort(generateRandomArray(6)), [120, 400]);
            break;
        case 'selection':
            canvas2d = new SelectionSort2D(traceSelectionSort(generateRandomArray(6)), [120, 400]);
            break;
    }

    canvas2d.run();
    document.body.appendChild(canvas2d.htmlObj());

    canvas2d.simulation.playingObs.subscribe((val) => {
        document.getElementById('next').disabled = val;
        document.getElementById('prev').disabled = val;
        document.getElementById('generate').disabled = val;
    });
}

function onPlay() {
    canvas2d.simulation.play();
}

function onPause() {
    canvas2d.simulation.pause();
}

function onPrev() {
    canvas2d.simulation.reverse();
}

function onNext() {
    canvas2d.simulation.skip();
}

function onGenerate() {
    this.setupChosenSort();
}
