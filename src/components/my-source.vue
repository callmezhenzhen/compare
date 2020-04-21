<template>
    <div class="box">
        <!-- 顶部功能按钮 -->
        <div class="flex">
            <div @click="run" class="like-btn">{{type === 1 ? '格式化' : '比较'}}</div>
            <div @click="toggleType" class="t-type like-btn">{{type === 1 ? '切换到比较' : '切换到格式化'}}</div>
        </div>
        <div class="t-area flex">
            <div class="flex1">
                <textarea class="text-box" name="l-t" v-model="leftTValue"></textarea>
            </div>
            <div v-if="type === 2" class="flex1">
                <textarea class="text-box" name="r-t" v-model="rightTValue"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
import formatToJsonString from '../../util/formatToJsonString';
import compare from '../../util/compare';
export default {
    name: 'my-source',
    props: {
        
    },
    data() {
        return {
            type: 1,
            leftTValue: '',
            rightTValue: '',
            leftString: '',
            rightString: ''
        }
    },
    methods: {
        // 切换功能类型
        toggleType() {
            this.type = this.type === 1 ? 2 : 1;
        },
        // 执行功能
        run() {
            if (this.type === 1 && this.leftTValue === '' || this.type === 2 && (this.leftTValue === '' || this.rightTValue === '')) return
            if (this.type === 1) {
                this.leftString = formatToJsonString(this.leftTValue);
                if (this.leftString) {
                    this.$emit('run', {
                        type: this.type,
                        data: [this.leftString.split('\n')]
                    });
                }
            } else if (this.type === 2) {
                [this.leftString, this.rightString] = compare(formatToJsonString(this.leftTValue), formatToJsonString(this.rightTValue));
                if (this.leftString || this.rightString) {
                    this.$emit('run', {
                        type: this.type,
                        data: [this.leftString, this.rightString]
                    });
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import "../assets/style/common.css";
.box, .text-box {
    font-family: "Microsoft YaHei";
    font-size: 14px;
}
.text-box {
    width: 90%;
    resize: none;
    height: 300px;
}
.t-type {
    margin-left: 20px;
}
.t-area {
    margin-top: 30px;
}
.like-btn {
    color: #42b983;
    text-decoration: underline;
}
</style>