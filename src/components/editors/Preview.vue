<template>
  <div class="container">
    <div v-html="data2html()"></div>
    <div class="btnContainer">
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
            html += '<h1>' + obj.data.content + '</h1>\n'
          }
        }
        else if(obj.type === 'paragraph') {
          if(obj.option === 'normal') {
            html += '<p>' + obj.data.content + '</p>\n'
          }
        }
      }
      return html
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>