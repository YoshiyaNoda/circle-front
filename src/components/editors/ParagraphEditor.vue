<template>
  <div class="container">
    <div class="paragraphEditor">
      <div class="customBtnContainer">
        <button @click="makeStrong">太字</button>
      </div>
      <div contenteditable="true" @input="sync" ref="wysiwygEditor" role="textbox" aria-multiline="true"></div>
    </div>
    <!-- <textarea type="text" v-model="d.data.content"></textarea> -->
  </div>
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
      if(html[0] !== "<") {
        html = "<p>" + html + "</p>"
      }
      this.d.data.content = this.cutDiv(html)
      // this.d.data.content = this.cutDiv(event.target.innerHTML)
    },
    syncFromData() {
      this.$refs.wysiwygEditor.innerHTML = this.d.data.content
      console.log(this.d.data.content)
      // this.d.data.content = this.cutDiv(event.target.innerHTML)
    },
    cutDiv(text) {
      const text1 = text.replaceAll("<div>", "")
      const text2 = text1.replaceAll("</div>", "")
      return text2.replaceAll("<br>", "</p><p>")
    }
  },
  watch: {
    articleData: function(data) {
      this.d = data
    }
  },
}
</script>

<style lang="scss"> // scopedにするとv-dataが追加されてしまう。
textarea {
  width: 80%;
  height: 200px;
}
</style>