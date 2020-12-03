// 主文件，项目入口
// 采用vue+element-ui框架
// 根据需要引入相关工具类 方便模块引用

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // 引入mock数据，关闭则注释该行

// 引入elmentUI组件
import ElementUI from 'element-ui'
import Echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
// 全局引入Antd
import Antd from 'ant-design-vue'
//import 'ant-design-vue/dist/antd.css'

// 引入公共样式
import './assets/css/common.css'
// import './assets/css/global.css'

// 引入阿里巴巴字体图标库
import './assets/css/iconfont.css'

import './assets/jquery.min.js'

// 使用mavonEditor编辑markdown
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

// 引入highlight.js来实现代码高亮
// import 'highlight.js/styles/googlecode.css'
// import hljs from 'highlight.js'
// Vue.directive('highlight', (el) => {
// let blocks = el.querySelectorAll('pre code')
// blocks.forEach((block) => {
// hljs.highlightBlock(block)
// })
// })

// 封装接口
import {ajaxGET, ajaxPUT, ajaxPOST, ajaxDELETE} from '@/common/ajax'

import {setCookie, getCookie, delCookie} from '@/assets/cookie'

// 插入用户检查代码
// function userInfo () {
// ajaxGET("/department/store/v2.1/bmgl/sys_user/"+getCookie( 'id')).then((response) =>{

// }).catch(function (error) {
// console.log(error);
// });
// }
// userInfo()

// 路由
import router from '@/router'

import App from '@/App'

import adapter from '@/common/adapter'

import util from '@/common/util'
import Moment from 'moment'
import store from '@/store/store'
Vue.prototype.moment = Moment
Vue.prototype.$axios = axios
Vue.prototype.$Echarts = Echarts
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(Echarts)
// Vue.use(ElementUI, { size: 'small' })

// Vue.use(Antd)
Vue.prototype.ajaxGET = ajaxGET
Vue.prototype.ajaxPUT = ajaxPUT
Vue.prototype.ajaxPOST = ajaxPOST
Vue.prototype.ajaxDELETE = ajaxDELETE

Vue.config.productionTip = false
Vue.prototype.$cookieStore = {setCookie, getCookie, delCookie}
Vue.prototype.adapter = adapter
window.adapter = adapter
Vue.prototype.util = util
//全局事件总线
Vue.prototype.$Bus = new Vue()
// 渲染
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
