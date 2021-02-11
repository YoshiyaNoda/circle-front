<template>
  <div class="article-edit-wrapper">
    <div class="tabArea">
			<div class="tabBtnContainer">
				<button class="btn" @click="selectTab(1)">編集画面</button>
				<button class="btn" @click="selectTab(2)">Preview</button>
			</div>
		</div>
    <div class="editorArea" v-show="selectedTab === 1">
      <h1>記事の編集</h1>
      <div class="main-editor-container">
        <div class="iterContainer" @mouseleave="displayTypeSelect(-1)">
          <div class="typeSelectContainer" v-show="displayedTypeSelect === 0" >
            <div class="typeSelect">
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'heading')">Heading</button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'paragraph')">Pragraph</button>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" @mouseover="displayTypeSelect(0)">追加</button>
        </div>
        <div class="iterContainer" @mouseleave="displayTypeSelect(-1)" v-for="d in articleData" :key="'container'+d.order">
          <div class="dataEditorContainer">
            <EditorController :article-data="d" />
          </div>
          <div class="typeSelectContainer" v-show="displayedTypeSelect === d.order+1" >
            <div class="typeSelect">
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'heading')">Heading</button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'paragraph')">Pragraph</button>
              </div>
            </div>
          </div>
          <button class="btn btn-primary" @mouseover="displayTypeSelect(d.order+1)">追加</button>
        </div>
      </div>
      <div class="save-btn-container">
        <button @click="saveArticleData">保存</button>
      </div>
    </div>
    <div class="previewArea" v-show="selectedTab === 2">
			<Preview :article-data="articleData"/>
		</div>
  </div>
</template>

<script>
import { ArticleComponent } from '@/components/editors/ArticleComponent.js'
import EditorController from '@/components/editors/EditorController.vue'
import Preview from '@/components/editors/Preview.vue'
import _ from 'lodash'
export default {
  components: {
    EditorController, Preview
  },
  data() {
    return {
      articleData: [],
      title: '',
      url: '',
      displayedTypeSelect: -1,
      selectedTab: 1
    }
  },
  mounted() {
    this.fetchArticleData()
  },
  methods: {
    async saveArticleData() {
      if(this.$store.checkTokenIsSet()) {
        const url = "save-article-data"
        const params = new URLSearchParams()
        params.append('articleData', JSON.stringify(this.articleData))
        params.append('articleId', this.$store.selectedArticleId)
        params.append('token', this.$store.token)
        await this.$axios.post(url, params).then(res => {
          console.log(res)
          alert('更新しました。')
        }).catch(e => {
          alert('データの更新に失敗しました。')
          console.log(e)
        })
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    selectTab(num) {
			this.selectedTab = num
		},
		displayTypeSelect(idx) {
			this.displayedTypeSelect = idx
		},
		addElement(order, type) {
			// orderによって、他の要素のorderを増加させる必要がある。
			this.articleData = this.articleData.map(d => {
				if(d.order >= order) {
					d.order += 1
					return d
				}
				else return d
			})
      // 適切な場所にデータを挿入する
			this.articleData.splice(order, 0, {
				order: order,
				type: type,
				option: 'normal',
				// dataはdeepcopyで初期値を設定
				data: _.cloneDeep(ArticleComponent[type].normal.data)
      })
		},
    async fetchArticleData() {
      if(this.$store.checkTokenIsSet()) {
        const url = "fetch-article-data"
        const params = new URLSearchParams()
        params.append('token', this.$store.token)
        params.append('articleId', this.$store.selectedArticleId)
        await this.$axios.post(url, params).then(res => {
          if(res.data.json) {
            this.articleData = res.data.json
          }
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
.tabBtnContainer {
	display: flex;
}
.article-edit-wrapper {
  width: 100%;
  background: #ffffff;
  padding: 30px 60px;
  height: 100%;
}
</style>