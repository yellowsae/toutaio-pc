<template>
  <div class="login-container">
    <!--  登录的盒子  -->
    <div class="login-form-wrap">
      <!--  Logo    -->
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <!--  Logo  END   -->
      <!-- 登录的表单   -->
      <el-form :model="user" ref="form" class='login-form'>
        <el-form-item>
          <el-input v-model="user.mobile" placeholder="请输入手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.code" placeholder="请输入验证码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 登录的表单 END   -->
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loginLoading: false, // 设置登录的loginLoading
      checked: false // 是否同意协议中的选中状态
    }
  },
  methods: {
    // 点击登录按钮
    submitForm () {
      // 获取表单数据
      const user = this.user

      // 表单验证

      // 验证通过， 提交登录
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        // 登录成功
        this.$message.success('登录成功')
      }).catch(err => {
        console.log(err)
        // 登录失败
        this.message.error('登录失败')
      })
      // 无论登录成功或失败都关闭loading
      this.loginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.png') no-repeat;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    .login-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
