<template>
  <div class="image-list">
    <div class="action-head">
      <el-radio-group
        v-model="collect"
        size="mini"
        @change="loadImages(1)"
      >
        <el-radio-button
          :label="false"
        >全部</el-radio-button>
        <el-radio-button
          :label="true"
        >收藏</el-radio-button>
      </el-radio-group>
      <el-button
        v-if="isShowAdd"
        size="mini"
        type="success"
        @click="dialogUploadVisible = true"
      >上传素材</el-button>
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="image-item"
        @click.native="selected = index"
      >
        <el-image
          style="height: 100px"
          :src="img.url"
          fit="cover"
        />
        <div
          class="selected"
          v-if="isShowSelected && selected === index"
        >
        </div>
        <div v-if="isShowAction" class="image-action">
          <!--
            class 样式绑定
             {
                CSS类名: 布尔值
             }
             true：作用类名
             false：不作用类名
           -->
          <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="small"
            @click="onCollect(img)"
            :loading="img.loading"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete-solid"
            circle
            :loading="img.loading"
            @click="onDelete(img)"
          ></el-button>
          <!-- <i
            :class="{
              'el-icon-star-on': img.is_collected,
              'el-icon-star-off': !img.is_collected
            }"
            @click="onCollect(img)"
          ></i> -->
          <!-- <i class="el-icon-delete-solid"></i> -->
          <!-- <el-button size="mini" icon="el-icon-delete-solid" circle></el-button> -->
        </div>
      </el-col>
    </el-row>

    <!-- 数据分页 -->
    <!--
      分页数据改变以后，页码不会变化
      它需要单独处理高亮的页码
     -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :current-page.sync="page"
      @current-change="onPageChange"
    >
    </el-pagination>
    <!-- /数据分页 -->

    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <!--
        upload 组件本身就支持请求提交上传操作，说白了你使用它不用自己去发请求，它会自己发。
        请求方法：默认就是 POST
        请求路径：action，必须写完整路径
        请求头：headers
       -->
      <el-upload
        class="upload-demo"
        drag
        action="http://toutiao-img.itheima.net/FkGoX3FR43Xmm9ReaXlBpvjuC-zp"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
    <!-- /素材列表 -->
  </div>
</template>

<script>
// 引入图片相关API
// import { getImage } from '@/api/image'
import { getImage, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageList',
  props: {
    foo: {
      type: Number,
      // required: true,
      default: 123
    },
    // 是否显示添加素材
    isShowAdd: {
      type: Boolean, // 布尔值
      default: true // 默认值
    },
    // 是否显示图片下方的操作（收藏和删除）
    isShowAction: {
      type: Boolean,
      default: true
    },
    isShowSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 也可以这样保存用户的token
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      images: [], // image 图片保存的数组
      page: 1, // 当前页码
      collect: false, // 默认查询全部素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      pageSize: 20, // 每页大小
      totalCount: 0, // 总条数
      selected: null, // 选中的索引
      radio1: '全部'
    }
  },
  created () {
    this.loadImages(1)
  },
  methods: {
    async loadImages (page = 1) {
      // 重置高亮页码，防止数据和页码不对应
      this.page = page
      try {
        const { data } = await getImage({
          collect: this.collect,
          page,
          per_page: this.pageSize
        })
        // 赋值
        const results = data.data.results
        results.forEach(img => {
          // img 对象本来没有 loading 数据
          // 我们这里收到的往里面添加该数据是用来控制每个收藏按钮的 loading 状态
          img.loading = false
        })
        this.images = results
        this.totalCount = data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 收藏图片
    async onCollect (img) {
      img.loading = true
      await collectImage(img.id, !img.is_collected)
      img.is_collected = !img.is_collected
      img.loading = false
    },
    // 删除图片
    async onDelete (img) {
      img.loading = true
      try {
        await deleteImage(img.id)
        await this.loadImages(this.page)
        img.loading = false
      } catch (err) {
        this.$message.error('删除失败')
      }
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 执行上传文件的操作
      // 没写
      // 更新素材列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    // 换页
    onPageChange (page) {
      this.loadImages(page)
    }
  }
}
</script>

<style lang="less" scoped>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
  position: relative;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
.selected {
  background: url(./undraw_Going_up_re_86kg.png) no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
