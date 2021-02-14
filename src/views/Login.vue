<template>
  <div class="wrapper">
    <div class="explanation">
      <h1>ログイン</h1>
      <p>以下のボタンをクリックして、ログインあるいは新規登録できます。</p>
    </div>
    <div class="login">
      <div class="loginBtnContainer">
        <button @click="redirectToOAuth('google')"><img src="@/assets/btn_google_signin_light_normal_web.png" alt=""></button> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async redirectToOAuth(provider) {
      const url = "/fetch/" + provider + "/oauth-target-url-test";
      await this.$axios.get(url).then(res => {
        window.location.href = res.data;
      }).catch(e => {
        console.log(e);
      });
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