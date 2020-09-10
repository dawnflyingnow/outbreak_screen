const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const cdn = {
  // 忽略打包的第三方库
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },

  // 通过cdn方式使用
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
  ],
  css: [],
};
module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false, // 关闭生产环境的 source map
  chainWebpack: (config) => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        return {
          limit: 10000,
        };
      });
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'));
    config.plugin('copy').tap((args) => {
      args[0][0].to = 'resource';
      return args;
    });
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload-index');
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
  },
  // 这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
    }
  },
  devServer: {
    host: "localhost",
    port: 8081,
    https: false,
    open: true,
    proxy: {
      "/api": {
        target: "https://www.maomin.club/", // 目标代理接口地址
        //   secure: true,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}