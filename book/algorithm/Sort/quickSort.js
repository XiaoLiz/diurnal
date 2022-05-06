let array = [232,681,90,23,45,910,50,32,9,5,2]

// 快速排序
function quickSort(arr) {
    console.log(arr, 'arr')
    // 跳出循环
    if( arr.length < 2) {
        return arr
    };
    let flag = arr[0];

    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
        if( arr[i] > flag ) {
            right.push(arr[i])
        } else {
            left.push(arr[i])
        }
    };
    return quickSort(left).concat(flag, quickSort(right));
};
console.log(quickSort(array));

