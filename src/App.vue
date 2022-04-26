<template>
<nav>
    <router-link to="/">Kalk</router-link> |
    <router-link to="/moisted">Mõisted</router-link>
  </nav>
  <router-view />
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  components:{
    Footer,
  }
}
</script>

<style>
nav {
  position: fixed;
  width: 100%;
  top: 20px;
  font-size: 14px;
}
nav a {
    font-weight: bold;
    color: #2c3e50;
  }
</style>
