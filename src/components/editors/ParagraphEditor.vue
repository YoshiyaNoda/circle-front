<template>
    <div class="paragraphEditorContainer">
      <div class="customBtnContainer">
        <button @click="makeStrong">強調</button>
      </div>
      <div contenteditable="true" @input="sync" ref="wysiwygEditor" role="textbox" aria-multiline="true" class="paragraphEditor"></div>
    </div>
    <!-- <textarea type="text" v-model="d.data.content"></textarea> -->
</template>

<script>
export default {
  mounted: function() {
    this.syncFromData()
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
    makeStrong() {
      const selection = window.getSelection()
      if(selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0)
        const strong = document.createElement('strong')
        try {
          range.surroundContents(strong)
        } catch(e) {
          console.log(e)
          alert('範囲選択が不適切です。')
        }
        this.sync()
      }
    },
    sync() {
      let html = this.$refs.wysiwygEditor.innerHTML
      if(html.substring(0, 2) !== "<p") {
        html = "<p>" + html + "</p>"
        this.d.data.content = this.cutNeedless(html)
        this.syncFromData()
      }
      this.d.data.content = this.cutNeedless(html)
      // this.d.data.content = this.cutNeedless(event.target.innerHTML)
    },
    syncFromData() {
      this.$refs.wysiwygEditor.innerHTML = this.d.data.content
      // this.d.data.content = this.cutNeedless(event.target.innerHTML)
    },
    cutNeedless(text) {
      const text1 = text.replaceAll("<div>", "")
      const text2 = text1.replaceAll("</div>", "")
      const text3 = text2.replaceAll("<p></p>", "")
      return text3.replaceAll("<br>", "</p><p>")
    }
  },
  watch: {
    articleData: function(data) {
      this.d = data
      this.syncFromData()
    }
  },
}
</script>

<style lang="scss" scoped> // scopedにするとv-dataが追加されてしまう。
.paragraphEditorContainer {
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
  > .paragraphEditor {
    width: 100%;
    height: 200px;
    overflow-y: scroll;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>