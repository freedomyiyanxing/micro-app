<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/27
* @project micro-app
*
-->
<template>
  <div>
    <h1>Account 应用</h1>
    <p>{{ count }}</p>
    <button @click="handlerClick">按钮</button>


    <router-link to="/dict">Go to Dict</router-link>
    <router-link to="/role">Go to Role</router-link>

    <hr />

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    handlerClick() {
      this.count += 1;
    }
  }
};
</script>

<style scoped lang="scss"></style>
