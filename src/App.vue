<template>
  <div id="app">
    <SideMenu />
    <router-view />
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
export default {
  components: { SideMenu }
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: space-between;
  min-height: 1000px;
}

body {
  background-color: black;
  margin: 0;
}

</style>
