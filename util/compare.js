/**
 * 生成差异
 */
const createDiffs = (a1, a2) => {
    let diffIdxs = [];
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            diffIdxs.push(i);
        }
    }
    return diffIdxs
}

/**
 * a1和a2长度一致
 */
const appendDiffs = (a1, a2, diffIdxs) => {
    if (a1.length !== a2.length) return [a1, a2]
    let t1 = [], t2 =[];
    for (let i = 0; i < a1.length; i++) {
        let diff = diffIdxs.findIndex(el => el === i) > -1;
        t1.push({
            content: a1[i],
            diff: diff
        });
        t2.push({
            content: a2[i],
            diff: diff
        });
    }
    return [t1, t2]
}

/**
 * 给最终的diff添加换行
 */
const appenWrapToFinalDiff = (a1, a2, psIdx, nsIdx) => {
    let len = a1.length - a2.length; // 长度差值
    while (nsIdx > psIdx) {
        for (let i = psIdx + 1; i <= nsIdx - 1; i++) {
            if (a1[i] !== a2[i]) {
                psIdx = i;
                break;
            }
        }
        for (let j = nsIdx - 1; j >= psIdx; j--) {
            if (a2[j] !== a1[j + len]) {
                nsIdx = j;
                break;
            }
        }
    }
    a2.splice(psIdx + 1, 0, ...Array(len).fill('\n')); // 填充换行符
    return [a1, a2];
}

/**
 *  比较生成最终展示用的输出
 */
const compare = (str1, str2) => {
    if (str2 && str2) {
        // 转数组比较
        let a1 = str1.split('\n'),
            a2 = str2.split('\n');
        // 比较长度
        if (a1.length > 0 && a2.length >0) {
            if (a1.length !== a2.length) { // 长度不一致
                let reverse = a1.length > a2.length ? false : true;
                if (reverse) [a1, a2] = [a2, a1]; // 反转，始终规定a1最长
                let psIdx = -1,
                    nsIdx = a2.length;
                [a1, a2] = appenWrapToFinalDiff(a1, a2, psIdx, nsIdx);
                if (reverse) [a1, a2] = [a2, a1]; // 再反转过来
                [a1, a2] = appendDiffs(a1, a2, createDiffs(a1, a2));
            } else { // 长度一致
                [a1, a2] = appendDiffs(a1, a2, createDiffs(a1, a2));
            }
        }
        return [a1, a2]
    }
    return ['', '']
}

export default compare
