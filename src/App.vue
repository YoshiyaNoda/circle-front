<template>
  <div id="app">
    <SideMenu />
    <div class="maincontentscontainer">
      <router-view />
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
export default {
  components: { SideMenu }
  // mountedでクッキーの取得をする。
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
  min-height: 100vh;
}

body {
  background-color: black;
  margin: 0;
}
.maincontentscontainer {
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 480px) {
  #app {
    display: block;
  }
}
</style>
