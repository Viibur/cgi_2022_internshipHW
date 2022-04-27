<template>
  <nav>
    <router-link to="/">Kalk</router-link> |
    <router-link to="/moisted">Mõisted</router-link>
  </nav>
  <router-view />
</template>

<style>
nav {
  position: relative;
  width: 100%;
  margin-top: 0%;
  font-size: 14px;
}
nav a {
    font-weight: bold;
    color: #2c3e50;
  }
</style>
