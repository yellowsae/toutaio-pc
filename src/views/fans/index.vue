<template>
  <div class="fans-container">
    <!-- 1. 为 ECharts 准备一个具备大小（宽高）的画布容器 DOM -->
    <div ref="main" style="width: 600px;height:400px;"></div>

<!--    <h2>地图图表示例</h2>-->
<!--    <map-demo />-->

<!--    <h2>纯粹的百度地图示例</h2>-->
<!--    <bmap-demo />-->
  </div>
</template>

<script>
// 2. 引入 eCharts
import echarts from 'echarts'
// import MapDemo from './components/map-demo'
// import BmapDemo from './components/bmap-demo'
export default {
  name: 'FansIndex',
  // components: {
  //   MapDemo,
  //   BmapDemo
  // },
  mounted () {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts入门'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫123', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style scoped>

</style>
