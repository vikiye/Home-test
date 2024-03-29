import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

Vue.prototype.$file; 

new Vue({
  render: h => h(App),
}).$mount('#app')
