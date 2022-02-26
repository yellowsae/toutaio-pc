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
      <el-form
        :model="user"
        ref="login-form"
        :rules="formRules"
        class='login-form'>
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile" placeholder="请输入手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code" placeholder="请输入验证码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
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
// 登录请求
import { Login } from '../../api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意用户协议
      },
      // 表单验证规则
      formRules: {
        mobile: [
          // trigger 用来配置触发校验的时机，有两个选项，change 是当输入的内容发送变化的时候，blur 当失去焦点的时候
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            // 验证通过：callback()
            // 验证失败：callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            // message: '请勾选同意用户协议',
            trigger: 'change'
          }
        ]
      },
      loginLoading: false // 设置登录的loginLoading
    }
  },
  methods: {
    // 点击登录按钮
    async submitForm () {
      // 表单验证
      // validate 方法是验证表单数据是否合法， 是异步的 使用 async | await 进行解构
      await this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) { // 值为 布尔值
          return
        }
        // 如果验证表单通过， 实现登录请求
        this.login()
      })
    },
    async login () {
      // 验证通过， 提交登录
      this.loginLoading = true
      try {
        const { data } = await Login(this.user)
        // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
        // 本地存储只能存储字符串
        // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
        window.localStorage.setItem('user', JSON.stringify(data.data))
        this.$message.success('登录成功')
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
        this.loginLoading = false
      } catch (err) {
        this.$message.error('登录失败')
        this.loginLoading = false
      }
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
