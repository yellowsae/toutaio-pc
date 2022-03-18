<template>
  <div class="header-container">
    <div>
      <i :class="{
        'el-icon-s-fold': isCollapse,
        'el-icon-s-unfold': !isCollapse
      }"
      @click="clickIcon"></i>
      <span>Yellowsea_toutiao-pc</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img class="avatar" :src="user.photo" alt="">
        <span>{{user.name}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="goAccount">设置</el-dropdown-item>
        <!--
          组件默认是不识别原生事件的，除非内部做了处理
          https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6
         -->
        <el-dropdown-item
          @click.native="onLogout"
        >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'HeaderIndex',
  data () {
    return {
      user: {}, // 保存获取的用户信息
      isCollapse: false // 控制侧边栏的展示
    }
  },
  created () {
    this.userInfo()
  },
  methods: {
    async userInfo () {
      try {
        const { data } = await getUserInfo()
        this.user = data.data
      } catch (err) {
        this.$message.error('获取用户信息失败')
        console.log(err)
      }
    },

    // 退出登录
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(
        () => {
          // 把用户的登录状态清除
          window.localStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.push('/login')
        }
      ).catch(
        () => {
          this.$message.info('已取消退出')
        }
      )
    },

    // 点击icon
    clickIcon () {
      this.isCollapse = !this.isCollapse
      // 兄弟组件中的通信, 使用了全局事件总线
      this.$bus.$emit('Change_isCollapse', this.isCollapse) // val 为事件名
    },
    // 点击跳转到个人信息设置
    goAccount () {
      this.$router.push('/account')
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .el-icon-s-fold {
    margin-right: 15px;
  }
  .el-icon-s-unfold {
    margin-right: 15px;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
