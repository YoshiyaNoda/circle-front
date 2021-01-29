<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/website/example">Website</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
#sidemenu {
  width: 17%;
  background-color: rgba(100,100,130,.1);
}
.linkContainer {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration-line: none;

    &.router-link-exact-active {
      color: gray;
    }
  }
  > ul {
    list-style-type: none;
    > li {
      padding: 5px;
    }
  }
}
</style>