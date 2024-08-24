import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification'
import VuejsDialog from 'vuejs-dialog'
import VueSignature from 'vue-signature-pad'
import globalConfig from './plugins/globalConfig'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VueSignature)
Vue.use(VueToast, {
  position: 'top-right'
})
Vue.use(VuejsDialog, {
  okText: 'Continuar',
  cancelText: 'Cancelar'
})

Vue.prototype.$globalConfig = globalConfig

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
