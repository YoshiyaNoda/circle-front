<template>
    <div class="imageEditorContainer">
      <div class="customBtnContainer">
        <button>何か</button>
      </div>
      <div class="imageEditor" @click="selectImage">
        <img :src="d.data.url ? d.data.url: ''" alt="画像">
      </div>
    </div>
    <!-- <textarea type="text" v-model="d.data.content"></textarea> -->
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
    selectImage() {
      console.log("画像選択")
    }
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
    background-color: red;
    box-sizing: border-box;
    > img {
      width: 100%;
    }
  }
}
</style>