import Vue from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'

Vue.config.productionTip = false

Vue.component('BaseButton', BaseButton)

new Vue({
  render: h => h(App),
}).$mount('#app')