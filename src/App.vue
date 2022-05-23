<template>

      <div class="wrapper" >
        <side-bar :menu="menu" @closeMenu="menu = false"/>
        <div class="content">
            <div class="abs-lft" @click="menu = true"><i class="fa-solid fa-bars"></i></div>
            <router-view/>
        </div>
    </div>

</template>

<script>

import SideBar from '@/components/SideBar.vue'
import { Buffer } from 'buffer'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      menu: false // Stato di apertura del menu
    }
  },
  created () {
    // Logout if token is expired
    if (localStorage.getItem('accessToken') ||
          sessionStorage.getItem('accessToken')) {
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')

      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = Buffer.from(base64, 'base64')

      const jwtPayload = JSON.parse(jsonPayload)
      console.log(jwtPayload)
      if (jwtPayload.exp < Date.now() / 1000) {
        localStorage.clear()
        sessionStorage.clear()
      } else {
        this.login()
      }
    };
  },
  components: {
    SideBar
  },
  methods: {
    ...mapMutations(['login'])
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

body{
    height: 100vh;
    margin: 0;
    font-family: 'Roboto', sans-serif;
}
.wrapper{
    display: grid;
    grid-template-columns: 1fr 6fr;
    gap:2em;
}

.content{
    display: grid;
    grid-template-columns: 3fr 2fr;
}
.contentF{
    display: grid;
    grid-template-columns: 1fr;
}
.abs-lft{
    position: absolute;
    font-size: 1.2em;
    padding:1em;
    display: none;
      z-index: 10001;

}
.abs-lft:hover,.close:hover{
    cursor: pointer;
}

@media (max-width:1024px){
    .abs-lft{
        display: block;
    }
    .wrapper{
        grid-template-columns: 1fr;
    }
}
@media(max-width:800px){
    .content{
        grid-template-columns: 1fr;
        gap:2em;
        margin-top:2em;
    }
    .abs-lft{
        top:0;
    }
}
@media(max-width:500px){
    *{
      padding:0;
    }
}
</style>
