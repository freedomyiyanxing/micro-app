<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/22
* @project vue-project
*
-->
<template>
  <a-menu mode="horizontal" :selected-keys="[tagStore.tags?.path]">
    <a-menu-item v-for="item of tagStore.tagList" :key="item.path" @click="handleOpen(item)">
      {{ item.title }}
      <template #icon><icon-close @click.stop="handleClose(item)" /></template>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useTagsStore } from '@/store/modules/tag';

const router = useRouter();
const route = useRoute();

const tagStore = useTagsStore();

function handleOpen(item) {
  if (item.name !== route.name) {
    router.push(item.name);
    tagStore.addTag(item)
  }
}

function handleClose(item) {
  console.log(item.path)
  tagStore.delTag(item)
}
</script>
