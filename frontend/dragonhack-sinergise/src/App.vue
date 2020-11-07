<template>
  <div id="app" >
    <router-view />
  </div>
</template>

<script>
import 'primeflex/primeflex.css';

export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
