<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/28
* @project micro-app
*
-->
<template>
  <div>
    <h1>Role</h1>
    <p>{{count}}</p>
    <button @click="handleClick">加 3</button>
  </div>
</template>

<script>
export default {
  name: 'role',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    handleClick() {
      this.count += 3;
    }
  }
};
</script>

<style scoped lang="scss"></style>
