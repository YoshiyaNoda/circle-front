<template>
  <div class="wrapper">
    <h1>記事を選択</h1>
    <div class="articlelist-container">
      <ul>
        <li>記事一覧</li>
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
      if(this.$store.login) {
        // ログインしているかを確認する処理をする。
        const url = "fetch-article-list";
        const params = new URLSearchParams();
        await this.$axios.post(url, params).then(res => {
          this.articleList = res.data;
        }).catch(e => {
          alert('データの取得に失敗しました。')
          console.log(e)
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px 60px;
  background-color: white;
  min-height: 100vh;
  @media screen and (max-width: 480px) {
    padding: 30px 15px;
  }
}
.articlelist-container {
  width: 80%;
  margin: 30px auto;
  @media screen and (max-width: 480px) {
    width: 95%;
  }
  > ul {
    border: solid 1px rgba(0,0,0,.1);
    list-style-type: none;
    padding: 0;
    > li {
      padding: 7px;
      border-bottom: solid 1px rgba(0,0,0,.1);
      &:hover {
        background-color: rgba(0,0,0,.4);
        color: white;
      }
    }
    :nth-child(1) {
      background-color: rgba(0,0,0,.6);
      color: white;
      border: none;
      &:hover {
        background-color: rgba(0,0,0,.6);
        color: white;
      }
    }
  }
}
</style>