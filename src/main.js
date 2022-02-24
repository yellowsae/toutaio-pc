import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入Element组件和样式
// 按需引入
import {
  loading,
  Button,
  Select,
  Form,
  Input,
  FormItem,
  Container,
  Message,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Step,
  Steps,
  CheckboxGroup,
  Checkbox,
  Upload,
  Timeline,
  TimelineItem
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式文件
import './style/index.less'

// 项目中使用 Element组件
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Upload)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Switch)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(loading)

// // 消息提示 Element , 挂载到Vue的原型上
Vue.prototype.$message = Message
// 确认消息 弹框
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
