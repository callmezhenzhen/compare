<template>
<div>
    <div class="go-back"><span @click="goBack">返回</span></div>
    <div v-if="type === 1" class="box">
        <button class="copy-btn" type="button" @click="doCopy(0)">一键复制</button>
        <div class="item flex" v-for="(item, index) in leftArray" :key="index">
            <div class="row-no">{{index}}</div>
            <div class="row-content" v-html="item"></div>
        </div>
    </div>
    <div v-else class="box flex">
        <div class="left flex1">
            <button class="copy-btn" type="button" @click="doCopy(1)">一键复制</button>
            <div class="item flex" v-for="(item, index) in leftArray" :key="index" :class="{diff: item.diff}">
                <div class="row-no">{{index}}</div>
                <div class="row-content" v-html="item.val"></div>
            </div>
        </div>
        <div class="right flex1" v-if="type === 2">
            <button class="copy-btn" type="button" @click="doCopy(2)">一键复制</button>
            <div class="item flex" v-for="(item, index) in rightArray" :key="index" :class="{diff: item.diff}">
                <div class="row-no">{{index}}</div>
                <div class="row-content" v-html="item.val"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class myResult extends Vue{
// export default {
    // name: 'my-result',

    @Prop() type!: number;
    @Prop() leftArray!: Array<any>;
    @Prop() rightArray!: Array<any>;

    // message ='copy message to clipboard';
    
    goBack() {
        this.$emit('goBack');
    }

    doCopy(position: number) {
        let message: string = '123';
        if (position === 0) {
            message = this.leftArray.join('\n').replace(/&nbsp;/g, ' '); //格式化
        } else if (position === 1) {
            message = this.leftArray.map(el => el.val).join('\n').replace(/&nbsp;/g, ' ');
        } else if (position === 2) {
            message = this.rightArray.map(el => el.val).join('\n').replace(/&nbsp;/g, ' ');
        }
        this.$copyText(message).then((e: any) => {
            this.$toast({msg: '复制成功'});
        }, function (e: any) {

        });
    }
    
// }; 
}; 
</script>
<style lang="less" scoped>
@import "../assets/style/common.css";
.box {
    position: relative;
    margin: 30px 0 0 50px;
    border: 1px solid #e1e1e1;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    .row-no {
        width: 30px;
        color: #999;
        background: #f7f7f7;
        border: 1px solid #e1e1e1;
        text-align: center;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
    .row-content {
        margin-left: 5px;
    }
    .diff {
        .row-no {
            background: red;
            color: #fff;
        }
        .row-content {
            color: red;
        }
    }
    .left, 
    .right {
        position: relative;
    }
    .copy-btn {
        position: absolute;
        top: -30px;
        left: 0;
    }
}
.go-back {
    margin-right: 30px;
    text-align: right;
    color: #42b983;
    text-decoration: underline;
}
</style>