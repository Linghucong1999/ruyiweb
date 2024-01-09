import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import httpServer from './service/httpServer' //axios拦截器
import "@/permission"; //权控
import * as mUtils from "@/common/js/mUtils";
import config from "@/config";
import filter from './filters/index';

import * as API from "@/api/index";
import Element from "element-ui";
import "@/common/style/element-variables.less";
import "@/common/style/index.less";
import "@/common/style/element-ui.less";
import "animate.css"
import VueClipboard from 'vue-clipboard2';


Vue.use(VueClipboard);
Vue.use(Element);

/**
 * 引入公共方法
 */
Vue.prototype.$mUtils = mUtils;
Vue.prototype.$axios = httpServer;
Vue.prototype.$api = API;

//全局注册过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
})

//登录成功后跳转方法
Vue.prototype.goBeforeLogin = function () {
  
}

//公共配置

Vue.prototype.$config = config;


// String.prototype.replaceAll = function (s1, s2) {
//   return this.replace(new RegExp(s1, "gm"), s2);
// }

Vue.config.productionTip = false

store.commit("getUserFromLocal");
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
