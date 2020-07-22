<template>
    <div class="box">
        <!-- 顶部功能按钮 -->
        <div class="flex">
            <div @click="run" class="like-btn">{{type === 1 ? '格式化' : '比较'}}</div>
            <div @click="toggleType" class="t-type like-btn">{{type === 1 ? '切换到比较' : '切换到格式化'}}</div>
        </div>
        <div class="t-area flex">
            <div class="flex1">
                <div class="text-box">
                    <textarea class="text-ipt" name="l-t" v-model="leftTValue"></textarea>
                    <button v-if="leftTValue" @click="clearText(1)" class="clear-txt">清空</button>
                </div>
            </div>
            <div v-if="type === 2" class="flex1">
                <div class="text-box">
                    <textarea class="text-ipt" name="r-t" v-model="rightTValue"></textarea>
                    <button v-if="rightTValue" @click="clearText(2)" class="clear-txt">清空</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import toObj from '../../util-ts/toObject';
import formatToJsonString from '../../util-ts/formatToJsonString';
import toString from '../../util-ts/toString';
import compare from '../../util-ts/compareLcs';
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class mySource extends Vue {
    // name: 'my-source',
    type = 1;
    leftTValue = '';
    rightTValue = '';

    // 切换功能类型
    toggleType() {
        this.type = this.type === 1 ? 2 : 1;
    }
    // 执行功能
    run() {
        if (this.type === 1 && this.leftTValue === '' || this.type === 2 && (this.leftTValue === '' || this.rightTValue === '')) return
        if (this.type === 1) {
            let obj = toObj(this.leftTValue);
            if (obj === 'NOT_JSON_STRING') {
                this.$toast('请输入JSON字符串');
                return
            }
            let leftString = formatToJsonString(obj);
            if (leftString) {
                this.$emit('run', {
                    type: this.type,
                    data: [leftString.split('\n')]
                });
            }
        } else if (this.type === 2) {
            let [leftString, rightString] = compare(toString(this.leftTValue), toString(this.rightTValue));
            if (leftString || rightString) {
                this.$emit('run', {
                    type: this.type,
                    data: [leftString, rightString]
                });
            }
        }
    }
    // 清除输入框内容
    clearText(position: number) {
        position === 1 ? this.leftTValue = '' : this.rightTValue = '';
    }
};
</script>
<style lang="less" scoped>
@import "../assets/style/common.css";
.box, .text-box {
    font-family: "Microsoft YaHei";
    font-size: 14px;
}
.text-box {
    position: relative;
    width: 90%;
    .text-ipt {
        display: block;
        width: 100%;
        min-height: 300px;
        resize: none;
        border: 1px solid #ddd;
    }
    .clear-txt {
        position: absolute;
        right: 10px;
        bottom: 6px;
        padding: 4px 8px;
    }
}
.t-type {
    margin-left: 50px;
}
.t-area {
    margin-top: 30px;
}
.like-btn {
    color: #42b983;
    text-decoration: underline;
}
</style>