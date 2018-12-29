import './main.html';
import Vue from 'vue';
import App from './App';
import {
  Meteor
} from 'meteor/meteor'

// Quasar globally
import Quasar from 'quasar-framework/dist/quasar.mat.esm.js'
//import Quasar from 'quasar-framework/dist/quasar.ios.esm.js';
// import 'quasar-framework/dist/umd/quasar.mat.min.css'
// // import "quasar-framework/dist/umd/quasar.ios.min.css";
// import 'quasar-extras/roboto-font/roboto-font.css'
import 'quasar-extras/material-icons/material-icons.css'
import 'quasar-extras/mdi/mdi.css'
import 'quasar-extras/fontawesome/fontawesome.css'
// import 'animate.css/animate.min.css'
Vue.use(Quasar, {
  animations: 'all',
  extras: ['material-icons', 'mdi', 'fontawesome'],
})


//router
import VueRouter from 'vue-router'
import routes from './router'
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})
Vue.use(VueRouter)

//veeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

Meteor.startup(()=>{
  new Vue({
    router,
    render: h => h(App)
  }).$mount('app')
})