<template>
  <div class="menu">
        <div class="close"> <i class="fa-solid fa-xmark"></i></div>
        <div class="logo">
            <i class="fa-solid fa-atom"></i>
            <span class="text">JAWA</span>
        </div>
        <div class="item">
            <i class="fa-solid fa-border-all"></i>
            <span class="text"><a href="#"> Dashboard</a></span>
        </div>

        <div class="item">
            <i class="fa-regular fa-map"></i>
            <span class="text"><a href="#"> Map</a></span>
        </div>

        <div class="item">
            <i class="fa-regular fa-star"></i>
            <span class="text"><a href="#"> Favourits</a></span>
        </div>

        <div class="item">
            <i class="fa-regular fa-thumbs-up"></i>
            <span class="text"><a href="#"> Review</a></span>
        </div>
        <div class="item">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span class="text"><a href="#"> Logout</a></span>
        </div>
        <div class="item">
            <i class="fa-solid fa-gears"></i>
            <span class="text"><a href="#"> Debug</a></span>
        </div>

    </div>
</template>

<script>
export default {

  data () {
    return { isDebug: false }
  },
  created () {
    const url = new URLSearchParams(document.location.search)
    if (url.get('debug') === 'true') {
      this.isDebug = true
    } else {
      this.isDebug = false
    }
  }
}
</script>

<style scoped>
.menu{
    box-sizing: border-box;
    border-right: 1px solid #A7A9A9;
    height: 100vh;

}
.menu>*{
    padding: 1em;

    display: grid;
    grid-template-columns: 1fr 2fr;
    color: #A7A9A9;

}
.close{
    display: none;
    font-size: 1.5em;
    position: relative;

}
.close i {
    color: #0F1621;
    position: relative;

}
.text a{
    font-weight: bold;
    text-decoration: none;
    color: #A7A9A9;
}
.logo{
    color:#0F1621;
    font-size: 1.5em;
    font-weight: bolder;
}
.item{
    margin-top: 1em;
    margin-left: 1em;
    border-left: white 2px solid;
}
.item:hover{
   color: #0F1621 ;
   border-left: #0F1621 2px solid;
}
.item:hover a {
    color: #0F1621 ;
}

@media (max-width:1000px){
    .menu{
        position: fixed;
        left: -100%;
        background-color: white;
        z-index: 99;
        border-right: none;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
        width: 50%;
        transition:left 200ms;
    }
    .wrapper{
        grid-template-columns: 1fr;
    }
    .abs-lft{
        display: block;
    }
    .close{

        display:flex;
        justify-content: flex-end;

    }
}
</style>
