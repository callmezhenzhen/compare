// 引入vue
import Vue from 'vue';
import App from '@/app';
import VueRouter from 'vue-router';
import { router } from '@/router/router'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard);
Vue.use(VueRouter);
// 创建vue根实例
new Vue({
    el: '#app',
    router,
    template: '<App></App>',
    components: {App},
    data: {
        msg: 'hello'
    }
});
