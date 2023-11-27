<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <Header />
        {{ tagStore.keepAliveList }}
      </a-layout-header>
      <a-layout-content>
        <router-view #default="{ Component, route }">
          <keep-alive :include="tagStore.keepAliveList">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Sidebar from '@/layout/sidebar';
import Header from '@/layout/header';
import { useTagsStore } from '@/store/modules/tag';

const tagStore = useTagsStore();
</script>


