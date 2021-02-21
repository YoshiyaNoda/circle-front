<template>
  <div class="wrapper">
    <div class="explanation">
      <h1>ログイン中</h1>
      <p>{{name}}</p>
      <p>{{email}}</p>
      <p>以下のボタンをクリックして、ログアウトできます。</p>
    </div>
    <div class="login">
      <div class="loginBtnContainer">
        <button @click="logout">logout</button> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.appendObservable(this);
  },
  data() {
    return {
      'token': this.$store.token,
      'email': this.$store.email,
      'name': this.$store.name,
    };
  },
  methods: {
    logout() {
       const userData =
       {
         'token':'',
         'email':'',
         'name':''
       };
       //this.$store.appendObservable(this);
       this.$store.setUserData(userData);
       this.$router.push({ path: '/login' });
    }
  }
 
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  background-color: white;
  height: 100%;
  padding: 40px 70px;
  > .explanation {
    padding: 30px;
  }
  > .login {
    position: relative;
    // border: 1px solid rgba(0,0,0,.1);
    // border-radius: 5px;
    width: 100%;
    min-height: 100px;
    margin: 0 auto;
    // background-color: rgba(200,200,220,.1);
    > .loginBtnContainer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      > button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        appearance: none;
        > img {
          width: 100%;
        }
      }
    }
  }
}
</style>