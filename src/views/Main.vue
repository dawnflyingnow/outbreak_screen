<template>
<el-container>
    <el-header v-if="showHeader">
        <div @click="$router.push({path:'/'})">
            <img class="logo" src="../assets/logo.png" alt />
            <span>实时疫情数据-技术更新中...</span>
        </div>
        <div>
            <el-dropdown @command="handleCommandLunbo">
                <span class="el-dropdown-link">
                    轮播方式
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="item" v-for="(item,index) in lunbo" :key="index">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    主题切换
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="item" v-for="(item,index) in theme" :key="index">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <i class="el-icon-close" @click="showHeader = false"></i>
        </div>
    </el-header>

    <el-container>
        <el-main>
            <!-- Main content -->
            <router-view :themeName="themeName" :lbType="lbType" @fatherMethod1="fatherMethod1"></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";

@Component({})
export default class App extends Vue {
    theme = [
        "roma",
        "shine",
        "infographic",
        "macarons",
        "dark",
        "dark-blue",
        "dark-bold",
        "green",
        "gray",
    ];
    lunbo = ["card", "default"];
    themeName = localStorage.getItem("theme") || "dark";
    lbType = "default";
    showHeader = true;
    //   beforeUpdate() {
    //     this.handleCommand(this.themeName);
    //   }
    created() {
        !localStorage.getItem("theme") && localStorage.setItem("theme", "dark")
    }

    handleCommand(command) {
        this.$message.success("切换主题为：" + command);
        this.themeName = command;
        localStorage.setItem("theme", command);
    }

    handleCommandLunbo(command) {
        this.lbType = command;
    }

    fatherMethod1() {
        console.log("测试1");
        this.showHeader = !this.showHeader;
        // this.handleCommand(this.themeName);
    }
}
</script>

<style lang="less" scoped>
.el-container {
    height: 100%;
}

.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    font-size: 20px;

    .logo {
        height: 35px;
        padding-left: 0;
    }

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 10px;
        }
    }

    .el-icon-close {
        cursor: pointer;
    }
}

.el-aside {
    background-color: #333744;

    .el-menu {
        border: 0;
    }

    .toggleMenu {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
}

.el-main {
    background-color: #eaedf1;
    padding: 0;
}

.el-dropdown {
    margin-right: 20px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
}
</style>
