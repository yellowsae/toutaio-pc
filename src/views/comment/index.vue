<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数据">
        </el-table-column>
        <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisabled"
              @change="onStatusChange(scope.row)"
            >
            </el-switch>
<!--            <el-button  @change="onStatusChange(scope.row)" type="primary">修改</el-button>-->
          </template>
        </el-table-column>
      </el-table>

      <!--
      绑定页码
      绑定每页大小
      current-page 控制激活的页码，初始肯定是第 1 页
      page-sizes 控制可选的每页大小
     -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      />
    </el-card>
  </div>
</template>

<script>
// 获取评论数据
import { getComments, updateCommentStatus } from '@/api/comment'

export default {
  name: 'CommentIndex',
  created () {
    this.loadArticles()
  },
  data () {
    return {
      articles: [], // 文章列表（文章的评论数据字段）
      totalCount: 0, // 总数据条数
      pageSize: 10,
      page: 1 // 当前激活的页码
    }
  },
  methods: {
    async loadArticles (page = 1) {
      this.page = page
      try {
        const { data } = await getComments({
          // 参数
          response_type: 'comment',
          page,
          per_page: this.pageSize
        })
        // 赋值
        const results = data.data.results
        results.forEach(article => {
          article.statusDisabled = false
        })
        this.articles = results
        this.totalCount = data.data.total_count
      } catch (err) {
        console.log('获取评论失败', err)
      }
    },
    // 修改操作
    async onStatusChange (article) {
      // 禁用开关
      article.statusDisabled = true
      try {
        await updateCommentStatus(article.id.toString(), article.comment_status)
        // 启用开关
        article.statusDisabled = false
        this.$message.success(`${article.comment_status ? '启用' : '关闭'}成功`)
      } catch (err) {
        console.log(err)
        this.$message.error('操作失败')
      }
    },
    handleSizeChange () {
      this.loadArticles(1)
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style lang="less" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>
