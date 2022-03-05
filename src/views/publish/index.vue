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
          <!--
            我们需要把选择的封面图片的地址放到 article.cover.images 数组中
            当你给事件处理函数传递了自定义参数以后，就无法得到原本的那个数据参数了。
            如果想要在事件处理函数自定义传参以后还想得到原来的那个事件本身的参数，则手动指定 $event，它就代表那个事件本身的参数
            在组件上使用 v-model
            当你给子组件提供的数据既要使用还要修改，这个时候我们可以使用 v-model 简化数据绑定。
            v-model="article.cover.images[index]"
              给子组件传递了一个名字叫 value 的数据
              :value="article.cover.images[index]"
              默认监听 input 事件，当事件发生，它会让绑定数据 = 事件参数
              @input="article.cover.images[index] = 事件参数"
            注意：v-model 仅仅是简写了而已，本质还在在父子组件通信
            v-model 的参考文档：https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model
           -->
          <template v-if="article.cover.type > 0">
            <UploadImage
              v-for="(cover, index) of article.cover"
              v-model="article.cover.images[index]"
              :key="index"
            />
          </template>
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
import UploadImage from './components/upload-image'
export default {
  name: 'PublishIndex',
  components: { UploadImage },
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
