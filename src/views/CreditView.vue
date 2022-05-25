
<template>
<div class='container'>
</div>
</template>

<script>
/* eslint-disable no-undef */

export default {
  mounted () {
    document.querySelector('.content').className = 'contentF'
  },
  beforeUnmount () {
    document.querySelector('.contentF').className = 'content' // ritorno stato iniziale
  }
}
</script>

<style scoped>

</style>
