<template>
  <div :class="{'article-create-wrapper': true, 'active': flag}">
    <!-- クラス名がwrapperだと親コンポーネントのスタイルが適用されてしまう。 -->
    <div class="btn-container">
      <button @click="turnOn">新規作成</button>
    </div>
    <div class="article-create-modal">
      <button @click="turnOff">キャンセル</button>
    </div>
    <div id="overlay">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  methods: {
    turnOn() {
      this.flag = true
    },
    turnOff() {
      this.flag = false
    }
  }
}
</script>

<style scoped lang="scss">
// v-showでもいいけど、transitionを追加するならdisplay:none;で隠した方が良い気がする。
#overlay {
  display: none;
}
.article-create-modal {
  display: none;
}
.active {
  > .article-create-modal {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    transform: translateX(-50%) translateY(-50%);
    border: 1px solid rgba(0,0,0,.1);
    background-color: #FFFFFF;
    border-radius: 5px;
    z-index: 200;
  }
  > #overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    z-index: 100;
  }
}
</style>