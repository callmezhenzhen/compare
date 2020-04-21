/**
 * 判断array
 */
const isArray = (val) => {
    return Object.prototype.toString.call(val) === '[object Array]'
};

/**
 * 判断object
 */
const isObj = (val) => {
    return Object.prototype.toString.call(val) === '[object Object]'
};

/**
 * 添加空格，根据一个tab缩紧 = 4个空格
 */
const appendBlank = (level) => {
    let str = '';
    for (let i = 0; i < level * 4; i++) {
        str += '&nbsp;';
    }
    return str
};

/**
 * 转合法的Object
 */
const toObj = (input) => {
    let obj;
    if (typeof input === 'object') { // 对象直接用
        obj = input;
    } else if (typeof input === 'string') {
        try {
            obj = JSON.parse(input); // 尝试JSON.parse();
        } catch(e) {
            try {
                obj = new Function('return ' + input)(); // 处理这种非标准的JSON字符串，比如 {x: 1}, {'x': 1}等
            } catch (e) {
                window.alert('请输入JSON字符串');
                return
            }
            
        }
    }
    return obj
};

/**
 * 深度优先遍历obj
 */
const deepTraverseObj = (obj, level) => {
    let str = isArray(obj) ? '[' : '{'; // 添加 '{' or '['
    level++;
    let counter = 0; // 指示当前遍历obj位置
    for (let key in obj) {
        str += counter++ > 0 ? ',\n' : '\n'; // 添加',' + 换行符
        str += appendBlank(level); // 在key-value键值对之前添加空格
        if (isObj(obj[key]) || isArray(obj[key])) {
            str += key + ':&nbsp;' + deepTraverseObj(obj[key], level); // 深度优先遍历
        } else {
            str += key + ':&nbsp;' + obj[key];
        }
    }
    level--;
    if (counter === 0) { // 当前遍历的obj是空对象或者空数组，直接添加'{' or '['
        str += isArray(obj) ? ']' : '}';
    } else {
        str += '\n' + appendBlank(level) + (isArray(obj) ? ']' : '}'); // 添加换行符 + 空格 + '{' or '['
    }
    return str
};

/**
 * 执行入口
 */
const formatToJsonString = (input) => {
    let level = 0; // 指示当前对象嵌套层级，用于控制obj结束时添加空格
    let obj = toObj(input);
    if (obj) return deepTraverseObj(obj, level); // output作为最终的字符串输出到网页
};

export default formatToJsonString