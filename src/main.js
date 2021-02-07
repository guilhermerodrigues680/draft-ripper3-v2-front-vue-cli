import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import router from './router'
// import store from "./store";
import vuetify from './plugins/vuetify';
import titleMixin from './mixins/titleMixin'

// If you don't need the styles, do not connect
// import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.mixin(titleMixin)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  // store,
  render: h => h(App)
}).$mount('#app')
