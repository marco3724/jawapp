
<template>
<div class='container'>
  <div class='form' v-if="allow">
    <h1>Seleziona il tempo di oggi a {{ this.city}}:</h1>
    <div class="choices">
      <div class="choice" @click="select(0)"><i class="fa-solid fa-sun" ></i></div>
      <div class="choice" @click="select(1)"> <i class="fa-solid fa-cloud"></i></div>
      <div class="choice" @click="select(2)"> <i class="fa-solid fa-cloud-rain"></i></div>
      <div class="choice" @click="select(3)"> <i class="fa-solid fa-snowflake"></i></div>
   </div>
   <button @click="signal">segnala</button>
  </div>
  <div class="form" v-else>
    <div class="error">
      <h1>{{errorStr}}</h1>
    </div>
  </div>
 <google-map
 api-key="AIzaSyDBm40JV-OqOyW_wTjclonA40i-C934Mv4"
 style="width: 100%; height: 65vh"
 :center="center"
 :zoom="6"
  :fullscreen-control=false
  :map-type-control=false
 >
    <Marker :options="{ position: mark.coords }" v-for="mark in markers" :key="mark" @click="getInfo(mark.city,mark.index)">
      <info-window>
        <div id="contet">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">{{mark.city}}</h1>
          <div id="bodyContent">
              <div class="signal"><i class="fa-solid fa-sun" style="font-size:18px"></i>{{mark.signal[0]}}: persone hanno segnalato</div>
              <div class="signal"><i class="fa-solid fa-cloud" style="font-size:18px"></i>{{mark.signal[1]}}: persone hanno segnalato</div>
              <div class="signal"><i class="fa-solid fa-cloud-rain" style="font-size:18px"></i>{{mark.signal[2]}}: persone hanno segnalato</div>
              <div class="signal"><i class="fa-solid fa-snowflake" style="font-size:18px"></i>{{mark.signal[3]}}: persone hanno segnalato</div>
          </div>
        </div>
      </info-window>
    </Marker>
  </google-map>
</div>
</template>

<script>
/* eslint-disable no-undef */
import { defineComponent } from 'vue'
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'
import http from '../http-common'
// import { geoLocation } from '../geoLocation.js'
export default defineComponent({
  components: { GoogleMap, Marker, InfoWindow },

  created () {
    if (!('geolocation' in navigator)) {
      this.errorStr = 'Geolocation is not available.'
      this.allow = false
      return
    }

    this.gettingLocation = true

    navigator.geolocation.getCurrentPosition(pos => {
      this.gettingLocation = false
      this.location = pos
      this.allow = true
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.location.coords.latitude},${this.location.coords.longitude}&key=AIzaSyBtNRVr8IbLg1JMNJKyi2T4F334JedSH6g`)
        .then(response => response.json())
        .then(data => {
          // console.log(data)
          this.city = data.plus_code.compound_code.split(' ')[1]
          return 0
        })
    }, err => {
      this.allow = false
      this.gettingLocation = false

      if (err.code === 1) { this.errorStr = 'devi attivare la geolocalizzazione per poter segnalare' } else this.errorStr = err.message
      console.log(err)
    })
  },
  mounted () {
    document.querySelector('.content').className = 'contentF'
  },
  methods: {
    select (i) {
      this.index = i
      const c = document.querySelectorAll('.choice')
      for (let j = 0; j < 4; j++) {
        if (j === i) { c[j].className = 'choice selected' } else { c[j].className = 'choice' }
      }
    },
    getInfo (city, key) {
      http.post('signal/get', {
        city: city
      }, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }
      }).then(res => {
        // console.log(res.data)
        this.markers[key].signal[0] = res.data.sun
        this.markers[key].signal[1] = res.data.cloud
        this.markers[key].signal[2] = res.data.rain
        this.markers[key].signal[3] = res.data.snow
      })
        .catch(err => console.log(err))
    },
    signal () {
      if (this.index === -1) {
        this.$toast.info('Seleziona il meteo nella tua zona!')
        return
      }
      http.post('signal/add', {
        city: this.city,
        signal: this.index + 1
      }, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }
      }).then(res => {
        this.$toast.success('Grazie per aver segnalato il meteo!')
        // console.log(res)
      })
        .catch(err => this.$toast.success('error occured' + err))
        .finally(() => {
          this.index = -1

          const c = document.querySelectorAll('.choice')
          for (let j = 0; j < 4; j++) {
            c[j].className = 'choice'
          }
        })
    }
    // async getCity (currPos) {
    //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currPos.lat},${currPos.lng}&key=AIzaSyBtNRVr8IbLg1JMNJKyi2T4F334JedSH6g`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   return data.results[5].formatted_address.split(' ')[0]
    // }
  },

  data () {
    return {
      center: { lat: 41.902782, lng: 12.496366 },
      city: '',
      index: -1,
      allow: false,
      location: null,
      gettingLocation: false,
      errorStr: null,
      markers: [
        {
          index: 0,
          coords: { lat: 41.902782, lng: 12.496366 },
          city: 'Roma',
          signal: [0, 0, 0, 0]
        },
        {
          index: 1,
          coords: { lat: 39.223843, lng: 9.121661 },
          city: 'Cagliari',
          signal: [0, 0, 0, 0]
        },
        {
          index: 2,
          coords: { lat: 43.769562, lng: 11.255814 },
          city: 'Firenze',
          signal: [0, 0, 0, 0]
        },
        {
          index: 3,
          coords: { lat: 45.4613, lng: 9.1595 },
          city: 'Milano',
          signal: [0, 0, 0, 0]
        },
        {
          index: 4,
          coords: { lat: 45.068371, lng: 7.683070 },
          city: 'Torino',
          signal: [0, 0, 0, 0]
        },
        {
          index: 5,
          coords: { lat: 45.440845, lng: 12.315515 },
          city: 'Venezia',
          signal: [0, 0, 0, 0]
        },
        {
          index: 6,
          coords: { lat: 38.115662, lng: 13.361470 },
          city: 'Palermo',
          signal: [0, 0, 0, 0]
        },
        {
          index: 7,
          coords: { lat: 41.125912, lng: 16.872110 },
          city: 'Bari',
          signal: [0, 0, 0, 0]
        },
        {
          index: 8,
          coords: { lat: 40.8359336, lng: 14.2487826 },
          city: 'Napoli',
          signal: [0, 0, 0, 0]
        }
      ]
    }
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content' // ritorno stato iniziale
  }
})
</script>

<style scoped>
i{
  width: 25px;
  height: 25px;
}
.container{
  margin: 1em;
  margin-right: 3em;
}
.form{
  margin-bottom: 1em;
  padding: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  border-radius: 15px;

}
button{
  padding: 1em;
  border-radius: 15px;
  background: black;
  color: white;

}
button:hover{
  cursor: pointer;
    background: white;
  color: black;
}
.choice{
  border-radius: 15px;
    width: 50px;
    height: 50px;
    font-size:25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.error{
  color: #e74c3c;
}
.selected{
  background-color: lightsteelblue;
}
.choice:hover{
  background-color: lightsteelblue;
  cursor: pointer;
}
.choices{
    display: flex;
    gap:1em;
    margin-bottom: 1em;
}
@media (max-width:1024px){
  .form{
    margin-top: 3em;
  }
  .container{
    margin-right: 1em;
  }

}
</style>
