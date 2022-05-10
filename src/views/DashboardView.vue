<template>
    <div class="current">
        <div class="header">
            <div class="center">
                <form class="search-bar" @submit.prevent="searchByCity">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search city..." v-model="city" >
                </form>
            </div>
        </div>
        <div class="main">
            <div class="main-info">

                <div class="location">
                    <span class="city"><i class="fa-solid fa-location-dot"></i> {{fullCity}}</span>
                    <span class="date">{{date(null)}}</span>
                </div>

                <div class="temperature">
                    <div class="center">
                        <div class="number">{{formatTemperature(current.temp)}}</div>
                        <div class="description">{{current.weather[0].description}}</div>
                    </div>
                </div>
                <div class="other">
                    <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunrise--v1.png"/> {{formatTime(current.sunrise)}}</span>
                    <span class="el"><i class="fa-solid fa-temperature-half"></i> {{formatTemperature(current.feels_like)}}</span>
                    <span class="el"><img src="https://img.icons8.com/ios/15/000000/sunset--v1.png"/> {{formatTime(current.sunset)}}</span>
                </div>
            </div>
            <div class="chart">
                <div class="center"><canvas id="myChart"></canvas></div>
            </div>
        </div>
        <div class="other-info">
            <div class="info">
                <div class="text-info">
                    <div class="name">Wind speed</div>
                    <div class="about">today Wind speed</div>
                    <div class="value">{{current.wind_speed}} m/s</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">Humidity</div>
                    <div class="about">today Humidity</div>
                    <div class="value">{{current.humidity}}%</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">Pressure</div>
                    <div class="about">today Pressure</div>
                    <div class="value">{{current.pressure}}hpa</div>
                </div>
                <div class="chart">

                </div>
            </div>

            <div class="info">
                <div class="text-info">
                    <div class="name">UVI index</div>
                    <div class="about">Today UV index</div>
                    <div class="value">{{current.uvi}}</div>
                </div>
                <div class="chart">

                </div>
            </div>
        </div>
    </div>
    <div class="forecast">
        <div class="title">
            Forecast
        </div>
        <div class="hourly">
            <div class="text">today</div>
            <div class="hour-container" >
                <div class="hour" v-for="hour in hourly" :key="hour">
                    <div class="time">{{formatTime(hour.dt)}}</div>
                    <div class="icon"><img :src="findIcons(hour.weather[0].icon)"/></div>
                    <div class="temp">{{formatTemperature(hour.temp)}}</div>
                </div>

            </div>
        </div>
        <div class="text week">weekly</div>
        <div class="daily" >

            <div class="day" v-for="day in daily" :key="day">
                <div class="container" >
                    <div class="text">{{week(day.dt)}}</div>
                    <div class="date">{{date(day.dt)}}</div>
                </div>
                <div class='end'>
                    <div class="temp">{{formatTemperature(day.temp.day)}}</div>
                    <div class="icon"><img :src="findIcons(day.weather[0].icon)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Chart from 'chart.js/auto'

export default {
  data () {
    return {
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
      chart: {
        labels: ['Morning', 'Afternon', ' Evening', 'Night'],
        datasets: [{
          label: 'Temperature',
          data: [15, 24, 17, 8]
        }]
      }
    }
  },
  mounted () {
    const chart = document.getElementById('myChart').getContext('2d')
    // eslint-disable-next-line no-unused-vars
    const massPopChart = new Chart(chart, {
      type: 'line',
      data: this.chart,
      options: {}
    })
  },
  methods: {
    async searchByCity () {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.key}`)
      const loc = await res.json()
      this.location = loc[0]
      console.log(loc)
      const res1 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${loc[0].lat}&lon=${loc[0].lon}&exclude={alerts,minutely}&units=metric&appid=${this.key}`)
      const data = await res1.json()
      this.cityName = this.city
      this.current = data.current
      for (let i = 0; i < 10; i++) {
        this.hourly.push(data.hourly[i])
      }
      for (let i = 1; i < 8; i++) {
        this.daily.push(data.daily[i])
      }
      console.log(data)
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

/*main*/

.current{
    display: grid;
    grid-template-rows:1fr 3fr 3fr;
    height: 100vh;
    margin-right: 2em;

}
.header{
  padding: 1em;

  text-align: center;

}
.header input{
    border: none;
    font-size: 1.3em;
    box-sizing: border-box;
    border-bottom: white solid 2px; /*solo per non far muovere gli elmenti quando viene focusato*/
}
.header input:focus{
    outline: none;
    border-bottom: #0F1621 solid 2px;
}

.search-bar{
   max-width: 350px;
    margin: auto;
    padding: 0.5em;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.search-bar i {
    padding-right: 1em;
    font-size: 1.2em;
    border-bottom: white solid 2px;

}
.main{
   display: grid;
   grid-template-columns: 1fr 1fr;
   box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
   border-radius:15px ;

}
.main-info{
display: grid;
grid-template-rows: 1fr 3fr 1fr;
padding: 1em;
}

.temperature{
    position: relative;
}
.center{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.center>*{
    text-align: center;
}
.location{
    display: flex;
    justify-content: space-between;
}
.number{
    align-self: center;
    font-size: 3em;
}

.main .chart{
    background-color: rgba(100, 100, 111, 0.5);
    margin: 1em;
}

.other{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.other-info{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 2em;

    margin-bottom: 2em;
    gap:2em;
}

.info{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 15px;
    padding: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: lightsteelblue;

}
.text-info{
    display: grid;

}
.info .chart{
    background-color: #0F1621;

}
.name{
    font-size: 1.3em;
}
.name,.value{
    font-weight: 800;
}
.about{
    color: white;
}

/*forecast*/
.forecast{
    border-left: #A7A9A9 solid 1px;
    font-size: 1.2em;
    min-width: 0;
    height: 100vh;
    max-width: 100%;
    display: flex;
    flex-direction: column;
}
.title{
    font-size: 2em;
    padding: 1em;
    text-align: center;
}
.hourly{
    padding: 2em;

}
.hour-container{
    display: flex;
    min-width: 0;
    overflow-x:scroll;

}
.hour{
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
.hour>*{
    text-align: center;
}
.temp{
    font-weight: bold;
}
.hour:first-child{
    background-color: lightskyblue;
}
.week{
    margin-left: 2em;
}
.daily{
display: flex;
flex-direction: column;
margin: 2em;
gap: 1em;
overflow-y: scroll;
position: relative;
}
.end{
    display: flex;
    justify-content: space-between;
}

.day{
    display: grid;
    grid-template-columns: 1fr 1fr;

}
.text{
    font-weight: bold;
}
@media (max-width:1024px){
    .current{
        padding-left: 3em; /*serve per compensare*/
        padding-right: 1em;
    }
}

@media(max-width:800px){
    .daily{
        overflow-y: visible;
    }
}

@media(max-width:600px){
    .current{
        padding: 0;
        margin: 0;
    }

    .daily, .hourly, .week{
        padding-left:0;
        padding-right: 0;
        margin-left:0;
        margin-right: 0;
    }
}
</style>
