const toObj: (input: string) => any = 
    function(input) {
        const msg = 'NOT_JSON_STRING';
        let obj;
        try {
            obj = JSON.parse(input); // 尝试JSON.parse();
        } catch(e) {
            try {
                obj = new Function('return ' + input)(); // 处理这种非标准的JSON字符串，比如 {x: 1}, {'x': 1}等
            } catch (e) {
                return msg
            } 
        }
        return typeof obj === 'object' ? obj : msg // 兼容 JSON.parse('1') => 1
    }

export default toObj