<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/22
* @project vue-project
*
-->
<template>
  <div>
    <h2>Project</h2>
    <WuJie
        class="sub-app"
        url="//localhost:8002/"
        width="100%"
        height="100%"
        name="vue3"
    />
  </div>
</template>

<script setup>
import WuJie from "@/components/wu-jie";

defineOptions({
  name: '/project'
})
</script>

<style scoped lang="scss"></style>
