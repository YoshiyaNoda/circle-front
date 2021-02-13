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
      const length = this.d.length
      for(let i = 0; i < length; i++) {
        const obj = this.d[i]
        if(obj.type === 'heading') {
          if(obj.option === 'normal') {
            html += '<div class="paddingContainer">' + obj.data.content + '</div>\n'
          }
        }
        else if(obj.type === 'paragraph') {
          if(obj.option === 'normal') {
            html += '<div class="paddingContainer">' + obj.data.content + '</div>\n'
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
}
.paddingContainer {
  padding: 20px 60px;
}
</style>