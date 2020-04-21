<template>
    <div>
        <!-- 输入控件 -->
        <div v-show="showInput" class="inp">
            <my-source @run="run"></my-source>
        </div>
        <!-- 输出控件 -->
        <div v-show="!showInput" class="outp">
            <my-result @goBack="goBack" :leftArray="leftArray" :rightArray="rightArray" :type="type"></my-result>
        </div>
    </div>
</template>
<script>
import mySource from './components/my-source';
import myResult from './components/my-result';

export default {
    name: 'App',
    components: {
        mySource,
        myResult
    },
    data() {
        return {
            type: 1,
            showInput: true,
            leftArray: [],
            rightArray: []
        }
    },
    created() {
        
    },
    methods: {
        run(value) {
            this.type = value.type;
            [this.leftArray, this.rightArray] = value.data;
            if (this.type) {
                this.showInput = false;
            }
        },
        goBack() {
            this.showInput = true;
        }
    }
}
</script>
<style scoped>
@import './assets/style/common.css';
.title {
    margin-top: 100px;
    text-align: center;
    font-weight: bold;
    font-size: 38px;
}
</style>