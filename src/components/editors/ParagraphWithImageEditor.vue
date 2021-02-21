<template>
    <div :class="{ paragraphWithImageEditorContainer: true, active: isActive }">
      <div class="customBtnContainer">
        <button @click="makeStrong">強調</button>
        <button @click="makeColor">色変更</button>
        <select v-model="selectColor">
        <option value="red">赤</option>
        <option value="black">黒</option>
        <option value="white">白</option>
        </select>
        <button class="shadow" @click="makeShadow">影</button>

        <!-- padding<input type="textbox" v-model="paddingCount">         -->
        <button class="deleteBtn" @click="deleteMe"><i class="fas fa-trash-alt fa-lg"></i></button>
      </div>
      <div class="paragraphWithImageEditor" @click="setMySelfToSelector">
        <img :src="d.data.url ? d.data.url: require('@/assets/live.jpg')" alt="画像">
      </div>
      <div contenteditable="true" @input="sync" ref="wysiwygEditor" role="textbox" aria-multiline="true" class="paragraphEditor"></div>

    </div>
</template>

<script>

export default {
  mounted: function() {
     this.syncFromData()
    // this.paddingCount = this.d.data.padding;
  },
  props: {
    articleData: new Object()
  },
  data: function() {
    return {
      d: this.articleData,
      isActive: false,
      selectColor:""

    }
  },
  methods: {
    deleteMe() {
      this.$parent.$parent.deleteArticle(this.d)
      if(this.$imageSelectorStore.checkIsImageEditorSet() === this) { // なんか煩雑になってきたな...
        this.$imageSelectorStore.setSelectedImageEditor(null)
      }
    },
    makeColor() {
      const selection = window.getSelection()
      if(selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0)
        const color = document.createElement('span')
        console.log("span")        
        color.className = `text-${this.selectColor}`
        try {
          range.surroundContents(color)
        } catch(e) {
          console.log(e)
          alert('範囲選択が不適切です。')
        }

        this.sync()
      }
    },
    setActive(boolean) {
      this.isActive = boolean;
    },
    setURL(url) {
      this.d.data.url = url
    },
    setMySelfToSelector() {
      if(this.$imageSelectorStore.checkIsImageEditorSet() === this) {
        this.$imageSelectorStore.setSelectedImageEditor(null)
      } else if(this.$imageSelectorStore.checkIsImageEditorSet()) {
        this.$imageSelectorStore.setSelectedImageEditor(null)
        const func = () =>  this.$imageSelectorStore.setSelectedImageEditor(this)
        setTimeout(func, 200)
      } else {
        this.$imageSelectorStore.setSelectedImageEditor(this)
      }
    },
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
    makeShadow(){
      console.log(this.d.data)
      // if(this.d,data.shadow === 1){
      //   this.d.data.shadow = 0
      //   document.getElementsByClassName("shadow").classlist.add("isActive")
      // }else{
      //   this.d.data.shadow = 1
      //   document.getElementsByClassName("shadow").classlist.toggle("isActive")
      // }

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
      console.log("watch",this.d)
      this.d = data
      this.syncFromData()
    },
    d(data) {
      console.log("watchd",data)
    }
  },
}
</script>

<style lang="scss" scoped> // scopedにするとv-dataが追加されてしまう。
.paragraphWithImageEditorContainer {
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
      outline: none;
      background-color: transparent;
      border: solid 1px transparent;
      margin: 0 5px;
      &:hover {
        background-color: rgba(0,0,0,.1);
      }
      > .isActive{
        background-color: rgba(0,0,0,.1);

      }
    }
    > .deleteBtn {
      float: right;
      color: gray;
      &:hover {
        color: red;
      }
    }
  }
  > .paragraphWithImageEditor {
    width: 40%;
    margin: 0 0 0 0;
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
    display: inline-block;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
    > img {
      width: 100%;
    }
  }
  > .paragraphEditor {
    width: 40%;
    height: 200px;
    margin: 0 0 0 auto;
    overflow-y: scroll;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    display:inline-block;
  }
}
.active {
  border: solid 1px rgb(255, 111, 1);
  &:hover {
    border: solid 1px rgb(255, 111, 1);
  }

}
</style>