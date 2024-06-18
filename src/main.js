import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Loading } from 'element-ui';
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.prototype.openLoading = function() {
  const loading = Loading.service({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '加载中',                         // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    fullscreen: true,
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },1000)

  return loading;
}

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
