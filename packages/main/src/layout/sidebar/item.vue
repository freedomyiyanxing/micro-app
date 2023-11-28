<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/22
* @project vue-project
*
-->
<template>
  <template v-for="item of menu">

    <a-menu-item v-if="!Array.isArray(item.children)" :key="item.name" @click="handleOpen(item)">
      {{ item.title }}
    </a-menu-item>

    <a-sub-menu v-else :key="item.name">
      <template #title>{{ item.title }}</template>
      <template v-for="(val, idx) of item.children" :key="val.name">
        <a-menu-item v-if="!Array.isArray(val.children)" :key="val.name" @click="handleOpen(val)">
          {{ val.title }}
        </a-menu-item>

        <SidebarItem v-else :menu="[val]" :key="idx" />
      </template>


    </a-sub-menu>
  </template>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useTagsStore } from '@/store/modules/tag';

const route = useRoute();
const router = useRouter();
const tagStore = useTagsStore();

defineOptions({
  name: 'SidebarItem'
})

defineProps({
  menu: {
    type: Array,
    required: true
  }
})

function handleOpen(item) {
  if (item.name !== route.name) {
    router.push(item.name);
    tagStore.addTag(item)
  }
}

</script>

<style scoped lang="scss"></style>
