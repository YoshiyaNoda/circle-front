<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <ul>
        <li>
          <router-link to="/login">Sign up</router-link>
        </li>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/website/example">Website</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/create">Create Web Site</router-link>
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
  width: 15%;
  background-color: rgba(200,200,230,.1);
}
.linkContainer {
  padding: 30px;

  > ul {
    padding: 5px;
    list-style-type: none;
    > li {
      padding: 5px;
      a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration-line: none;
        font-size: 0.8rem;

        &.router-link-exact-active {
          color: gray;
        }
      }

    }
  }
}
</style>