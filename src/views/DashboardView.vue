<template>
  <div class="current">
    <div class="header">
      <div class="center">
        <form class="search-bar" @submit.prevent="searchByCity">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search city..." v-model="city" />
        </form>
      </div>
    </div>
    <div class="main">
      <div class="main-info">
        <div class="location">
                    <span class="city">
                        <i class="fa-solid fa-star" id='fav' @click="removeFav(fullCity)" v-if="fav"></i>
                        <i class="fa-regular fa-star" id='fav' @click="addFav(fullCity)" v-else></i>
                        <i class="fa-solid fa-location-dot"></i> {{fullCity}}
                    </span>
          <span class="date">{{ date(null) }}</span>
        </div>

        <div class="temperature">
          <div class="center">
            <div class="number">{{ formatTemperature(current.temp) }}</div>
            <div class="description">{{ current.weather[0].description }}</div>
          </div>
        </div>
        <div class="other">
          <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunrise--v1.png" />
            {{ formatTime(current.sunrise) }}</span>
          <span class="el"><i class="fa-solid fa-temperature-half"></i>
            {{ formatTemperature(current.feels_like) }}</span>
          <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunset--v1.png" />
            {{ formatTime(current.sunset) }}</span>
        </div>
      </div>
      <div class="chart">
        <weather-chart :chart-data="weatherChartData" :chart-options="chartOptions" />
      </div>
    </div>
    <div class="other-info">
      <div class="info">
        <div class="text-info">
          <div class="name">Wind speed</div>
          <div class="about">today Wind speed</div>
          <div class="value">{{ current.wind_speed }} m/s</div>
        </div>
        <div class="chart">
          <div class="circular-progress">
            <div class="value-container">0%</div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="text-info">
          <div class="name">Humidity</div>
          <div class="about">today Humidity</div>
          <div class="value">{{ current.humidity }}%</div>
        </div>
        <div class="chart">
          <div class="circular-progress">
            <div class="value-container">0%</div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="text-info">
          <div class="name">Pressure</div>
          <div class="about">today Pressure</div>
          <div class="value">{{ current.pressure }}hpa</div>
        </div>
        <div class="chart">
          <div class="circular-progress">
            <div class="value-container">0%</div>
          </div>
        </div>
      </div>

      <div class="info">
        <div class="text-info">
          <div class="name">UVI index</div>
          <div class="about">Today UV index</div>
          <div class="value">{{ current.uvi }}</div>
        </div>
        <div class="chart">
          <div class="circular-progress">
            <div class="value-container">0%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="forecast">
    <div class="title">Forecast</div>
    <div class="hourly">
      <div class="text">today</div>
      <div class="hour-container">
        <div class="hour" v-for="hour in hourly" :key="hour">
          <div class="time">{{ formatTime(hour.dt) }}</div>
          <div class="icon"><img :src="findIcons(hour.weather[0].icon)" /></div>
          <div class="temp">{{ formatTemperature(hour.temp) }}</div>
        </div>
      </div>
    </div>
    <div class="text week">weekly</div>
    <div class="daily">
      <div class="day" v-for="day in daily" :key="day">
        <div class="container">
          <div class="text">{{ week(day.dt) }}</div>
          <div class="date">{{ date(day.dt) }}</div>
        </div>
        <div class="end">
          <div class="temp">{{ formatTemperature(day.temp.day) }}</div>
          <div class="icon"><img :src="findIcons(day.weather[0].icon)" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherChart from '../components/WeatherChart'
import http from '../http-common'
export default {
  components: {
    WeatherChart
  },
  created () {
    // console.log(this.id)
    http.get('user/me', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    }).then(res => {
      this.favourites = res.data.favourites
      this.city = this.$route.query.city || res.data.favourites[0] || 'Rome'
      this.searchByCity()
    }).catch(err => {
      this.city = this.$route.query.city || 'Rome'
      this.searchByCity()
      console.log(err)
    })
  },
  data () {
    return {
      weatherChartData: {},
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
      key: '80b42f8e53b81f545a7268529925647e',
      favourites: [],
      fav: false,
      backupCity: '' // mi serve quando rimuovo dai preferiti
    }
  },
  mounted () { },
  methods: {
    async searchByCity () {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`
        )
        const loc = await res.json()
        this.location = loc[0]
        console.log(loc)
        const res1 = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0].lat}&lon=${loc[0].lon}&exclude={alerts,minutely}&units=metric&appid=${this.key}`
        )
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
          if (i !== 0) {
            l.push(`+${i}hr`)
          }
        }
        this.weatherChartData = {
          labels: l,
          datasets: [
            {
              label: 'Temperature',
              data: h,
              borderColor: '#077187',
              pointBorderColor: '#0E1428',
              pointBackgroundColor: '#AFD6AC',
              backgroundColor: '#74A57F'
            }
          ]
        }
        for (let i = 1; i < 8; i++) {
          this.daily.push(data.daily[i])
        }
        this.charts()
        console.log(this.favourites)
        console.log(this.isFavourite())
        this.backupCity = this.city
        this.fav = this.isFavourite()

        this.city = ''
        // console.log(this.fav)
        // console.log(data)
      } catch (e) {
        // this.$toast.warning('citta non trovata\n' + e)
        this.$toast.warning('citta non trovata\n')
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
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
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
    },
    charts () {
      const progressBar = document.querySelectorAll('.circular-progress')
      const valueContainer = document.querySelectorAll('.value-container')

      const progressValue = [0, 0, 0, 0] // in percentuale
      const progressEndValue = [
        this.current.wind_speed,
        this.current.humidity,
        this.current.pressure - 990,
        this.current.uvi
      ] // non in percentuale [( ho messo alla pressure un offest di 990)]
      const maxvalues = [30, 100, 60, 11] // valore limite  che ogni parametro puo assumere
      // 990-1050  e' il range della pressione
      // 0-11 range dell uv
      // 0-30 metri al secondo (30 pericolo)
      const speed = 30
      const color = [
        'rgba(0,255,0,1)',
        'rgba(0,0,255,1)',
        'rgba(255,255,0,1)',
        'rgba(255,0,0,1)'
      ]
      const base = [
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
        'rgba(255,255,0,0.3)',
        'rgba(255,0,0,0.3)'
      ]
      const progress = []
      for (let i = 0; i < progressBar.length; i++) {
        progress[i] = setInterval(() => {
          progressValue[i]++
          valueContainer[i].textContent = `${progressValue[i]}%`
          progressBar[i].style.background = `conic-gradient(
      ${color[i]} ${progressValue[i] * 3.6}deg,
      ${base[i]} ${progressValue[i] * 3.6}deg
      )`
          if (
            progressValue[i] >=
            ((100 * progressEndValue[i]) / maxvalues[i]).toFixed(0)
          ) {
            // mi calcolo il valore in percentuale
            clearInterval(progress[i])
          }
        }, speed)
      }
    },
    isFavourite () {
      return this.favourites.some(el =>
        el.split(',')[0].toLowerCase().includes(this.backupCity.split(',')[0].toLowerCase())
      )
    },
    addFav (city) { // provare ad aggiungere is logged in
      if (!this.favourites.includes(city)) {
        this.favourites.push(city)
        http.post('user/update', { favourites: this.favourites }, {
          headers: {
            'x-access-token': localStorage.getItem('accessToken')
          }
        }).then(res => {
          // console.log('success')
          this.$toast.success('city added to favourites')
          this.fav = this.isFavourite()
        })
          .catch(err => console.log(err))
      }
    },
    removeFav (city) {
      this.favourites = this.favourites.filter(c => c !== city)
      // console.log(this.cities)
      http.post('user/update', { favourites: this.favourites }, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }
      }).then(res => {
        this.$toast.warning('city removed from favourites')
        // console.log('success')
        this.fav = this.isFavourite()
      })
        .catch(err => console.log(err))
    }

  },
  computed: {
    fullCity () {
      return this.location.name + ', ' + this.location.country
    }
  }
}
</script>

<style scoped lang="scss">
/*main*/

.current {
  display: grid;
  grid-template-rows: 1fr 3fr 3fr;
  height: 100vh;
  margin-right: 2em;
}

.header {
  padding: 1em;

  text-align: center;
}

.header input {
  border: none;
  font-size: 1.3em;
  box-sizing: border-box;
  border-bottom: white solid 2px;
  /*solo per non far muovere gli elmenti quando viene focusato*/
}

.header input:focus {
  outline: none;
  border-bottom: #0f1621 solid 2px;
}

.search-bar {
  max-width: 350px;
  margin: auto;
  padding: 0.5em;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  @media (max-width: 800px) {
  max-width: 100%;
}

}

.search-bar i {
  padding-right: 1em;
  font-size: 1.2em;
  border-bottom: white solid 2px;
}

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 15px;
}

.main-info {
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 1em;
}
#fav{
    color: rgb(255, 187, 0);
    margin-right: 0.5em;
    font-size: 1.5em;
}
#fav:hover{
    cursor: pointer;
}
.temperature{
    position: relative;
}

.center {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center>* {
  text-align: center;
}

.location {
  display: flex;
  justify-content: space-between;
}

.number {
  align-self: center;
  font-size: 3em;
}

.main .chart {
  position: relative;

  margin: 1em;
  display: grid;
  justify-content: center;
  align-content: center;
}

.other {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.other-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2em;
  margin-bottom: 2em;
  gap: 2em;
}

@media (max-width: 800px) {
  .other-info {
    grid-template-columns: 1fr;
    gap: 1em;
    margin-top: 2em;
    margin-bottom: 0;
  }
}

.info {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 15px;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: lightsteelblue;
}

.text-info {
  display: grid;
}

.info .chart {
  /* background-color: #0F1621; */
  display: grid;
  justify-content: center;
  align-content: center;
}

.circular-progress {
  position: relative;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  display: grid;
  place-items: center;
}

.circular-progress:before {
  content: "";
  position: absolute;
  height: 84%;
  width: 84%;
  background-color: #ffffff;
  border-radius: 50%;
}

.value-container {
  position: relative;
  font-family: "Roboto", sans-serif;
  color: #231c3d;
}

.name {
  font-size: 1.3em;
}

.name,
.value {
  font-weight: 800;
}

.about {
  color: white;
}

/*forecast*/
.forecast {
  border-left: #a7a9a9 solid 1px;
  font-size: 1.2em;
  min-width: 0;
  height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 2em;
  padding: 1em;
  text-align: center;
}

.hourly {
  padding: 2em;
}

.hour-container {
  display: flex;
  min-width: 0;
  overflow-x: scroll;
}

.hour {
  margin-top: 1em;
  margin-right: 1em;
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-radius: 15px;
}

.hour>* {
  text-align: center;
}

.temp {
  font-weight: bold;
}

.hour:first-child {
  background-color: lightskyblue;
}

.week {
  margin-left: 2em;
}

.daily {
  display: flex;
  flex-direction: column;
  margin: 2em;
  gap: 1em;
  overflow-y: scroll;
  position: relative;
}

.end {
  display: flex;
  justify-content: space-between;
}

.day {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.text {
  font-weight: bold;
}

@media (max-width: 1024px) {
  .current {
    padding-left: 3em;
    /*serve per compensare*/
    padding-right: 1em;
  }
}

@media (max-width: 800px) {
  .daily {
    overflow-y: visible;
  }
}

@media (max-width: 600px) {
  .current {
    height: auto;
  }

  .current,
  .forecast {
    padding: 1em;
    margin: 0;
  }

  .main {
    grid-template-columns: 1fr;
  }

  .daily,
  .hourly,
  .week {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
