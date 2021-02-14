<template>
    <div class="imageEditorContainer">
      <div class="customBtnContainer">
        <button>何か</button>
      </div>
      <div class="imageEditor" @click="setMySelfToSelector">
        <img :src="d.data.url ? d.data.url: require('@/assets/live.jpg')" alt="画像">
      </div>
    </div>
</template>

<script>
export default {
  mounted: function() {
  },
  props: {
    articleData: new Object()
  },
  data: function() {
    return {
      d: this.articleData
    }
  },
  methods: {
    setMySelfToSelector() {
      this.$parent.setSelectedImageEditor(this)
    },
  },
  watch: {
    articleData: function(data) {
      this.d = data
    }
  },
}
</script>

<style lang="scss" scoped> // scopedにするとv-dataが追加されてしまう。
.imageEditorContainer {
  border-radius: 0px;
  border: solid 1px rgba(0,0,0,.1);
  width: 80%;
  margin: 0 auto;
  &:hover {
    border: solid 1px rgba(0,0,0,.3);
  }
  > .customBtnContainer {
    width: 100%;
    height: 40px;
    border-bottom: solid 1px rgba(0,0,0,.1);
    > button {
      height: 100%;
      min-width: 50px;
      padding: 3px 8px;
      background-color: transparent;
      border: solid 1px transparent;
      margin: 0 5px;
      &:hover {
        background-color: rgba(0,0,0,.1);
      }
    }
  }
  > .imageEditor {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    padding: 10px;
    background-color: #ECECEC;
    background-image: -webkit-gradient(linear, 0 0, 100% 100%,color-stop(.25, #F9F9F9), color-stop(.25, transparent),color-stop(.5, transparent), color-stop(.5, #F9F9F9),color-stop(.75, #F9F9F9), color-stop(.75, transparent),to(transparent));
    -webkit-background-size: 14px 14px;
    background-size: 14px 14px;
    box-sizing: border-box;
    > img {
      width: 100%;
    }
  }
}
</style>