

function traceBubbleSort(arr) {
    const trace = new ArrayTrace(arr);

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        
        trace.innerLoopBoundaryEvaluation(n - 1 - i);
        for (let j = 0; j < n - 1 - i; j++) {

            trace.compareStart(j, j + 1);
            if (arr[j] > arr[j + 1]) {
                trace.swap(j, j + 1);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            trace.compareEnd();
        }
    }

    return trace;
}

function traceInsertionSort(arr) {
    const trace = new ArrayTrace(arr);

    const n = arr.length;

    for (let i = 1; i < n; i++) {
        trace.chooseKey(i);
        let key = arr[i];
        let j = i - 1;

        while (j >= 0) {

            trace.compareToKeyStart(j);
            if(arr[j] > key) {
                trace.moveToRight(j);
                trace.compareToKeyEnd();
                arr[j + 1] = arr[j];
                j--;
            } else {
                trace.compareToKeyEnd();
                break;
            }
            
        }
        trace.placeKey(j + 1);
        arr[j + 1] = key;
    }

    return trace;
}

function traceSelectionSort(arr) {
    const trace = new ArrayTrace(arr);

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        trace.minIndexChoose(minIndex);

        for (let j = i + 1; j < n; j++) {
            trace.compareStart(j, minIndex);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                trace.minIndexChange(minIndex);
            }
            trace.compareEnd();
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            trace.swap(i, minIndex);
        }
        trace.minIndexRelease();
    }

    return trace;
}
