const getDp = function(x: Array<string>, y: Array<string>): Array<any> {
    let m = x.length;
    let n = y.length;
    let dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = [0];
    }
    for (let j = 1; j <= n; j++) {
        dp[0][j] = 0;
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (x[i - 1] === y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                if (dp[i - 1][j] > dp[i][j - 1]) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i][j - 1];
                }
            }
        }
    }
    return dp
}

const getLcs = function(dp: Array<any>, x: Array<string>, y: Array<string>, i: number, j: number): Array<string> {
    if (i === 0 || j === 0) {
        return []
    }
    if (x[i - 1] === y[j - 1]) {
        return getLcs(dp, x, y, i - 1, j - 1).concat(x[i - 1])
    } else {
        if (dp[i - 1][j] > dp[i][j - 1]) {
            return getLcs(dp, x, y, i - 1, j)
        } else {
            return getLcs(dp, x, y, i, j - 1)
        }
    }
}

const sameTwoList = function(x: Array<string>, y: Array<string>, lcs: Array<string>): Array<any> {
    let xs = 0; //x起始下标
    let xe = 0; //x当前匹配的lcs下标
    let ys = 0; //y起始下标
    let ye = 0; //y当前匹配的lcs下标
    for (let len = lcs.length, i = 0; i < len; i++) {
        xe = x.indexOf(lcs[i], xs); //每次循环之后，xs === ys
        ye = y.indexOf(lcs[i], xs);
        let dval = xe - xs - (ye - ys); // x, y匹配差值
        let dvabs = Math.abs(dval)
        if (dval > 0) { //填充y 
            dvabs > 0 && y.splice(ye, 0, ...Array(dvabs).fill('\n'));
            ys = xs = xe;
        } else { //填充x
            dvabs > 0 && x.splice(xe, 0, ...Array(dvabs).fill('\n'));
            xs = ys = ye;
        }
    }
    return [x, y]
}

const appendDiffIdx = function(x: Array<string>, y: Array<string>): Array<any> {
    if (x.length !== y.length) return [x, y]
    let tx = [];
    let ty = [];
    for (let i = 0, len = x.length; i < len; i++) {
        let diff = true;
        if (x[i] === y[i]) {
            diff = false;
        }
        tx.push({val: x[i], diff});
        ty.push({val: y[i], diff});
    }
    return[tx, ty]
}


const compare = function(str1: string, str2: string): Array<any> {
    // 转数组比较
    let a1: Array<any> = str1.split('\n'),
        a2: Array<any> = str2.split('\n');
    let dp = getDp(a1, a2);
    let lcs = getLcs(dp, a1, a2, a1.length, a2.length);
    [a1, a2] = sameTwoList(a1, a2, lcs); //此时a1,a2的长度必然相等，因为lcs中最后一位必为'}'
    return appendDiffIdx(a1, a2)
}

export default compare