import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUi from 'view-design'
import 'view-design/dist/styles/iview.css'
import api from './api'
import VueParticles from 'vue-particles'  
Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(ViewUi)
Vue.use(VueParticles)  

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
