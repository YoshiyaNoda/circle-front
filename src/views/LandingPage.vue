<template>
  <div class="container">
    <div class="bgContainer">
      <!-- <img src="../assets/lpblack.jpeg" alt="background image"> -->
    </div>
    <div class="headingContainer">
      <div class="imgContainer">
        <img src="../assets/live.jpg" alt="head image">
      </div>
      <div class="msgHeadingContainer">
        <h1>ようこそ</h1>
        <p>簡単にWebサイトを作りましょう</p>
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
  width: 100%;
  background-color: rgba(36, 36, 36, 0.9);
  height: 100%;
  min-height: 100vh;
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
      text-align: center;
      > img {
        width: 100%;
      }
    }
    @media screen and (max-width: 480px) {
      > .msgHeadingContainer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -70%);
        color: white;
        font-size: 1rem;
      }
    }
  }
}
</style>