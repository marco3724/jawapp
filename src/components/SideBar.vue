<template>
  <Transition>
    <div class="background" @click="closeMenu" v-if="menu"></div>
  </Transition>
  <aside :class="menu ? 'menu menu-open' : 'menu menu-close'">
    <div class="close" @click="closeMenu">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="logo">
      <i class="fa-solid fa-atom"></i>
      <span class="text">JAWA</span>
    </div>
    <div class="item" @click="openRoute('/')">
      <i class="fa-solid fa-border-all"></i>
      <span class="text">Dashboard</span>
    </div>

    <div class="item" @click="openRoute('/map')">
      <i class="fa-regular fa-map"></i>
      <span class="text">Map</span>
    </div>

    <div class="item" @click="openRoute('/favourites')">
      <i class="fa-regular fa-star"></i>
      <span class="text">Favourites</span>
    </div>

    <div class="item" @click="openRoute('/review')">
      <i class="fa-regular fa-thumbs-up"></i>
      <span class="text">Review</span>
    </div>
    <div class="item" @click="openRoute('/login')" v-if="!isLoggedIn">
      <i class="fa-solid fa-arrow-right-to-bracket"></i>
      <span class="text">Login</span>
    </div>
    <div class="item" @click="localLogout('/')" v-if="isLoggedIn">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      <span class="text">Logout</span>
    </div>
    <div class="item" @click="openRoute('/')">
      <i class="fa-solid fa-gears"></i>
      <span class="text">Debug</span>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: { menu: { type: Boolean, default: false } },
  data () {
    return {
      isDebug: false
    }
  },
  emits: ['closeMenu'],
  created () {
    const url = new URLSearchParams(document.location.search)
    if (url.get('debug') === 'true') {
      this.isDebug = true
    } else {
      this.isDebug = false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },

  methods: {
    ...mapMutations(['logout']),
    closeMenu () {
      this.$emit('closeMenu')
    },
    cleanAll () {
      localStorage.clear()
      sessionStorage.clear()
      // this.$forceUpdate()
      this.logout()
      this.$toast.success('Logged out!')
    },
    openRoute (route) {
      this.$router.push(route)
      this.closeMenu()
    },
    localLogout (route) {
      this.openRoute(route)
      this.cleanAll()
    }
  }
}
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.background {
  background-color: rgba(black, 0.4);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 10000;
}

.menu {
  box-sizing: border-box;
  border-right: 1px solid #a7a9a9;
  height: 100%;
  min-height: 100vh;

  @media (max-width: 1024px) {
    position: fixed;
    left: -100%;
    background-color: white;
    z-index: 10001;
    border-right: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    width: 50%;
    transition: left 200ms;
  }
}

.menu-open {
  left: 0% !important;
}

.menu-close {
  left: -100% !important;
}

.menu>* {
  padding: 1em;

  display: grid;
  grid-template-columns: 1fr 2fr;
  color: #a7a9a9;
}

.close {
  display: none;
  font-size: 1.5em;
  position: relative;
}

.close i {
  color: #0f1621;
  position: relative;
}

.text a {
  font-weight: bold;
  text-decoration: none;
  color: #a7a9a9;
}

.logo {
  color: #0f1621;
  font-size: 1.5em;
  font-weight: bolder;
}

.item {
  margin-top: 1em;
  margin-left: 1em;
  border-left: white 2px solid;
}

.item:hover {
  color: #0f1621;
  border-left: #0f1621 2px solid;
}

.item:hover a {
  color: #0f1621;
}

@media (max-width: 1024px) {

  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
  }

  .close {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
