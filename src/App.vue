<template>

      <div class="wrapper" >
        <side-bar/>
        <div class="content">
        <div class="abs-lft"><i class="fa-solid fa-bars"></i></div>
        <router-view/>
        </div>
    </div>

</template>

<script>

import SideBar from '@/components/SideBar.vue'

export default {
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

}
.abs-lft:hover,.close:hover{
    cursor: pointer;
}

@media (max-width:1000px){
    .abs-lft{
        display: block;
    }
}
</style>
