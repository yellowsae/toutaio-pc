<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户头像">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
        >
          <img
            width="100"
            :src="user.photo"
            class="avatar"
          />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input type="textarea" v-model="user.intro"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserInfo, ChangeUserInfo } from '@/api/user'

export default {
  name: 'AccountIndex',
  data () {
    return {
      user: {
        email: '', // 邮箱
        intro: '', // 简介
        mobile: '', // 手机号
        name: '', // 昵称
        photo: '' // 头像
      }
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    // 获取用户信息
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        this.$message.error('获取用户信息失败')
      }
    },
    // 提交修改用户信息的请求
    async onSubmit () {
      // 结构对象
      const { name, email, intro } = this.user
      try {
        await ChangeUserInfo({
          name,
          email,
          intro
        })
        this.$message.success('修改用户信息成功')
        await this.loadUserInfo()
      } catch (e) {
        this.$message.error('修改信息失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
