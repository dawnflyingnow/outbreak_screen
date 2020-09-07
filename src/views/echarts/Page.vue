<template>
<el-carousel :interval="5000" height="100vh" :type="lbType" arrow="always" @change="change">
    <el-carousel-item>
        <One :themeName="themeName" @fatherMethod="fatherMethod" :lbType="lbType" :lbIndex="lbIndex"></One>
    </el-carousel-item>
    <el-carousel-item>
        <Two :themeName="themeName" @fatherMethod="fatherMethod" :lbType="lbType" :lbIndex="lbIndex"></Two>
    </el-carousel-item>
    <el-carousel-item>
        <Three :themeName="themeName" @fatherMethod="fatherMethod" :lbType="lbType" :lbIndex="lbIndex"></Three>
    </el-carousel-item>
</el-carousel>
</template>

<script>
import One from "@/components/One";
import Two from "@/components/Two";
import Three from "@/components/Three";
export default {
    components: {
        One,
        Two,
        Three,
    },

    props: ["themeName", "lbType"],
    data() {
        return {
            lbIndex: null, //这是轮播的索引
        };
    },
    watch: {
        lbType: function () {
            // console.log("3232323232");
            // this.lbType
        },
    },
    mounted() {
        this.lbIndex = 0;
        this.themeName = localStorage.getItem("theme");
    },
    methods: {
        fatherMethod() {
            console.log("测试");
            this.$emit("fatherMethod1"); //用于控制工具栏显示
        },
        change(e) {
            console.log("eeee:" + e);
            this.lbIndex = e;
        },
    },
};
</script>

<style scoped>
.el-carousel__container {
    width: 100%;
    height: 100%;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
