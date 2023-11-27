<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/22
* @project vue-project
*
-->
<template>
  <a-menu>
    <SidebarItem :menu="routerList" />
  </a-menu>
</template>

<script setup>
import { ref, isRef, shallowRef, shallowReadonly } from 'vue';
import SidebarItem from './item';

import { routers } from '@/router';

const routerList = shallowReadonly(routers);
</script>

<style scoped lang="scss"></style>
