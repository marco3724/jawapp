<template>
  <Line :chart-data="weatherChartData" :chart-options="chartOptions" :styles="myStyles" />
</template>

<script>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default {
  components: { Line },
  props: {
    weatherChartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    chartColors: {
      type: Object
    }
  },
  mounted () {

  },
  computed: {
    myStyles () {
      return {
        height: '300px',
        width: '300px'
      }
    }
  }
}
</script>
