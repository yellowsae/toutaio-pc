<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <Aside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <!--    子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/aside'
import Header from './components/header'

export default {
  name: 'LayoutIndex',
  components: {
    Aside,
    Header
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  //background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
  //overflow: hidden;
}
</style>
