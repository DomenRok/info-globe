import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import store from './store'
import MapPage from './components/Pages/Map.vue'
import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueRouter);
Vue.use(VueGeolocation);

import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false
Vue.prototype.$primevue = {ripple: true};

const router = new VueRouter({
  routes: [
    { path: '/', name: 'map', component: MapPage },
  ]
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
