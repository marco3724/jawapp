<template>
 <h3>GoogleMapsApi</h3>
  <div style="height:100%; width:100%;">
    {{currPos.lat.toFixed(2)}},   {{currPos.lng.toFixed(2)}}
  </div>
  <div ref="mapDiv" id='map'/>
</template>

<script>
/* eslint-disable no-new */
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { geoLocation } from '../geoLocation.js'
const API_KEY = 'AIzaSyDBm40JV-OqOyW_wTjclonA40i-C934Mv4'
export default {
  created () {
    document.querySelector('.content').className = 'contentF'
  },
  setup () {
    const markers = [
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
    const { coords } = geoLocation()
    const currPos = computed(() => ({
      lat: coords.value.latitude,
      lng: coords.value.longitude
    }))

    const loader = new Loader({ apiKey: API_KEY })
    const mapDiv = ref(null)
    onMounted(async () => {
      await loader.load()
      new google.maps.Map(mapDiv.value, {
        center: currPos.value,
        zoom: 6
      })
      for (let i = 0; i < this.markers.length; i++) {
        console.log(this.marker)
        addMarker(markers[i])
      };
    })
    return { currPos, mapDiv }
  },
  mounted () {

  },
  data () {
    return {

    }
  },
  methods: {
    addMarker (props) {
      const marker = new google.maps.Marker({
        position: props.coords,
        map: map
      })

      if (props.content) {
        const infoWindow = new google.maps.InfoWindow({
          content: props.content
        })

        marker.addListener('click', function () {
          infoWindow.open(map, marker)
          map.setZoom(10)
          map.setCenter(marker.getPosition())
        })
      }
    }
  },
  computed: {

  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content' // ritorno stato iniziale
  }
}
</script>

<style scoped >
#map{
  margin: auto;
  width:90%;
  height:80vh;
}
</style>
