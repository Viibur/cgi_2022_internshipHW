<template>
  <div class="night-length-calculator">
      <Header title = "Teretulemast öö pikkuse kalkulaatorisse" />
      <LatLong />
  </div>
</template>
<script>
import Header from '../components/Header.vue'
import LatLong from '../components/LatLong.vue'

export default {
  name: 'App',
  components: {
    Header,
    LatLong,
  },
}
</script>

<style>
.night-length-calculator  {
  text-align: left;
  padding-left: 1rem;
}
</style>