<template>

      <div class="wrapper" >
        <side-bar :class="menu" @closeMenu="menu ='menu menu-close'"/>
        <div class="content">
            <div class="abs-lft" @click="menu ='menu menu-open'"><i class="fa-solid fa-bars"></i></div>
            <router-view/>
        </div>
    </div>

</template>

<script>

import SideBar from '@/components/SideBar.vue'

export default {
  data () {
    return {
      menu: 'menu' // Stato di apertura del menu
    }
  },
  components: {
    SideBar
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

.abs-lft{
    position: absolute;
    font-size: 1.2em;
    padding:1em;
    display: none;
    z-index:3;

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
