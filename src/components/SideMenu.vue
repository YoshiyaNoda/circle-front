<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <div class="menuFlexContainer">
        <h1 class="logo">Circulator</h1>
        <div class="toggleBtn" @click="setFlag">あ</div>
      </div>
      <transition name="togglemenu" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
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
    },
    beforeEnter: function(el) {
      el.style.height = '0'
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function(el) {
      const func = () => el.style.height = '0' //これで要素が消えるまで待って、カクツキを抑えられた
      setTimeout(func, 150)
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
.togglemenu-enter-active, .togglemenu-leave-active {
  transition: .25s;
}
.togglemenu-enter, .togglemenu-leave-to {
  opacity: 0;
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
      margin: 0;
      padding: 10px 0;
      > li {
        // height: 20px;
        > p {
          margin: 0;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>