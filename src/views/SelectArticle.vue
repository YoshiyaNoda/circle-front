<template>
  <div class="wrapper">
    <p>記事を選択、あるいは作成してください。</p>
    <div class="articlelist-container">
      <ul>
        <li v-for="article in articleList" :key="article.id">{{ article.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      'articleList': []
    };
  },
  mounted() {
    
  },
  methods: {
    async fetchArticleList() {
      const url = "fetch-article-list";
      const params = new URLSearchParams();
      await this.$axios.post(url, params).then(res => {
        this.articleList = res.data;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 30px 60px;
  background-color: white;
}
</style>