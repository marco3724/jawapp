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
      <span class="text">JAWApp</span>
    </div>

    <router-link to="/" @click="closeMenu" class="item">
      <i class="fa-solid fa-border-all"></i>
      <span class="text">Dashboard</span>
    </router-link>

    <router-link to="/map" @click="closeMenu" class="item">
      <i class="fa-regular fa-map"></i>
      <span class="text">Map</span>
    </router-link>

    <router-link to="/favourites" @click="closeMenu" class="item">
      <i class="fa-regular fa-star"></i>
      <span class="text">Favourites</span>
    </router-link>

    <router-link to="/review" @click="closeMenu" class="item">
      <i class="fa-regular fa-thumbs-up"></i>
      <span class="text">Review</span>
    </router-link>

    <router-link to="/credits" @click="closeMenu" class="item">
      <i class="fa-solid fa-award"></i>
      <span class="text">Credits</span>
    </router-link>

    <router-link to="/" @click="localLogout" class="item" v-if="isLoggedIn">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      <span class="text">Logout</span>
    </router-link>

    <router-link to="/login" @click="closeMenu" class="item" v-else>
      <i class="fa-solid fa-arrow-right-to-bracket"></i>
      <span class="text">Login</span>
    </router-link>

  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: { menu: { type: Boolean, default: false } },
  emits: ['closeMenu'],
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
    localLogout () {
      this.closeMenu()
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

.logo {
  color: #0f1621;
  font-size: 1.5em;
  font-weight: bolder;
}

.item {
  margin-top: 1em;
  margin-left: 1em;
  border-left: white 2px solid;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  color: #a7a9a9;
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
