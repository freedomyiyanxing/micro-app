/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/27
 * @project micro-app
 *
 * */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import Element from 'element-ui';
// vxe-table 配置文件
import './config/vxe-table';
import Router from './router';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/element/index.css';
// import './assets/styles/common.scss';

Vue.use(VueRouter)
Vue.use(Element, { size: 'mini' });
Vue.use(VXETable);
VXETable.use(VXETablePluginElement);

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount('#app');
