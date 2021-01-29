<template>
  <div class="container">
    <div class="bgContainer">
      <img src="../assets/lpblack.jpeg" alt="background image">
    </div>
    <div class="headingContainer">
      <div class="imgContainer">
        <img src="../assets/live.jpg" alt="head image">
      </div>
      <div class="msgHeadingContainer">
        <h1>ようこそ</h1>
        <p>たった5分で、<br>あなただけの<br>Webサイトを作りましょう</p>
      </div>
    </div>
    <div class="content">
      <div class="account">
        <h1>Intro.</h1>
        <p>多くのサークルや団体には、当たり前のようにホームページ、あるいはWebサイトがありますよね。</p>
        <p>一体誰が管理しているのでしょうか。</p>
        <p>その管理者が引退したあとは...?</p>
        <p>毎年引き継ぐのは大変ですよね。</p>
        <p>そういった不安を解決するために、このアプリケーションを作りました。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.container {
  width: 85%;
  > .content {
    padding: 30px;
    color: white;
    > .account {
      background-color: rgba(0,0,0,.9);
      padding: 30px;
      text-align: center;
      > h1 {
        border-bottom: solid 1px white;
      }
    }
  }
  > .bgContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -100;
    > img {
      width: 100%;
    }
  }
  > .headingContainer {
    position: relative;
    z-index: 200;
    > .msgHeadingContainer {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
      color: white;
      font-size: 2rem;
    }
    > .imgContainer {
      width: 100%;
      // background-color: black;
      text-align: center;
      opacity: 0.9;
      > img {
        width: 100%;
      }
    }
  }
}
</style>