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
            seriesdata: [],
            resdata: [],
            subdata: [],
        };
    },
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
    },

    watch: {
        themeName: function () {
            this.chart.dispose();
            this.initChart();
            this.openChart();
            this.updateChart();
            // //设置窗口缩放监听
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
        this.updateChart();
        // //设置窗口缩放监听
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
            const rel_chartWidth = this.$refs.rel_chart.offsetWidth;
            const titleFontSize = (rel_chartWidth / 100) * 5;
            const resizeOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontSize / 3,
                    },
                    left: 20,
                    top: 20,
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
                                    path == "/" ? "/twopage" : "/"
                                );
                                window.open(routeUrl.href, "_blank");
                            },
                        },
                    },
                },
                grid: {
                    top: "15%",
                    left: "3%",
                    right: "4%",
                    bottom: "6%",
                    containLabel: true,
                },
                tooltip: {
                    axisPointer: {
                        lineStyle: {
                            width: titleFontSize,
                        },
                    },
                },

                visualMap: {
                    min: 0,
                    max: 1500,
                    left: "left",
                    top: "bottom",
                    text: ["高", "低"],
                    inRange: {
                        color: [
                            "lightblue",
                            "yellow",
                            "orange",
                            "darkorange",
                            "red",
                            "darkred",
                        ], // 颜色映射范围，最小值，过渡值，最大值
                    },
                    show: true,
                },

                geo: {
                    roam: false,
                    zoom: 1,
                    label: {
                        normal: {
                            show: false,
                            fontSize: `${titleFontSize / 5}`,
                            color: "rgba(0,0,0,0.7)",
                        },
                    },
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(0, 0, 0, 0.2)",
                        },
                        emphasis: {
                            areaColor: "#F3B329",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                },

                series: [{
                    barWidth: titleFontSize,
                    itemStyle: {
                        barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
                    },
                    type: "map",
                    geoIndex: 0,
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
                import(`../../node_modules/echarts/map/js/china.js`),
                (this.chart = this.$echarts.init(this.$refs.rel_chart, theme)),
            ]);
        },
        openChart() {
            const option = {
                geo: {
                    map: "china",
                },
            };

            this.chart.setOption(option);
        },

        async updateChart() {
            this.chart.showLoading();
            const {
                data: result
            } = await this.$http.get(
                "/fy/get/"
            );
            this.chart.hideLoading();
            const {
                caseList
            } = JSON.parse(result).component[0];

            const echartTitle = JSON.parse(result).page.shareDesc;

            this.seriesdata = caseList.map((item) => {
                let myCity = {};
                myCity.area = item.area;
                myCity.name = item.area;
                myCity.value = item.crued;
                myCity.confirmed = item.confirmed;
                myCity.crued = item.crued;
                myCity.died = item.died;
                myCity.confirmedRelative = item.confirmedRelative;
                myCity.curConfirm = item.curConfirm;
                myCity.subList = item.subList;
                return myCity;
            });

            const option = {
                title: {
                    text: echartTitle,
                },
                tooltip: {
                    //显示悬浮窗口
                    trigger: "item",
                    formatter: function (params) {
                        //定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
                        var res = params.name + "<br />";
                        //定义一个变量来保存series数据系列
                        var myseries = option.series;
                        //循环遍历series数据系列
                        for (var i = 0; i < myseries.length; i++) {
                            //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
                            for (var k = 0; k < myseries[i].data.length; k++) {
                                //console.log(myseries[i].data[k].name);
                                //如果data数据中的name和地区名称一样
                                if (myseries[i].data[k].name == params.name) {
                                    //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                                    res +=
                                        "今日新增:" +
                                        myseries[i].data[k].confirmedRelative +
                                        "<br />";
                                    res +=
                                        "现有病例:" + myseries[i].data[k].curConfirm + "<br />";
                                    res += "累计确认:" + myseries[i].data[k].confirmed + "<br />";
                                    res += "累计治愈:" + myseries[i].data[k].crued + "<br />";
                                    res += "累计死亡:" + myseries[i].data[k].died + "<br />";
                                }
                            }
                        }
                        //返回res
                        //console.log(res);
                        return res;
                    },
                },

                series: [{
                    data: this.seriesdata,
                }, ],
            };

            this.chart.setOption(option);

            this.chart.on("click", (params) => {
                //console.log(params)

                try {
                    const subList = params.data.subList;
                    this.seriesdata = subList.map((item) => {
                        let myCity = {};
                        myCity.area = item.city;
                        myCity.name = item.city;
                        myCity.value = item.crued;
                        myCity.confirmed = item.confirmed;
                        myCity.crued = item.crued;
                        myCity.died = item.died;
                        myCity.confirmedRelative = item.confirmedRelative;
                        myCity.curConfirm = item.curConfirm;
                        return myCity;
                    });

                    // console.log(this.subdata)

                    this.showCityEchartData(params.name);
                } catch (e) {
                    this.openChart();
                    this.updateChart();
                }

                // if (!subList) {
                //     //说明进入省级地图
                //     this.updateChart()
                //     return
                // }
            });

            //   console.log(caseList);
        },

        //点击省份后展示市的数据
        async showCityEchartData(province) {
            // console.log(province)
            const py = this.$py(province, {
                removeTone: true,
            }).replace(/\s/g, "");
            // console.log(py)

            await Promise.all([
                import(`../../node_modules/echarts/map/js/province/${py}.js`),
            ]);
            const option = {
                geo: {
                    map: province,
                },
                tooltip: {
                    //显示悬浮窗口
                    formatter: function (params) {
                        //定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
                        var res = params.name + "<br />";
                        //定义一个变量来保存series数据系列
                        var myseries = option.series;
                        //循环遍历series数据系列
                        for (var i = 0; i < myseries.length; i++) {
                            //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
                            for (var k = 0; k < myseries[i].data.length; k++) {
                                //console.log(myseries[i].data[k].name);
                                //如果data数据中的name和地区名称一样
                                if (myseries[i].data[k].name == params.name) {
                                    //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                                    res +=
                                        "今日新增:" +
                                        myseries[i].data[k].confirmedRelative +
                                        "<br />";
                                    res +=
                                        "现有病例:" + myseries[i].data[k].curConfirm + "<br />";
                                    res += "累计确认:" + myseries[i].data[k].confirmed + "<br />";
                                    res += "累计治愈:" + myseries[i].data[k].crued + "<br />";
                                    res += "累计死亡:" + myseries[i].data[k].died + "<br />";
                                }
                            }
                        }
                        //返回res
                        //console.log(res);
                        return res;
                    },
                },
                series: [{
                    data: this.seriesdata,
                }, ],
            };
            this.chart.setOption(option);
        },
    },
};
</script>

<style>
</style>
