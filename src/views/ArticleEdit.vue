<template>
  <div class="article-edit-wrapper">
    <h1>記事の編集</h1>
    <div class="main-editor-container">
      <div class="editor" v-for="data in jsonData" :key="data.order">{{ data.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonData: [],
      title: '',
      url: '',
    }
  },
  mounted() {
    this.fetchArticleData()
  },
  methods: {
    async fetchArticleData() {
      if(this.$store.checkTokenIsSet()) {
        const url = "fetch-article-data"
        const params = new URLSearchParams()
        params.append('token', this.$store.token)
        params.append('articleId', this.$store.selectedArticleId)
        await this.$axios.post(url, params).then(res => {
          this.jsonData = JSON.parse(res.data.json)
          this.title = res.data.title
          this.url = res.data.url
        }).catch(e => {
          console.log(e)
          alert("データの取得に失敗しました")
        })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.article-edit-wrapper {
  width: 100%;
  background: #ffffff;
  padding: 30px 60px;
  height: 100%;
}
</style>