/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/27
 * @project micro-app
 *
 * */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from './router';
import App from './App.vue';

Vue.use(VueRouter)

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount('#app');
