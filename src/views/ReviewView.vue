<template>
  <div class="overview">
    <h1>Customer Review</h1>
    <div class="media">
        <div class="number"></div>
        <div class="total"></div>
    </div>
    <div class="votes">
        <div class="bars">
            <label for="file">5: </label>
            <progress id="file" value="32" max="100"> 32% </progress>
        </div>
    </div>
  </div>
</template>

<script>

export default {

  created () {
    this.city = 'rome'
    this.searchByCity()
  },
  data () {
    return {
      weatherChartData: {
      },
      chartOptions: {
        responsive: true
      },
      location: {},
      city: '',
      current: {
        sunset: 0,
        sunrise: 0,
        weather: [{}]
      },
      hourly: [],
      daily: [],
      key: '80b42f8e53b81f545a7268529925647e'
    }
  },
  methods: {
    async searchByCity () {
      try {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`)
        const loc = await res.json()
        this.location = loc[0]
        console.log(loc)
        const res1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0].lat}&lon=${loc[0].lon}&exclude={alerts,minutely}&units=metric&appid=${this.key}`)
        const data = await res1.json()
        this.cityName = this.city
        this.current = data.current
        this.hourly = []
        this.daily = []
        for (let i = 0; i < 24; i++) {
          this.hourly.push(data.hourly[i])
        }
        const h = []
        const l = ['now']
        for (let i = 0; i < 12; i = i + 2) {
          h.push(this.hourly[i].temp)
          if (i !== 0) { l.push(`+${i}hr`) }
        }
        this.weatherChartData = {
          labels: l,
          datasets: [{
            label: 'Temperature',
            data: h,
            borderColor: '#077187',
            pointBorderColor: '#0E1428',
            pointBackgroundColor: '#AFD6AC',
            backgroundColor: '#74A57F'

          }]
        }
        for (let i = 1; i < 8; i++) {
          this.daily.push(data.daily[i])
        }
      // console.log(data)
      } catch (e) {
        alert('citta non trovata')
      }
    },
    formatTime (time) {
      const date = new Date(time * 1000)
      const hours = date.getHours()
      const min = date.getMinutes()
      const minutes = min < 10 ? '0' + min : min /* solo per formattazione */
      return hours + ':' + minutes
    },
    formatTemperature (temp) {
      return parseInt(temp) + '°'
    },
    findIcons (icon) {
      return `https://openweathermap.org/img/wn/${icon}.png`
    },
    week (time) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const date = new Date(time * 1000)
      return days[date.getDate() % 7]
    },
    date (time) {
      let date
      if (time != null) {
        date = new Date(time * 1000).toString().split(' ')
      } else {
        date = new Date().toString().split(' ')
      }
      return date[2] + ' ' + date[1]
    }

  },
  computed: {
    fullCity () {
      return this.location.name + ',' + this.location.country
    }
  }
}
</script>

<style scoped>
progress {
  /* Reset the default appearance */
  -webkit-appearance: none;
   appearance: none;

  width: 250px;
  height: 20px;
}
</style>
