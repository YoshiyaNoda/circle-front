<template>
  <div class="wrapper">
    <p>記事を選択、あるいは作成してください。</p>
    <div class="articlelist-container">
      <ul>
        <li v-for="article in articleList" :key="article.id" @click="selectArticle(article.id)">{{ article.title }}</li>
      </ul>
    </div>
    <ArticleCreate />
  </div>
</template>

<script>
import ArticleCreate from '@/components/ArticleCreate';
export default {
  components: {
    ArticleCreate
  },
  data() {
    return {
      'articleList': []
    };
  },
  mounted() {
    this.fetchArticleList();
  },
  methods: {
    selectArticle(articleId) {
      this.$store.selectedArticleId = articleId
      this.$router.push({ path: '/auth/edit-article' })
    },
    async fetchArticleList() {
      if(this.$store.checkTokenIsSet()) {
        // tokenがあるかどうかを確認する処理をする。
        const url = "fetch-article-list";
        const params = new URLSearchParams();
        params.append('token', this.$store.token);
        await this.$axios.post(url, params).then(res => {
          this.articleList = res.data;
        });
      } else {
        this.$router.push({ path: '/login' });
      }
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