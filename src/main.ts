import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
// import './plugins/avue'

import './plugins/axios'

import './assets/global.scss'


// import EleForm from 'vue-ele-form'
// Vue.use(EleForm)

// import AvueUeditor from 'avue-plugin-ueditor/packages/ueditor/index.js'
// Vue.use(AvueUeditor)


import echarts from 'echarts'

//加载主题时
// import '../node_modules/echarts/theme/red.js'

//加载中国地图使用
// import '../node_modules/echarts/map/js/china.js'


Vue.prototype.$echarts = echarts
// Vue.prototype.$mapDefaultConfig = mapDefaultConfig

import * as PinYin from 'chinese-to-pinyin'
Vue.prototype.$py = PinYin

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
