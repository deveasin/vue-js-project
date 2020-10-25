import Vue from 'vue';
import App from './App.vue';
import List from './components/list'
import Form from './components/form'
import VueRouter from 'vue-router';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

extend('only_letters', {
  validate: value => /^[a-zA-Z\u0985-\u09E1\u09F0-\u09FD]+$/g.test(value)
});
extend('integers', {
  validate: value => /^[\d\u09E6-\u09EF]+$/g.test(value)
});


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/form/',
    component: Form
  },
  {
    path: '/form/:id',
    component: Form
  },
  {
    path: '/',
    component: List
  }
];

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
