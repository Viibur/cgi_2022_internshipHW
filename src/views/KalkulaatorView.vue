<template>
    <Header title = "Teretulemast öö pikkuse kalkulaatorisse" />
    <LatLong />
    <Footer />
</template>
<script>
import Header from '../components/Header.vue'
import LatLong from '../components/LatLong.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    LatLong,
    Footer
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>