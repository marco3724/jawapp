<template>
<div class='container'>

</div>

</template>

<script>

export default {
  created () {
    document.querySelector('.content').className = 'contentF'
  },
  data () {

  },
  methods: {

  },
  computed: {
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content'// ritorno stato iniziale
  }
}
</script>
<style>

</style>
<style scoped>
.container{

}
</style>
