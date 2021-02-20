<template>
  <div class="article-edit-wrapper">
    <div class="tabArea">
			<div class="tabBtnContainer">
				<button :class="{'btn': true, 'active-tab': selectedTab === 1}" @click="selectTab(1)">編集画面</button>
			</div>
			<div class="tabBtnContainer">
				<button :class="{'btn': true, 'active-tab': selectedTab === 2}"  @click="selectTab(2)">Preview</button>
			</div>
		</div>
    <div class="editorArea" v-show="selectedTab === 1">
      <h1>記事の編集</h1>
      <table class="title-and-url-edit-area">
        <tr class="articlePropaty">
          <th><span>タイトル</span></th>
          <td><input type="text" v-model="title"></td>
        </tr>
        <tr class="articlePropaty">
          <th><span>URL</span></th>
          <td><input type="text" v-model="url"></td>
        </tr>
        <tr class="articlePropaty">
          <th><span>閲覧用URL</span></th>
          <td>https://circle-website-creation.com/website/{{ user_id }}/{{ url }}</td>
        </tr>
      </table>
      <div class="main-editor-container">
        <div class="iterContainer">
          <div class="typeSelectContainer" v-show="displayedTypeSelect === 0" >
            <div class="typeSelect">
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'heading')"><span>見出し</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'paragraph')"><span>テキスト</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'image')"><span>画像</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(0, 'paragraphWithImage')"><span>画像付きテキスト</span></button>
              </div>
            </div>
          </div>
          <div class="addBtnContainer">
            <button class="icon-btn add-btn" @click.stop="displayTypeSelect(0)">
              <div class="add-icon"></div>
              <div class="btn-txt">追加</div>
            </button>
          </div>
        </div>
        <br>
        <div class="iterContainer" v-for="d in articleData" :key="'container'+d.order">
          <div class="dataEditorContainer">
            <EditorController :article-data="d" />
          </div>
          <div class="typeSelectContainer" v-show="displayedTypeSelect === d.order+1" >
            <div class="typeSelect">
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'heading')"><span>見出し</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'paragraph')"><span>テキスト</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'image')"><span>画像</span></button>
              </div>
              <div class="typeSelectBtnContainer">
                <button @click="addElement(d.order+1, 'paragraphWithImage')"><span>画像付きテキスト</span></button>
              </div>
            </div>
          </div>
          <div class="addBtnContainer">
            <button class="icon-btn add-btn" @click.stop="displayTypeSelect(d.order+1)">
              <div class="add-icon"></div>
              <div class="btn-txt">追加</div>
            </button>
          </div>
        </div>
      </div>
      <div class="save-btn-container">
        <button @click="saveArticleData">保存</button>
      </div>
    </div>
    <div id="overlay" v-show="displayedTypeSelect !== -1" @click="displayTypeSelect(-1)"></div>
    <div class="previewArea" v-show="selectedTab === 2">
			<Preview :article-data="articleData"/>
		</div>
    <transition name="imageSelector">
      <ImageSelector v-show="selectedImageEditor" />
    </transition>
  </div>
</template>

<script>
import { ArticleComponent } from '@/components/editors/ArticleComponent.js'
import EditorController from '@/components/editors/EditorController.vue'
import Preview from '@/components/editors/Preview.vue'
import _ from 'lodash'
import ImageSelector from '@/components/editors/ImageSelector.vue'

export default {
  components: {
    EditorController, Preview, ImageSelector
  },
  data() {
    return {
      articleData: [],
      title: '',
      url: '',
      user_id: 0,
      displayedTypeSelect: -1,
      selectedTab: 1,
      selectedImageEditor: null
    }
  },
  mounted() {
    this.fetchArticleData()
    this.$imageSelectorStore.register(this)
  },
  methods: {
    deleteArticle(article) {
      const arr = this.articleData.filter(d => d.order !== article.order)
      this.articleData = arr.map(d => {
        if(d.order > article.order) {
          d.order -= 1
          return d
        }
        return d
      })
    },
    async saveArticleData() {
      if(this.$store.checkTokenIsSet()) {
        const url = "save-article-data"
        const params = new URLSearchParams()
        params.append('articleData', JSON.stringify(this.articleData))
        params.append('articleId', this.$store.selectedArticleId)
        params.append('title', this.title)
        params.append('url', this.url)
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
      console.log(this.articleData)
      this.displayedTypeSelect = -1
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
          this.user_id = res.data.user_id
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
  > .editorArea {
    padding: 30px;
  }
  > .tabArea {
    width: 100%;
    height: 40px;
    background-color: #f3f3f3;
    border-bottom: solid 1px rgba(0,0,0,.1);
    display: flex;
    > .tabBtnContainer {
      > .btn {
        -webkit-tap-highlight-color: transparent;
        padding: 0px;
        cursor: pointer;
        -webkit-border-radius: 0;
        border-radius: 0;
        margin: 0px 24px;
        font-size: 17px;
        line-height: 17px;
        user-select: none;
        height: 100%;
        padding-left: 4px;
        padding-right: 4px;
        position: relative;
        background-color: rgba(0,0,0,0.002);
        border: 1px solid transparent;
        border-bottom: 2px solid transparent;
        outline: 1px solid rgba(0,0,0,0.002);
        box-sizing: border-box;
        font-family: "Segoe UI Regular","Segoe UI",Helvetica,Tahoma,Geneva,Verdana,sans-serif;
        -webkit-font-smoothing: antialiased;
        color: #212121;
        overflow: visible;
      }
      > .active-tab {
        border-bottom: 2px solid rgb(255, 111, 1);
      }
    }
  }
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  height: 100%;
}
.iterContainer {
  margin: 40px 0;
  .typeSelectContainer {
    position: relative;
    top: 0;
    left: 0;
    > .typeSelect {
      display: flex;
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      padding: 10px;
      border: solid 1px rgba(0,0,0,.3);
      background-color: white;
      > .typeSelectBtnContainer {
        > button {
          background-color: white;
          width: 80px;
          height: 70px;
          border: solid 1px transparent;
          position: relative;
          &:hover {
            background-color: rgba(0,0,0,.1);
          }
          > span {
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            font-size: 0.95em;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .addBtnContainer {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }
}

// コピペ
.add-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 30px;
  height: 30px;
  border: 1px solid #cdcdcd;
  background-color: black;
  border-radius: 15px !important;
  overflow: hidden;
  transition: width 0.2s ease-in-out;
}
.add-btn:hover {
  // width: 120px;
  width: 70px;
}
.add-btn::before,
.add-btn::after {
  transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 4px;
  width: 10px;
  top: calc(50% - 2px);
  background-color: white;
}
.add-btn::after {
  right: 6px;
  overflow: hidden;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn::before {
  left: 6px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.icon-btn:focus {
  outline: none;
}
.btn-txt {
  opacity: 0;
  transition: opacity 0.2s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: white;
}
.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}
.add-btn:hover .btn-txt {
  opacity: 1;
}
.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 16px;
  width: 2px;
  top: calc(50% - 8px);
  background: white;
  overflow: hidden;
}
.add-icon::before {
  left: 12px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.add-icon::after {
  right: 12px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
// ---
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200,200,200,.6);
  z-index: 100;
}
table {
  margin: 30px auto;
  border: solid 1px rgba(0,0,0,.1);
  border-collapse: collapse;
  width: 80%;
  > .articlePropaty {
    > td {
      padding: 10px;
      border-bottom: solid 1px rgba(0,0,0,.1);
      width: 85%;
      &:hover {
        background-color: rgba(0,0,0,.1);
      }
      > input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        border: none;
        width: 100%;
      }
    }
    > th {
      padding: 10px;
      background-color: rgba(0,0,0,.4);
      border-bottom: solid 1px rgba(0,0,0,.1);
      > span {
        font-size: 0.9rem;
        color:white;
      }
    }
  }
  :nth-child(3) {
    > td {
      border: none;
      &:hover {
        background-color: transparent;
      }
    }
    > th {
      border: none;
    }
  }
}
.save-btn-container {
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
.imageSelector-enter-active, .imageSelector-leave-active {
  transition: .25s;
}
.imageSelector-enter, .imageSelector-leave-to {
  right: -20%;
}
</style>