<template>
<div class="chart-box">
    <div class="chart" ref="rel_chart"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            chart: null,
        };
    },
    // props: ["themeName", "fatherMethod"],

    props: {
        themeName: {
            type: String,
        },
        lbType: {
            type: String,
        },
        lbIndex: {
            type: Number,
        },
        fatherMethod: {
            type: Function,
            default: null,
        },
    },

    watch: {
        themeName: function () {
            console.log("这是主题切换时触发");
            this.chart.dispose();
            this.initChart();
            this.openChart();
            //设置窗口缩放监听
            window.addEventListener("resize", this.windowResize);
            this.windowResize();
        },

        lbType: function () {
            console.log("这是切换轮播方式触发：");
            this.windowResize();
        },

        lbIndex: function () {
            // console.log(v);
            console.log("这是滚动时触发：");
            this.windowResize();
        },
    },

    mounted() {
        this.initChart();
        this.openChart();
        //设置窗口缩放监听
        window.addEventListener("resize", this.windowResize);
        this.windowResize();
    },
    destroyed() {
        window.removeEventListener("resize");
        this.chart.dispose();
    },

    methods: {
        //窗口缩放监听
        windowResize() {
            const oneChartWidth = this.$refs.rel_chart.offsetWidth;
            const titleFontSize = (oneChartWidth / 100) * 3.6;
            const resizeOption = {
                title: {
                    text: "世界人口总量 - test",
                    subtext: "数据来自网络",
                    left: 40,
                    top: 40,
                    textStyle: {
                        fontSize: titleFontSize / 1.5,
                    },
                },

                toolbox: {
                    color: ["#1e90ff", "#22bb22", "#4b0082", "#d2691e"],
                    feature: {
                        dataView: {
                            //数据视图
                            show: true,
                        },

                        saveAsImage: {
                            //保存图片
                            show: true,
                        },
                        myMenu: {
                            show: true,
                            title: "菜单栏",
                            icon: "path://M376.832 474.112H130.048c-33.792 0-61.44-27.648-61.44-61.44V165.888c0-33.792 27.648-61.44 61.44-61.44h247.296c33.792 0 61.44 27.648 61.44 61.44v247.296c-0.512 33.792-27.648 60.928-61.952 60.928zM130.048 165.888v247.296h247.296V165.888H130.048zM739.84 525.312c-16.384 0-31.744-6.144-43.52-17.92L521.728 332.8c-11.776-11.776-17.92-27.136-17.92-43.52s6.144-31.744 17.92-43.52L696.32 71.168c11.776-11.776 27.136-17.92 43.52-17.92s31.744 6.144 43.52 17.92L957.952 245.76c11.776 11.776 17.92 27.136 17.92 43.52s-6.144 31.744-17.92 43.52L783.36 507.392c-11.776 11.776-27.136 17.92-43.52 17.92z m0-411.136l-174.592 174.592 174.592 174.592 174.592-174.592-174.592-174.592zM376.832 960.512H130.048c-33.792 0-61.44-27.648-61.44-61.44v-247.296c0-33.792 27.648-61.44 61.44-61.44h247.296c33.792 0 61.44 27.648 61.44 61.44v247.296c-0.512 34.304-27.648 61.44-61.952 61.44z m-246.784-308.224v247.296h247.296v-247.296H130.048zM863.232 960.512h-247.296c-33.792 0-61.44-27.648-61.44-61.44v-247.296c0-33.792 27.648-61.44 61.44-61.44h247.296c33.792 0 61.44 27.648 61.44 61.44v247.296c0 34.304-27.136 61.44-61.44 61.44z m-246.784-308.224v247.296h247.296v-247.296h-247.296z",
                            onclick: () => {
                                console.log("控制菜单栏显隐");
                                this.$emit("fatherMethod");
                            },
                        },
                        myFull: {
                            show: true,
                            title: "新窗口打开",
                            icon: "path://M155.733333 806.4H149.333333c-8.533333-2.133333-14.933333-12.8-14.933333-21.333333 0-4.266667 27.733333-362.666667 420.266667-396.8V177.066667c0-8.533333 4.266667-17.066667 12.8-19.2 8.533333-4.266667 17.066667-2.133333 23.466666 4.266666L896 465.066667c8.533333 8.533333 8.533333 21.333333 0 29.866666L590.933333 800c-6.4 6.4-14.933333 8.533333-23.466666 4.266667-8.533333-4.266667-12.8-10.666667-12.8-19.2v-206.933334c-70.4 8.533333-290.133333 51.2-381.866667 215.466667-2.133333 8.533333-10.666667 12.8-17.066667 12.8zM576 533.333333c6.4 0 10.666667 2.133333 14.933333 6.4 4.266667 4.266667 6.4 10.666667 6.4 14.933334v179.2l251.733334-251.733334L597.333333 228.266667V405.333333c0 10.666667-8.533333 21.333333-19.2 21.333334-249.6 14.933333-345.6 164.266667-379.733333 266.666666C337.066667 550.4 563.2 533.333333 576 533.333333z m0-128z",

                            onclick: () => {
                                const path = this.$route.path;
                                let routeUrl = this.$router.resolve(
                                    path == "/" ? "/onepage" : "/"
                                );
                                window.open(routeUrl.href, "_blank");
                            },
                        },
                    },
                },

                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        lineStyle: {
                            width: titleFontSize,
                        },
                        type: "line",
                        z: 0,
                    },
                },

                series: [{
                    barWidth: titleFontSize,
                    itemStyle: {
                        barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
                    },
                }, ],
            };
            this.chart.setOption(resizeOption);
            this.chart.resize();
        },
        async initChart() {
            !!this.chart && this.chart.dispose();
            const themeStorage = localStorage.getItem("theme");
            const theme = themeStorage ? themeStorage : this.themeName;
            await Promise.all([
                import(`../../node_modules/echarts/theme/${theme}.js`),
                (this.chart = this.$echarts.init(this.$refs.rel_chart, theme)),
            ]);
        },
        openChart() {
            const option = {
                grid: {
                    top: "15%",
                    left: "3%",
                    right: "4%",
                    bottom: "6%",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01],
                },
                yAxis: {
                    type: "category",
                    data: ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"],
                },
                series: [{
                    // name: "xxx",
                    type: "bar",

                    label: {
                        show: true,
                        position: "right",
                        textStyle: {
                            color: "#FFF",
                        },
                    },
                    itemStyle: {
                        color: new this.$echarts.graphic.LinearGradient(
                            0,
                            0,
                            1,
                            0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                            [
                                //0%状态下的颜色
                                {
                                    offset: 0,
                                    color: "#5052ee",
                                },
                                //100%状态下的颜色
                                {
                                    offset: 1,
                                    color: "#ab6ee5",
                                },
                            ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
                        ),
                    },
                    data: [19325, 23438, 31000, 121594, 134141, 681807],
                }, ],
            };

            this.chart.setOption(option);
        },
    },
};
</script>

<style>
</style>
