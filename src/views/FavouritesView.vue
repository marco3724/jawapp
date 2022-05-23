<template>
<div class='container'>
    <div class= 'wrap'>
        <div class="header">
            <form class="search-bar" @submit.prevent="searchByCity">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search city" v-model="city">
            </form>
        </div>
        <div class="cities">
            <div class="city" v-for="w in weathersFilter" :key="w">
               <div>
                    <div class="trash" @click="remove(w.name)" >
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
                <router-link  style="text-decoration:none;color:inherit;" :to="{ name: 'dashboard1', params: { id: w.name }}">
                    <div class="name">{{w.name}}</div>
                    <div class="icon"><img :src="'https://openweathermap.org/img/wn/'+w.weather[0].icon+'.png'" alt=""/> </div>
                    <div class="temp">
                        <div class="degree">{{w.main.temp.toFixed(0)}}°C</div>
                        <div class="description">{{w.weather[0].description}}</div>
                        <div class="minmax">
                            <div class="min"><i class="fa-solid fa-arrow-down"></i> {{w.main.temp_min.toFixed(0)}}°C</div>
                            <div class="max"><i class="fa-solid fa-arrow-up"></i> {{w.main.temp_max.toFixed(0)}}°C</div>
                        </div>
                    </div>

                    <div class="other">
                        <div class="like">
                            <div class="number">{{w.main.feels_like.toFixed(0)}}</div>
                            <div class="description">feels like</div>
                        </div>
                        <div class="humidity">
                            <div class="number">{{w.main.humidity.toFixed(0)}}%</div>
                            <div class="description">humidity</div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import http from '../http-common'
export default {
  created () {
    document.querySelector('.content').className = 'contentF'
    http.get('user/me', {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    }).then(res => {
      console.log(res)
      this.cities = res.data.favourites
      this.cities.forEach(city => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.key}`).then(response => response.json())
          .then(data => this.weathers.push(data))
      })
    }).catch(err => console.log(err))
  },
  data () {
    return {
      key: '80b42f8e53b81f545a7268529925647e',
      cities: [],
      // ['London', 'Rome,it', 'New York', 'los angeles', 'milan', 'florence', 'wenzhou', 'san francisco', 'vieste', 'madrid', 'berlin', 'san jose']
      weathers: [],
      city: ''
    }
  },
  methods: {
    remove (city) {
      console.log(this.cities)
      this.cities = this.cities.filter(c => c.split(',')[0].toLowerCase() !== city.toLowerCase())
      console.log(this.cities)
      http.post('user/update', { favourites: this.cities }, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }
      }).then(res => {
        this.weathers = this.weathers.filter(w => !w.name.toLowerCase().includes(city.toLowerCase()))
      })
        .catch(err => console.log(err))
    }
  },
  computed: {
    weathersFilter () {
      // console.log(this.weathers)
      return this.weathers.filter(w => w.name.toLowerCase().includes(this.city.toLowerCase()))
    }
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content'// ritorno stato iniziale
  }
}
</script>
<style>

</style>
<style scoped>
/* .container{

} */
.trash{
position: absolute;
}
.trash:hover{
color: rgb(255, 81, 0);
}
.wrap{
    padding: 2em;
}
.header{
    margin: 1em;
    margin-bottom: 3em;
    display: flex;
    justify-content: center;
}
.header input{
    border: none;
    font-size: 1.3em;
    box-sizing: border-box;
    border-bottom: white solid 2px;
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

/*cities*/
.cities{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
    gap:2em;
}
.city{
    padding: 1em;
display: grid;
/* justify-content: center; */
border-radius: 10px;
background-color: #2c3e50;
gap: 1em;
color: aliceblue;
transition: transform 500ms;
}
.city >*{
    text-align: center;
}
.city:hover{
    cursor: pointer;
    transform: scale(110%);
}
.degree{
    font-size: 3em;
}
.temp{
    display: grid;
    gap:0.5em;
}
.minmax{
    display: flex;
    justify-content: space-around;
}
.other{
    display: flex;
    justify-content: space-around;
}
.number{
    font-size:2em;
}
.description{
    font-size:0.8em;
}

</style>
