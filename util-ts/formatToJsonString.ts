const isArray:(val: any) => boolean = 
    function(val) {
        return Object.prototype.toString.call(val) === '[object Array]'
    }

const isObj: (val: any) => boolean = 
    function(val) {
        return Object.prototype.toString.call(val) === '[object Object]'
    }

const appendBlank: (level: number) => string = 
    function(level) {
        let str = '';
        for (let i = 0; i < level * 4; i++) {
            str += '&nbsp;';
        }
        return str
    }

const deepTraverseObj: (obj: Object, level: number) => string =
    function(obj, level) {
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
    }

const formatToJsonString: (obj: Object) => string =
    function(obj) {
        let level = 0; // 指示当前对象嵌套层级，用于控制obj结束时添加空格
        return deepTraverseObj(obj, level); // output作为最终的字符串输出到网页
    }

export default formatToJsonString