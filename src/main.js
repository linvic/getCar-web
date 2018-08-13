import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import 'babel-polyfill'

Vue.config.productionTip = false // 关闭生产提示
Vue.use(ElementUI, {size: 'medium', zIndex: '3000'}) // size: 组件的默认尺寸 zIndex 弹框的初始2000

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
