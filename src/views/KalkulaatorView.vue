<template>
  <div id="kalk">
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
#kalk{
  text-align: left;
  padding-left: 1%;
}
</style>