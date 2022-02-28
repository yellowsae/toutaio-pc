<template>
  <el-card class="box-card">
    <img class="img" src="./hutao.jpg" alt="">
  </el-card>
</template>

<script>
export default {
  name: 'HomeIndex',
  data () {
    return {
      src: 'https://imgtu.com/i/bnK5sH'
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
  }
}

/deep/ .el-card__body {
  padding: 0;
}
</style>
