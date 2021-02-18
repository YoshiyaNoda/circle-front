<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <div class="menuFlexContainer">
        <h1 class="logo">Circulator</h1>
        <div class="toggleBtn" @click="setFlag">あ</div>
      </div>
      <transition>
        <ul v-show="width > 480 || toggleFlag">
          <li>
            <router-link to="/login">Sign in/up</router-link>
          </li>
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/auth/select-articles">Create Web Site</router-link>
          </li>
          <!-- <li>
            <router-link to="/website">Sample</router-link>
          </li> -->
          <li>
            <p style="color: white;">{{ name }}</p>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.appendObservable(this);
    window.addEventListener('resize', this.handleResize)
    console.log(this.width)
  },
  data() {
    return {
      token: this.$store.token,
      email: this.$store.email,
      name: this.$store.name,
      width: window.innerWidth,
      height: window.innerHeight,
      toggleFlag: false,
    }
  },
  methods: {
    setFlag() {
      this.toggleFlag = !this.toggleFlag
    },
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped lang="scss">
#sidemenu {
  width: 18%;
  // background-color: rgba(200,200,230,.2);
  background-color: black;
  border-right: 1px solid gray;
}
.linkContainer {
  padding: 30px;
  > .menuFlexContainer {
    > .logo {
      color: white;
    }
    > .toggleBtn {
      display: none;
    }
  }
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
@media screen and (max-width: 480px) {
  #sidemenu {
    width: 100%;
    border: none;
    }
    .linkContainer {
      padding: 10px 20px;
      > .menuFlexContainer {
        color: white;
        > .logo {
          display: inline-block;
          margin: 5px 0;
          font-size: 25px;
        }
        > .toggleBtn {
          display: block;
          float: right;
        }
      }
      > ul {
      }
    }
  }
</style>