<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form
        ref="publish-form"
        :model="article"
        :rules="formRules"
        label-width="60px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(channel, index) of channels"
              :key="index"
              :label="channel.name"
              :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannel, addArticle } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      // 文章规则
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章内容', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                // 验证失败
                callback(new Error('请输入文章内容'))
              } else {
                // 验证通过
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      },
      // 文章频道列表
      channels: [],
      // 文章对象
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 封面类型 0~3
          images: [] // 文章封面的地址
        },
        channel_id: null
      }
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    // 获取频道列表
    async loadChannel () {
      const { data } = await getArticleChannel()
      this.channels = data.data.channels
    },
    // 发布文章内容
    onSubmit (draft = false) {
      // 1. 验证表单内容
      this.$refs['publish-form'].validate(async valid => {
        // 验证失败，停止提交表单
        if (!valid) {
          return
        }
        // 2. 验证通过，提交表单
        // 3. 封装请求
        // 4. 如果是修改文章则执行修改操作
        try {
          await addArticle(this.article, false)
          this.$message.success('发布成功')
          // 跳转到内容管理
          await this.$router.push('/article')
        } catch (err) {
          this.$message.error('发布失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .el-textarea__inner {
  min-height: 33px;
  height: 363px;
  font-size: 16px;
}
</style>
