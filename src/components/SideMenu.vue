<template>
  <div id="sidemenu">
    <div class="linkContainer">
      <div class="menuFlexContainer">
        <h1 class="logo">Circulator</h1>
        <div :class="{toggleBtn: true, active: toggleFlag}" @click="setFlag">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <transition name="togglemenu" @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
        <ul v-show="width > 480 || toggleFlag" ref="accordion">
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
      el.style.height = '0'
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
.togglemenu-enter-active {
  transition: .35s;
}
.togglemenu-leave-active {
  transition: .35s;
  height: 0;
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
        position: relative;
        right: 25px;
        top: 5px;
        padding: 0px;
        > span {
          font-size: 14px;
          width: 25px;
          height: 2px;
          display: block;
          background: white;
          border-radius: 2px;
          transition: .35s ease-in-out;
          padding: 0;
          box-sizing: border-box;
          position: absolute;
        }
        span:nth-child(1) {
          top: 4px;
        }
        span:nth-child(2) {
          top: 11px;
        }
        span:nth-child(3) {
          top: 18px;
        }
      }
      > .active {
        span:nth-child(1) {
          top: 11px;
          transform: rotate(45deg);
        }
        span:nth-child(2) {
          width: 0;
          left: 50%;
        }
        span:nth-child(3) {
          top: 11px;
          transform: rotate(-45deg);
        }
      }
    }
    > ul {
      margin: 0;
      padding: 0 5px;  //縦にpaddingがあると、transitionがうまくいかない!!!!!!!!!!!!
      height: 200px;
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