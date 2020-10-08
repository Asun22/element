import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// import http from './utils/request'
// import {gets,posts} from './utils/api'

Vue.config.productionTip = false
// Vue.prototype.$http=http
// Vue.prototype.$get=gets
// Vue.prototype.$post=posts


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
