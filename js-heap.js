const Heap = function (customComparator) {
    const array = [];
    const comparator = (customComparator !== undefined && typeof customComparator === 'function') ? customComparator : (a, b) => a > b;

    const hasParent = (index) => {
        return parentIndex(index) >= 0;
    };

    const parentIndex = (index) => {
        return Math.floor((index - 1) / 2);
    };

    const parentValue = (index) => {
        return array[parentIndex(index)];
    };

    const hasLeftChild = (index) => {
        return leftChildIndex(index) < array.length;
    };

    const leftChildIndex = (index) => {
        return index * 2 + 1;
    };

    const leftChildValue = (index) => {
        return array[leftChildIndex(index)];
    };

    const hasRightChild = (index) => {
        return rightChildIndex(index) < array.length;
    };

    const rightChildIndex = (index) => {
        return index * 2 + 2;
    };

    const rightChildValue = (index) => {
        return array[rightChildIndex(index)];
    };

    const swap = (index1, index2) => {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    };

    const heapifyUp = (index) => {
        while (hasParent(index)) {
            const currentValue = array[index]
            if (comparator(currentValue, parentValue(index))) {
                swap(index, parentIndex(index));
                index = parentIndex(index);
            } else {
                break;
            }
        }
    };

    const heapifyDown = (index) => {
        let swapIndex = index;
        if (hasLeftChild(index)) {
            if (comparator(leftChildValue(index), array[index])) {
                swapIndex = leftChildIndex(index);
            }
        }
        if (hasRightChild(index)) {
            if (comparator(rightChildValue(index), leftChildValue(index))) {
                swapIndex = rightChildIndex(index);
            }
        }
        if (swapIndex !== index) {
            swap(swapIndex, index);
            heapifyDown(swapIndex);
        }
    };

    const _func = {};

    _func.push = (value) => {
        array.push(value);
        heapifyUp(array.length - 1);
    };

    _func.pushMany = (values) => {
        values.forEach(value => _func.push(value));
    };

    _func.pop = () => {
        swap(0, array.length - 1);
        const returnValue = array.pop();
        heapifyDown(0);
        return returnValue;
    };

    _func.size = () => {
        return array.length;
    };

    _func.peek = () => {
        return array[0];
    };

    _func.clear = () => {
        array.length = 0;
    };

    return Object.freeze(_func)
};

const maxHeap = Heap();

maxHeap.pushMany([1, 9, 2, 8, 3, 7, 4, 6, 5, 0]);

while (maxHeap.size() > 0) {
    console.log(maxHeap.pop());
}

console.log('-----');

const minHeap = Heap((a, b) => a < b);

minHeap.pushMany([1, 9, 2, 8, 3, 7, 4, 6, 5, 0]);

while (minHeap.size() > 0) {
    console.log(minHeap.pop());
}