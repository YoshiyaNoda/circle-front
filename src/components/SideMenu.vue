<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <h1>LOGO</h1>
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
          <router-link to="/test">Test</router-link>
        </li>
        <li>
          <router-link to="/create">Create Web Site</router-link>
        </li>
        <li>
          <p style="color: white;">{{ name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.appendObserving(this);
  },
  data() {
    return {
      'token': this.$store.token,
      'email': this.$store.email,
      'name': this.$store.name,
    };
  }
}
</script>

<style scoped lang="scss">
#sidemenu {
  width: 15%;
  // background-color: rgba(200,200,230,.2);
  background-color: black;
  border-right: 1px solid gray;
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
        // color: #2c3e50;
        color: white;
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