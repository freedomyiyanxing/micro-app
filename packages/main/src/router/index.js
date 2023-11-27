/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/21
 * @project vue-project
 *
 * */
import * as VueRouter from 'vue-router';
import HomeIndex from '@/views/home/index';
import HomeList from '@/views/home/list';
import AccountIndex from '@/views/account/index';
import AccountSetting from '@/views/account/setting';
import Test from '@/views/account/test';
import Project from '@/views/project';

export const routers = [
  {
    path: '/project',
    name: '/project',
    title: '项目',
    component: Project,
  },
  {
    path: '/',
    name: '/',
    title: '主页',
    children: [
      {
        path: '/',
        name: '/',
        title: '首页',
        component: HomeIndex,
      },
      {
        path: '/list',
        name: '/list',
        title: '集合',
        component: HomeList,
      }
    ]
  },
  {
    path: '/account',
    name: '/account',
    title: '个人中心',
    children: [
      {
        path: '/account/index',
        name: '/account/index',
        title: '个人信息',
        component: AccountIndex,
      },
      {
        path: '/account/setting',
        name: '/account/setting',
        title: '设置',
        children: [
          {
            path: '/account/setting/index',
            name: '/account/setting/index',
            title: '设置中心',
            component: AccountSetting,
          },
          {
            path: '/account/setting/test',
            name: '/account/setting/test',
            title: '设置测试',
            component: Test,
          }
        ]
      }
    ]
  },
]

const index = VueRouter.createRouter({
  strict: true,
  history: VueRouter.createWebHistory(),
  routes: routers
});

// index.addRoute

export default index
