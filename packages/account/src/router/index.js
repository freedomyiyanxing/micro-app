/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/28
 * @project micro-app
 *
 * */
import VueRouter from 'vue-router';

export const routers = [
  {
    path: '/dict',
    name: '/dict',
    title: '字典',
    component: () => import('../views/dict'),
  },
  {
    path: '/role',
    name: '/role',
    title: '权限',
    component: () => import('../views/role'),
  },
]


const Router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routers,
});

export default Router;
