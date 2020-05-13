import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'normalize.css/normalize.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import Toast from './components/common/toast/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({})

Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
});

// 会执行 Toast 的 install 函数
Vue.use(Toast)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

