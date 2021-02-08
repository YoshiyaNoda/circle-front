<template>
  <div :class="{'article-create-wrapper': true, 'active': flag}">
    <!-- クラス名がwrapperだと親コンポーネントのスタイルが適用されてしまう。 -->
    <div class="btn-container">
      <button @click="activate">新規作成</button>
    </div>
    <div class="article-create-modal">
      <p>{{ msg ? msg : "新しい記事を作成" }}</p>
      <button @click="refresh">キャンセル</button>
      <div class="input-container">
        <label>タイトル</label>
        <input type="text" v-model="title">
      </div>
      <div class="input-container">
        <label>URL</label>
        <input type="text" v-model="url">
      </div>
      <div class="create-btn-container">
        <button @click="create">作成</button>
      </div>
    </div>
    <div id="overlay">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      title: '',
      url: '',
      msg: '',
    }
  },
  methods: {
    activate() {
      this.flag = true
    },
    checkDuplication() {
      const length = this.$parent.articleList.length;
      for(let i = 0; i < length; i++) {
        if(this.$parent.articleList[i].title === this.title || this.$parent.articleList[i].url === this.url) {
          return true
        }
      }
      return false
    },
    validation() {
      if(this.title === '' || this.url === '') {
        return "empty"
      } else if(this.checkDuplication()) {
        return "duplicate"
      }
      return "ok";
    },
    async create() {
      if(this.$store.checkTokenIsSet()) {
        if(this.validation() === "ok") {
          const url = "create-article"
          const params = new URLSearchParams()
          params.append('title', this.title)
          params.append('url', this.url)
          params.append('token', this.$store.token)
          await this.$axios.post(url, params).then(_ => {
            console.log(_);
          }).catch(e => {
            console.log(e)
            alert("送信に失敗しました。")
          })
          this.refresh()
        } else if(this.validation() === "empty") {
          this.msg = "空のタイトル, URLは送信できません。"
        } else if(this.validation() === "duplicate") {
          this.msg = "タイトルとURLが他のデータと重複しています。"
        } else {
          this.msg = "エラー"
        }
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    refresh() {
      Object.assign(this.$data, this.$options.data.call(this)) //dataの初期化
      this.$parent.fetchArticleList()
    }
  }
}
</script>

<style scoped lang="scss">
// v-showでもいいけど、transitionを追加するならdisplay:none;で隠した方が良い気がする。
#overlay {
  display: none;
}
.article-create-modal {
  display: none;
}
.active {
  > .article-create-modal {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 60%;
    transform: translateX(-50%) translateY(-50%);
    border: 1px solid rgba(0,0,0,.1);
    background-color: #FFFFFF;
    border-radius: 5px;
    z-index: 200;
  }
  > #overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    z-index: 100;
  }
}
</style>