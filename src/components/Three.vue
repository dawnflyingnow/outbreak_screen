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
    // props: ["themeName"],

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
                                    path == "/" ? "/threepage" : "/"
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
                import(`../../node_modules/echarts/map/js/world.js`),
                (this.chart = this.$echarts.init(this.$refs.rel_chart, theme)),
            ]);
        },
        openChart() {
            let nameMap = {
                Afghanistan: "阿富汗",
                Singapore: "新加坡",
                Angola: "安哥拉",
                Albania: "阿尔巴尼亚",
                "United Arab Emirates": "阿联酋",
                Argentina: "阿根廷",
                Armenia: "亚美尼亚",
                "French Southern and Antarctic Lands": "法属南半球和南极领地",
                Australia: "澳大利亚",
                Austria: "奥地利",
                Azerbaijan: "阿塞拜疆",
                Burundi: "布隆迪",
                Belgium: "比利时",
                Benin: "贝宁",
                "Burkina Faso": "布基纳法索",
                Bangladesh: "孟加拉国",
                Bulgaria: "保加利亚",
                "The Bahamas": "巴哈马",
                "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
                Belarus: "白俄罗斯",
                Belize: "伯利兹",
                Bermuda: "百慕大",
                Bolivia: "玻利维亚",
                Brazil: "巴西",
                Brunei: "文莱",
                Bhutan: "不丹",
                Botswana: "博茨瓦纳",
                "Central African Republic": "中非共和国",
                Canada: "加拿大",
                Switzerland: "瑞士",
                Chile: "智利",
                China: "中国",
                "Ivory Coast": "象牙海岸",
                Cameroon: "喀麦隆",
                "Democratic Republic of the Congo": "刚果民主共和国",
                "Republic of the Congo": "刚果共和国",
                Colombia: "哥伦比亚",
                "Costa Rica": "哥斯达黎加",
                Cuba: "古巴",
                "Northern Cyprus": "北塞浦路斯",
                Cyprus: "塞浦路斯",
                "Czech Republic": "捷克共和国",
                Germany: "德国",
                Djibouti: "吉布提",
                Denmark: "丹麦",
                "Dominican Republic": "多明尼加共和国",
                Algeria: "阿尔及利亚",
                Ecuador: "厄瓜多尔",
                Egypt: "埃及",
                Eritrea: "厄立特里亚",
                Spain: "西班牙",
                Estonia: "爱沙尼亚",
                Ethiopia: "埃塞俄比亚",
                Finland: "芬兰",
                Fiji: "斐",
                "Falkland Islands": "福克兰群岛",
                France: "法国",
                Gabon: "加蓬",
                "United Kingdom": "英国",
                Georgia: "格鲁吉亚",
                Ghana: "加纳",
                Guinea: "几内亚",
                Gambia: "冈比亚",
                "Guinea Bissau": "几内亚比绍",
                Greece: "希腊",
                Greenland: "格陵兰岛",
                Guatemala: "危地马拉",
                "French Guiana": "法属圭亚那",
                Guyana: "圭亚那",
                Honduras: "洪都拉斯",
                Croatia: "克罗地亚",
                Haiti: "海地",
                Hungary: "匈牙利",
                Indonesia: "印度尼西亚",
                India: "印度",
                Ireland: "爱尔兰",
                Iran: "伊朗",
                Iraq: "伊拉克",
                Iceland: "冰岛",
                Israel: "以色列",
                Italy: "意大利",
                Jamaica: "牙买加",
                Jordan: "约旦",
                Japan: "日本",
                Kazakhstan: "哈萨克斯坦",
                Kenya: "肯尼亚",
                Kyrgyzstan: "吉尔吉斯斯坦",
                Cambodia: "柬埔寨",
                Kosovo: "科索沃",
                Kuwait: "科威特",
                Laos: "老挝",
                Lebanon: "黎巴嫩",
                Liberia: "利比里亚",
                Libya: "利比亚",
                "Sri Lanka": "斯里兰卡",
                Lesotho: "莱索托",
                Lithuania: "立陶宛",
                Luxembourg: "卢森堡",
                Latvia: "拉脱维亚",
                Morocco: "摩洛哥",
                Moldova: "摩尔多瓦",
                Madagascar: "马达加斯加",
                Mexico: "墨西哥",
                Macedonia: "马其顿",
                Mali: "马里",
                Myanmar: "缅甸",
                Montenegro: "黑山",
                Mongolia: "蒙古国",
                Mozambique: "莫桑比克",
                Mauritania: "毛里塔尼亚",
                Malawi: "马拉维",
                Malaysia: "马来西亚",
                Namibia: "纳米比亚",
                "New Caledonia": "新喀里多尼亚",
                Niger: "尼日尔",
                Nigeria: "尼日利亚",
                Nicaragua: "尼加拉瓜",
                Netherlands: "荷兰",
                Norway: "挪威",
                Nepal: "尼泊尔",
                "New Zealand": "新西兰",
                Oman: "阿曼",
                Pakistan: "巴基斯坦",
                Panama: "巴拿马",
                Peru: "秘鲁",
                Philippines: "菲律宾",
                "Papua New Guinea": "巴布亚新几内亚",
                Poland: "波兰",
                "Puerto Rico": "波多黎各",
                "North Korea": "北朝鲜",
                Portugal: "葡萄牙",
                Paraguay: "巴拉圭",
                Qatar: "卡塔尔",
                Romania: "罗马尼亚",
                Russia: "俄罗斯",
                Rwanda: "卢旺达",
                "Western Sahara": "西撒哈拉",
                "Saudi Arabia": "沙特阿拉伯",
                Sudan: "苏丹",
                "South Sudan": "南苏丹",
                Senegal: "塞内加尔",
                "Solomon Islands": "所罗门群岛",
                "Sierra Leone": "塞拉利昂",
                "El Salvador": "萨尔瓦多",
                Somaliland: "索马里兰",
                Somalia: "索马里",
                "Republic of Serbia": "塞尔维亚",
                Suriname: "苏里南",
                Slovakia: "斯洛伐克",
                Slovenia: "斯洛文尼亚",
                Sweden: "瑞典",
                Swaziland: "斯威士兰",
                Syria: "叙利亚",
                Chad: "乍得",
                Togo: "多哥",
                Thailand: "泰国",
                Tajikistan: "塔吉克斯坦",
                Turkmenistan: "土库曼斯坦",
                "East Timor": "东帝汶",
                "Trinidad and Tobago": "特里尼达和多巴哥",
                Tunisia: "突尼斯",
                Turkey: "土耳其",
                "United Republic of Tanzania": "坦桑尼亚",
                Uganda: "乌干达",
                Ukraine: "乌克兰",
                Uruguay: "乌拉圭",
                "United States": "美国",
                Uzbekistan: "乌兹别克斯坦",
                Venezuela: "委内瑞拉",
                Vietnam: "越南",
                Vanuatu: "瓦努阿图",
                "West Bank": "西岸",
                Yemen: "也门",
                "South Africa": "南非",
                Zambia: "赞比亚",
                Korea: "韩国",
                Tanzania: "坦桑尼亚",
                Zimbabwe: "津巴布韦",
                Congo: "刚果（金）",
                "Central African Rep.": "中非共和国",
                Serbia: "塞尔维亚",
                "Bosnia and Herz.": "波黑",
                "Czech Rep.": "捷克",
                "W. Sahara": "西撒哈拉",
                "Lao PDR": "老挝",
                "Dem.Rep.Korea": "朝鲜",
                "Falkland Is.": "福克兰群岛",
                "Timor-Leste": "东帝汶",
                "Solomon Is.": "所罗门群岛",
                Palestine: "巴勒斯坦",
                "N. Cyprus": "北塞浦路斯",
                Aland: "奥兰群岛",
                "Fr. S. Antarctic Lands": "法属南半球和南极陆地",
                Mauritius: "毛里求斯",
                Comoros: "科摩罗",
                "Eq. Guinea": "赤道几内亚",
                "Guinea-Bissau": "几内亚比绍",
                "Dominican Rep.": "多米尼加",
                "Saint Lucia": "圣卢西亚",
                Dominica: "多米尼克",
                "Antigua and Barb.": "安提瓜和巴布达",
                "U.S. Virgin Is.": "美国原始岛屿",
                Montserrat: "蒙塞拉特",
                Grenada: "格林纳达",
                Barbados: "巴巴多斯",
                Samoa: "萨摩亚",
                Bahamas: "巴哈马",
                "Cayman Is.": "开曼群岛",
                "Faeroe Is.": "法罗群岛",
                "IsIe of Man": "马恩岛",
                Malta: "马耳他共和国",
                Jersey: "泽西",
                "Cape Verde": "佛得角共和国",
                "Turks and Caicos Is.": "特克斯和凯科斯群岛",
                "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
            };

            const option = {
                geo: {
                    map: "world",
                },
                nameMap: nameMap,
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
                caseOutsideList: caseList
            } = JSON.parse(result).component[0];

            const echartTitle = "全球新型冠状病毒肺炎实时地图";

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

            // console.log(this.seriesdata);

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

            // this.chart.on("click", (params) => {
            //     //console.log(params)

            //     try {
            //         const subList = params.data.subList;
            //         this.seriesdata = subList.map((item) => {
            //             let myCity = {};
            //             myCity.area = item.city;
            //             myCity.name = item.city;
            //             myCity.value = item.crued;
            //             myCity.confirmed = item.confirmed;
            //             myCity.crued = item.crued;
            //             myCity.died = item.died;
            //             myCity.confirmedRelative = item.confirmedRelative;
            //             myCity.curConfirm = item.curConfirm;
            //             return myCity;
            //         });

            //         // console.log(this.subdata)

            //         this.showCityEchartData(params.name);
            //     } catch (e) {
            //         this.openChart();
            //         this.updateChart();
            //     }
            // });

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
