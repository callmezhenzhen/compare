<template>
<div>
    <div class="go-back"><span @click="goBack">返回</span></div>
    <div v-if="type === 1" class="box">
        <div class="item flex" v-for="(item, index) in leftArray" :key="index">
            <div class="row-no">{{index}}</div>
            <div class="row-content" v-html="item"></div>
        </div>
    </div>
    <div v-else class="box flex">
        <div class="left flex1">
            <div class="item flex" v-for="(item, index) in leftArray" :key="index" :class="{diff: item.diff}">
                <div class="row-no">{{index}}</div>
                <div class="row-content" v-html="item.val"></div>
            </div>
        </div>
        <div class="right flex1" v-if="type === 2">
            <div class="item flex" v-for="(item, index) in rightArray" :key="index" :class="{diff: item.diff}">
                <div class="row-no">{{index}}</div>
                <div class="row-content" v-html="item.val"></div>
            </div>
        </div>
    </div>
    <button type="button" @click="doCopy">Copy!</button>
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

    message ='copy message to clipboard';
    
    goBack() {
        this.$emit('goBack');
    }

    doCopy() {
        (this as any).$copyText(this.message).then(function (e: any) {
            console.log(e, 'yes')
        }, function (e: any) {
            console.log(e, 'not')
        });
    }
    
// }; 
}; 
</script>
<style lang="less" scoped>
@import "../assets/style/common.css";
.box {
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
}
.go-back {
    margin-right: 30px;
    text-align: right;
    color: #42b983;
    text-decoration: underline;
}
</style>