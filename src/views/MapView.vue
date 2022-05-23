<template>
 <h3>GoogleMapsApi</h3>
  <div style="height:100%; width:100%;">
    {{currPos.lat.toFixed(2)}},   {{currPos.lng.toFixed(2)}}
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { geoLocation } from '../geoLocation.js'
export default {
  created () {

  },
  setup () {
    const { coords } = geoLocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))
    return { currPos }
  },
  data () {
    return {
      markers: [
        {
          coords: { lat: 41.902782, lng: 12.496366 },
          content: '<h1>Rome</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 39.223843, lng: 9.121661 },
          content: '<h1>Cagliari</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 43.769562, lng: 11.255814 },
          content: '<h1>Florence</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 45.4613, lng: 9.1595 },
          content: '<h1>Milan</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 45.068371, lng: 7.683070 },
          content: '<h1>Turin</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";>&nbsp &nbsp :persone hanno segnalato</i></p>'
        },
        {
          coords: { lat: 45.440845, lng: 12.315515 },
          content: '<h1>Venice</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";>&nbsp &nbsp :persone hanno segnalato</i></p>'
        },
        {
          coords: { lat: 38.115662, lng: 13.361470 },
          content: '<h1>Palermo</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 41.125912, lng: 16.872110 },
          content: '<h1>Bari</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        },
        {
          coords: { lat: 40.8359336, lng: 14.2487826 },
          content: '<h1>Naples</h1>' +
            '<p><i class="fa-solid fa-sun" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>' +
            '<p><i class="fa-solid fa-cloud-rain" style="font-size:18px";></i>&nbsp &nbsp :persone hanno segnalato</p>'
        }
      ]

    }
  },
  methods: {
  },
  computed: {

  }
}
</script>

<style scoped >
    #map {
      height: 800px;
      width: 800px;
    }
</style>
