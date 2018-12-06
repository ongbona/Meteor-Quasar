import './main.html';
import Vue from 'vue';
import App from './App';
import {
  Meteor
} from 'meteor/meteor'
import Quasar from '/node_modules/quasar-framework/dist/quasar.mat.esm.js';
Vue.use(Quasar);

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

Meteor.startup(()=>{
  new Vue({
    router,
    render: h => h(App)
  }).$mount('app')
})