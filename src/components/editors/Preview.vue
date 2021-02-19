<template>
  <div class="previewContainer">
    <div v-html="data2html()"></div>
    <div class="previewBtnContainer">
      <button @click="saveRawHTML">公開データを更新</button>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      d: this.articleData
    };
  },
  props: {
    articleData: new Object()
  },
  watch: {
    articleData: function(data) {
      this.d = data;
    }
  },
  methods: {
    async saveRawHTML() {
      if(this.$store.checkTokenIsSet) {
        const url = "save-raw-HTMl"
        const params = new URLSearchParams()
        params.append('rawHTML', this.data2html())
        params.append('token', this.$store.token)
        params.append('articleId', this.$store.selectedArticleId)
        await this.$axios.post(url, params).then(res => {
          console.log(res)
          alert('更新しました。')
        }).catch(e => {
          console.log(e)
          alert('更新に失敗しました。')
        })
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    data2html: function() {
      let html = ""
      let classes = ""
      let styles = ""
      const length = this.d.length
      for(let i = 0; i < length; i++) {
        const obj = this.d[i]
        if(obj.type === 'heading') {
          if(obj.option === 'normal') {
            html += '<div class="paddingContainer">' + obj.data.content + '</div>\n'
          }
        }
        else if(obj.type === 'paragraph') {
          classes = ""
          styles = ""
          if(obj.option === 'normal') {
            styles += `padding: ${obj.data.padding}%`
          }
          if (obj.data.textAlign === 'left'){
            classes += "paragragh-left "
          }
          else if(obj.data.textAlign === 'center'){
            classes += "paragragh-center "
          }
          else if(obj.data.textAlign === 'right'){
            classes += "paragragh-right "
          }
          console.log(classes)
          html += `<div style="${styles}" class="${classes} ">${obj.data.content}</div>\n`
        }  
        else if(obj.type === 'image') {
          if(obj.option === 'normal') {
            if(obj.data.url) {
              html += '<div class="imageContainer"><img src="' + obj.data.url + '" alt="画像"></div>\n'
            } else {
              html += '<div class="imageContainer"><img src="' + require('@/assets/live.jpg') + '" alt="画像"></div>\n'
            }
          }
        }
      }
      return html
    }
  }
}
</script>

<style lang="scss"> // scopedにするとclassにスタイルが適用されない
.previewContainer {
  width: 100%;
  padding: 15px 0;
}
.paddingContainer {
  padding: 20px 60px;
}
.imageContainer {
  width: 100%;
  > img {
    width: 100%;
  }
}
.previewBtnContainer {
  position: relative;
  width: 100%;
  height: 100px;
  > button {
    position: absolute;
    right: 100px;
    top: 0;
    font: inherit;
    color: white;
    background-color: rgb(255, 111, 1);
    border: solid 1px rgba(0,0,0,.1);
    border-radius: 3px;
    padding: 10px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    &:hover {
      background-color: rgb(225, 103, 37);
    }
  }
}

.paragragh{
  &-left{
    text-align: left;
  }
  &-center{
    text-align: center;
  }
  &-right{
    text-align: right;
  }
}
</style>