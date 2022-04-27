<template>
  <nav>
    <router-link id="link" to="/">Kalkulaator</router-link> |
    <router-link id="link" to="/moisted">Mõisted</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      navbarColors: {
        '/': 'blue',
        '/moisted': 'red',
      },
    }
  },
}
</script>

<style>
nav {
  position: relative;
  text-align: left;
  width: 100%;
  margin-top: 0%  ;
  font-size: 14px;
  padding-left: 1%;
}
nav a {
    font-weight: bold;
    color: #2c3e50;
  }
#link:hover{
  color:grey;
}
nav #link.router-link-exact-active {
  color: blue;
}
</style>
